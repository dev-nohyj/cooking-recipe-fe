'use client';

import { Control } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import axios from 'axios';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { PresignedUrlTypeLabel } from '@/asset/labels/presignedUrlTypeLabel';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import CustomImage from '../Image';
import EditorComponentView from './EditorComponentView';

interface Props {
    control: Control<
        {
            title: string;
            content: string;
            thumbnailUrl: string;
            category: ValueOf<typeof RecipePostCategoryLabel>;
            tags: string[];
        },
        any
    >;
}

const Parchment = Quill.import('parchment');
const maxFileSize = 2014000;

const EditorComponent: React.FC<Props> = ({ control }) => {
    const quillRef = useRef<ReactQuill>(null);

    Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
    Quill.register(CustomImage, true);

    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();

            //@ts-ignore
            const tooltip = quill.theme.tooltip;
            tooltip.root.querySelector('input[data-link]').dataset.link = 'https://www.foodShare.vercel.app';
            const imgFocus = (e: MouseEvent) => {
                const img = Parchment.find(e.target);
                if (img instanceof CustomImage) {
                    quill.setSelection(img.offset(quill.scroll), 1, 'user');
                }
            };

            quill.root.addEventListener('click', imgFocus);

            return () => {
                quill.root.removeEventListener('click', imgFocus);
            };
        }
    }, []);

    const imageUploadToS3 = async (file: File) => {
        try {
            if (file.size > maxFileSize) {
                return alert('이미지 크기가 매우 큽니다. (최대 2mb 제한)');
            }
            const res = await defaultAxios.post<{ s3Url: string }>('/awsS3/createS3Url', {
                urlType: PresignedUrlTypeLabel.recipePostContent,
                contentType: file.type,
            });
            await axios.put(res.data.s3Url, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });
            const imageUrl = res.data.s3Url.split('?Content-Type=image')[0];
            if (quillRef.current) {
                const quill = quillRef.current.getEditor();
                const index = quill.getSelection()?.index;

                if (typeof index === 'number') {
                    quill.insertEmbed(index, 'image', { src: imageUrl });
                    quill.setSelection(index, 1, 'user');
                }
            }
        } catch (err) {
            alert('이미지 업로드에 실패했습니다.');
        }
    };
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/gif, image/jpeg, image/jpg, image/png, image/svg');
        input.click();
        input.onchange = async () => {
            const file = input.files;
            if (file === null || file[0] === null) return;
            await imageUploadToS3(file[0]);
        };
    };

    const imageDragAndPasteHandler = async (imageUrl: string, type: string, imageData: any) => {
        const file: File = imageData.toFile();
        const acceptFileType = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
        if (!file) {
            return alert('시스템에러가 발생했습니다.\n 잠시 후 다시 시도해 주세요.');
        }
        if (!acceptFileType.includes(file.type)) {
            return alert('이미지 확장자만 업로드 가능합니다.');
        }
        await imageUploadToS3(file);
    };

    const modules = {
        toolbar: {
            container: '#toolbar',
            handlers: {
                image: imageHandler,
            },
        },
        imageDropAndPaste: {
            handler: imageDragAndPasteHandler,
        },

        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
        },
        keyboard: {
            bindings: {
                exitBlockWithEnter: {
                    key: 'enter',
                    format: ['blockquote'],
                    collapsed: true,
                    empty: true,
                    handler: function () {
                        if (quillRef.current) {
                            quillRef.current.getEditor().format('blockquote', false, 'user');
                        }
                    },
                },
            },
        },
    };
    const props = {
        control,
        modules,
        quillRef,
    };
    return <EditorComponentView {...props} />;
};

export default React.memo(EditorComponent);

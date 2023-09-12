'use client';
import { styled } from 'styled-components';
import { Control, Controller } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import axios from 'axios';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import EditorToolbar from './EditorToolbar';
import CustomImage from './Image';
import { defaultAxios } from '@/config/axiosInstance/defaultAxios';
import { PresignedUrlTypeLabel } from '@/asset/labels/presignedUrlTypeLabel';
import { MobileSize, TabletSize } from '@/asset/const/deviceSize';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';

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

    return (
        <Container>
            <EditorToolbar />
            <Controller
                control={control}
                name="content"
                render={({ field: { onChange, value } }) => {
                    return (
                        <>
                            <ReactQuill
                                ref={quillRef}
                                theme="snow"
                                modules={modules}
                                value={value}
                                onChange={onChange}
                            />
                        </>
                    );
                }}
            />
        </Container>
    );
};

const Container = styled.div`
    margin: 20px 0;
    margin-bottom: 70px;
    width: 100%;
    @media only screen and (max-width: ${TabletSize}) {
        max-width: 748px;
    }
    @media only screen and (max-width: ${MobileSize}) {
        max-width: 335px;
    }
    /* placeholder */
    .ql-container .ql-editor.ql-blank::before {
        font-size: 24px;
    }
    .ql-toolbar {
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: #ffffff;
    }
    .ql-container {
        font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
            'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif !important;
    }

    .ql-container .ql-editor {
        width: 100%;
        padding: 5px 30px;
        height: 600px;
        font-size: 24px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        font-weight: 300;
        white-space: pre-line;
        @media only screen and (max-width: 768px) {
            padding: 5px 20px 10%;
        }
        @media only screen and (max-width: 430px) {
            font-size: 16px;
            line-height: 1.2em;
            padding: 5px 0 10%;
        }
    }

    h1 {
        font-weight: 600;
        font-size: 40px !important;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        white-space: pre-line;
        @media only screen and (max-width: 430px) {
            font-size: 24px !important;
            line-height: 1.2em;
        }
    }

    h2 {
        font-weight: 600;
        font-size: 32px !important;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        white-space: pre-line;
        @media only screen and (max-width: 430px) {
            font-size: 20px !important;
            line-height: 1.2em;
        }
    }
    .ql-snow .ql-editor blockquote {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
    }
    blockquote {
        padding-left: 9px !important;
        margin-left: 25px !important;
        border-left: 3px solid #6b6b6b !important;
        font-weight: 300;
        font-size: 24px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        white-space: pre-line;
        @media only screen and (max-width: 430px) {
            font-size: 16px;
            line-height: 1.2em;
            margin-left: 15px !important;
        }
    }

    .ql-editor a {
        font-size: 24px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000 !important;
        font-weight: 300;
        white-space: pre-line;
        text-decoration-line: underline;
        @media only screen and (max-width: 430px) {
            font-size: 16px;
            line-height: 1.2em;
        }
    }

    strong {
        font-weight: 500;
    }

    em {
        font-style: italic;
    }

    ins {
        text-decoration: underline;
    }

    del {
        text-decoration: line-through;
    }

    ul {
        margin: 16px 0 !important;
        padding: 0 !important;
    }

    ol {
        margin: 16px 0 !important;
        padding: 0 !important;
    }

    ol > li {
        list-style-type: decimal !important;
        margin-left: 1.5em;
        font-size: 24px;
        line-height: 34px;
        letter-spacing: -0.03em;
        color: #000000;
        font-weight: 300;
        white-space: pre-line;
        min-height: 16px;
        @media only screen and (max-width: 430px) {
            font-size: 16px;
            line-height: 19px;
        }
    }

    .ql-editor ol li:before {
        content: '' !important;
        padding-right: 0.2em !important;
    }

    ul > li {
        list-style-type: disc !important;
        margin-left: 1.5em;
        font-size: 24px;
        line-height: 34px;
        letter-spacing: -0.03em;
        color: #000000;
        font-weight: 300;
        white-space: pre-line;
        min-height: 16px;
        @media only screen and (max-width: 430px) {
            font-size: 16px;
            line-height: 19px;
        }
    }
    .ql-editor ul > li::before {
        content: '' !important;
        padding-right: 0.2em !important;
    }

    .ql-editor ol li:not(.ql-direction-rtl),
    .ql-editor ul li:not(.ql-direction-rtl) {
        padding-left: 0 !important;
    }
    .ql-snow .ql-tooltip[data-mode='link']::before {
        content: 'url을 입력하세요 :' !important;
    }

    .recipe-image {
        display: block;
        width: 100%;
        height: auto;
        padding: 0 10px;
    }
    .recipe-image:hover {
        border-radius: 9px;
        cursor: pointer;
        filter: brightness(90%);
        -webkit-filter: brightness(90%);
    }
`;

export default React.memo(EditorComponent);

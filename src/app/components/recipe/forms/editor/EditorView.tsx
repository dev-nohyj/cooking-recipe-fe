import { styled } from 'styled-components';
import EditorToolbar from './EditorToolbar';
import { Control, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';
import { MobileSize, TabletSize } from '@/asset/const/deviceSize';

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
    modules: { [k: string]: { [k: string]: any } };
    quillRef: React.RefObject<ReactQuill>;
}

const EditorView = ({ control, modules, quillRef }: Props) => {
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
const Container = styled.section`
    margin: 20px 0;
    width: 100%;

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
        @media only screen and (max-width: ${TabletSize}) {
            padding: 5px 16px;
        }
        @media only screen and (max-width: ${MobileSize}) {
            font-size: 16px;
            line-height: 1.2em;
        }
    }

    h1 {
        font-weight: 600;
        font-size: 40px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        white-space: pre-line;
        @media only screen and (max-width: ${MobileSize}) {
            font-size: 24px;
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
        @media only screen and (max-width: ${MobileSize}) {
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
        @media only screen and (max-width: ${MobileSize}) {
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
        @media only screen and (max-width: ${MobileSize}) {
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
        @media only screen and (max-width: ${MobileSize}) {
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
        @media only screen and (max-width: ${MobileSize}) {
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

export default EditorView;

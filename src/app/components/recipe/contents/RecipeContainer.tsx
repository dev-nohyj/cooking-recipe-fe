import { styled } from 'styled-components';
import { MobileSize, TabletSize } from '../../../../asset/const/deviceSize';

interface Props {
    children: React.ReactNode;
}

const RecipeContainer: React.FC<Props> = ({ children }) => {
    return <Container>{children}</Container>;
};

const Container = styled.article`
    max-width: 840px;
    margin: 0 auto;
    padding: 5% 30px 10%;
    @media only screen and (max-width: ${TabletSize}) {
        max-width: 748px;
        padding: 5% 20px 10%;
    }
    @media only screen and (max-width: ${MobileSize}) {
        max-width: 335px;
        padding: 5% 0 10%;
    }
    .recipePost p {
        font-size: 24px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        font-weight: 300;
        white-space: pre-line;
        @media only screen and (max-width: 430px) {
            font-size: 16px;
            line-height: 1.2em;
        }
    }

    .recipePost h1 {
        font-weight: 600;
        font-size: 40px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        white-space: pre-line;
        @media only screen and (max-width: 430px) {
            font-size: 24px;
            line-height: 1.2em;
        }
    }

    .recipePost h2 {
        font-weight: 600;
        font-size: 32px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        white-space: pre-line;
        @media only screen and (max-width: 430px) {
            font-size: 24px;
            line-height: 1.2em;
        }
    }

    .recipePost blockquote {
        padding-left: 9px;
        margin-left: 25px;
        border-left: 3px solid #6b6b6b;
        font-weight: 300;
        font-size: 24px;
        line-height: 1.42em;
        letter-spacing: -0.03em;
        color: #000000;
        white-space: pre-line;
        @media only screen and (max-width: 430px) {
            font-size: 16px;
            line-height: 1.2em;
            margin-left: 15px;
        }
    }

    .recipePost a {
        text-decoration-line: underline;
        word-break: break-all;
    }

    .recipePost strong {
        font-weight: 500;
    }

    .recipePost em {
        font-style: italic;
    }
    .recipePost ins {
        text-decoration: underline;
    }
    .recipePost del {
        text-decoration: line-through;
    }

    .recipePost ul {
        margin: 16px 0;
        padding: 0;
    }

    .recipePost ol {
        margin: 16px 0;
        padding: 0;
    }

    .recipePost ul > li {
        list-style-type: disc;
        margin-left: 1.5em;
        font-size: 24px;
        line-height: 34px;
        letter-spacing: -0.03em;
        color: #000000;
        font-weight: 300;
        white-space: pre-line;
        min-height: 16px;
        padding-left: 0.2em;
        @media only screen and (max-width: 430px) {
            font-size: 16px;
            line-height: 19px;
        }
    }

    .recipePost ol > li {
        list-style-type: decimal;
        margin-left: 1.5em;
        font-size: 24px;
        line-height: 34px;
        letter-spacing: -0.03em;
        color: #000000;
        font-weight: 300;
        white-space: pre-line;
        min-height: 16px;
        padding-left: 0.2em;
        @media only screen and (max-width: 430px) {
            font-size: 16px;
            line-height: 19px;
        }
    }

    .recipePost .ql-align-right {
        text-align: right;
    }
    .recipePost .ql-align-center {
        text-align: center;
    }
    .recipePost .ql-align-justify {
        text-align: justify;
    }

    .recipePost .recipe-image {
        display: block;
        width: 100%;
        height: auto;
        padding: 0;
    }
    .recipePost .recipe-image:hover {
        border-radius: unset;
        cursor: unset;
        filter: unset;
        -webkit-filter: unset;
    }
`;

export default RecipeContainer;

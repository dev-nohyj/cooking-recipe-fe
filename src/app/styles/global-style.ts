import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`    
    ${reset}

    html,
    body {
    cursor: default;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: 62.5%; // 10px

    }

    a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    }
    * {
    box-sizing: border-box;
    }
    button {
        font-size: 62.5%; // 10px
        font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
        &:disabled {
            cursor: default;
        }
        &:focus {
            outline: none;
            -webkit-tap-highlight-color : transparent
        }
    }

    input,textarea {
        font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        &:focus {
            outline: none;
            -webkit-tap-highlight-color : transparent
        }
        
    }
    
    .modal-open {
        overflow: hidden;
    }
    .authModal {
        @media only screen and (max-width: 530px) {
        height: 100%;
    }
        &:focus {
            outline: none;
            -webkit-tap-highlight-color : transparent
        }
    }
`;

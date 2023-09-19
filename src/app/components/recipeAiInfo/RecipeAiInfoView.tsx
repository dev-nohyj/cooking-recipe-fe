import { colors } from '@/asset/colors';
import { MobileSize } from '@/asset/const/deviceSize';
import { styled } from 'styled-components';
import { TextButton } from '../shared/button/TextButton';
import { Control, Controller } from 'react-hook-form';
import { KeyboardEvent } from 'react';
import SendIcon from '../../../../public/svg/SendIcon';
import CopyToClipboard from 'react-copy-to-clipboard';

interface Props {
    control: Control<
        {
            content: string;
        },
        any
    >;
    onEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
    isStreamLoading: boolean;
    onSubmit: () => void;
    result: string;
    onCopy: () => void;
}

const RecipeAiInfoView = ({ control, onEnter, isStreamLoading, onSubmit, result, onCopy }: Props) => {
    return (
        <Container>
            <TextWrapper>
                <Title>
                    만들고 싶은 <span>음식의 레시피</span>를 AI에게 물어보세요!
                </Title>
            </TextWrapper>
            <InputSection>
                <InputWrapper>
                    <Controller
                        control={control}
                        name="content"
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Input
                                    type="text"
                                    onChange={onChange}
                                    value={value}
                                    maxLength={50}
                                    placeholder="음식명을 입력하세요"
                                    onKeyDown={onEnter}
                                    disabled={isStreamLoading}
                                />
                            );
                        }}
                    />
                    <Btn onClick={onSubmit} disabled={isStreamLoading}>
                        <SendIcon />
                    </Btn>
                </InputWrapper>
            </InputSection>
            {result && (
                <RecipeContainer>
                    <Recipe>{result}</Recipe>
                    {!isStreamLoading && (
                        <CopyToClipboard text={result} onCopy={onCopy}>
                            <CopyBtn fontSize={'1.6rem'} color={colors.sandyBrown}>
                                레시피 복사하기
                            </CopyBtn>
                        </CopyToClipboard>
                    )}
                </RecipeContainer>
            )}
        </Container>
    );
};

const Container = styled.div`
    max-width: 1024px;
    padding: 0 32px;
    margin: 0 auto;
`;
const TextWrapper = styled.section`
    margin: 32px 0;
`;
const Title = styled.h2`
    font-size: 2.4rem;
    line-height: 3.2rem;
    color: ${colors.black200};
    font-weight: 500;
    text-align: center;
    & span {
        color: ${colors.sandyBrown};
    }
`;

const InputSection = styled.section`
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    width: 100%;
    background-color: ${colors.white};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    height: 52px;
`;
const InputWrapper = styled.div`
    position: relative;
    max-width: 1024px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 32px;
`;
const Input = styled.input`
    width: 100%;
    padding: 8px 24px;
    font-size: 1.6rem;
    border: 1px solid ${colors.grey9};
    border-radius: 16px;
    @media only screen and (max-width: ${MobileSize}) {
        font-size: 1.4rem;
    }
`;
const Btn = styled.button`
    margin-right: 8px;
    padding: 4px;
    position: absolute;
    right: 32px;
`;

const RecipeContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding-bottom: 64px;
`;

const Recipe = styled.p`
    white-space: pre-line;
    word-wrap: break-word;
    font-size: 1.4rem;
    line-height: 1.8rem;
    background-color: ${colors.sandyBrown};
    padding: 32px 16px;
    border-radius: 8px;
    color: ${colors.white};
    margin-bottom: 24px;
`;
const CopyBtn = styled(TextButton)`
    align-self: flex-end;
`;

export default RecipeAiInfoView;

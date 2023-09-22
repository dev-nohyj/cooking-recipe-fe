import { colors } from '@/asset/colors';
import { KeyboardEvent } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Control, Controller } from 'react-hook-form';
import SendIcon from '../../../../../public/svg/SendIcon';
import {
    Btn,
    Container,
    CopyBtn,
    Input,
    InputSection,
    InputWrapper,
    Recipe,
    RecipeContainer,
    TextWrapper,
    Title,
} from '../RecipeAiInfo.style';

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

const GenerateRecipeView = ({ control, onEnter, isStreamLoading, onSubmit, result, onCopy }: Props) => {
    return (
        <Container>
            <TextWrapper>
                <Title>
                    만들고 싶은 <span>음식의 레시피</span>를{'\n'}AI에게 물어보세요!
                </Title>
            </TextWrapper>
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
        </Container>
    );
};

export default GenerateRecipeView;

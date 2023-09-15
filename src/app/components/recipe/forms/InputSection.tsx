import ImgIcon from '../../../../../public/svg/ImgIcon';
import {
    Img,
    Label,
    LeftContainer,
    RightContainer,
    TagInput,
    TagItem,
    TagWrapper,
    TitleInput,
    TopSection,
} from './RecipeForm.style';
import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { ChangeEvent, KeyboardEvent, MutableRefObject } from 'react';
import { RecipePostCategoryLabel } from '@/asset/labels/recipePostLabel';

interface Props {
    uploadInputRef: MutableRefObject<HTMLInputElement | null>;
    onUploadImg: (e: ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    watch: UseFormWatch<{
        title: string;
        content: string;
        thumbnailUrl: string;
        category: NonNullable<
            | ValueOf<{
                  readonly korean: 1;
                  readonly chinese: 2;
                  readonly japanese: 3;
                  readonly western: 4;
                  readonly etc: 5;
              }>
            | undefined
        >;
        tags: string[];
    }>;
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
    inputHashTag: string;
    addHashTag: (e: KeyboardEvent<HTMLInputElement>) => void;
    onDeleteTag: (idx: number) => void;
    onKeyDownHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
    onChangeHashTagInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputSection = ({
    uploadInputRef,
    onUploadImg,
    isLoading,
    watch,
    control,
    inputHashTag,
    addHashTag,
    onDeleteTag,
    onKeyDownHandler,
    onChangeHashTagInput,
}: Props) => {
    return (
        <TopSection>
            <LeftContainer>
                <input
                    className="file_input"
                    ref={uploadInputRef}
                    type="file"
                    id="imgeUpload"
                    onChange={onUploadImg}
                    disabled={isLoading}
                    accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                />
                <Label htmlFor="imgeUpload">
                    {watch('thumbnailUrl') === '' ? (
                        <ImgIcon />
                    ) : (
                        <Img src={watch('thumbnailUrl')} width={300} height={180} alt="thumbnail-image" />
                    )}
                </Label>
            </LeftContainer>
            <RightContainer>
                <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value } }) => {
                        return (
                            <TitleInput
                                type="text"
                                placeholder="제목을 입력하세요"
                                value={value}
                                onChange={onChange}
                                maxLength={50}
                            />
                        );
                    }}
                />
                <div>
                    <TagWrapper>
                        {watch('tags').length > 0 &&
                            watch('tags').map((tag, idx) => {
                                return (
                                    <TagItem
                                        onClick={() => {
                                            onDeleteTag(idx);
                                        }}
                                        key={`tag-${nanoid(6)}`}
                                    >
                                        {tag}
                                    </TagItem>
                                );
                            })}
                        <TagInput
                            type="text"
                            placeholder="태그를 입력하세요"
                            value={inputHashTag}
                            onKeyUp={addHashTag}
                            onKeyDown={onKeyDownHandler}
                            onChange={onChangeHashTagInput}
                            maxLength={30}
                        />
                    </TagWrapper>
                </div>
            </RightContainer>
        </TopSection>
    );
};

export default InputSection;

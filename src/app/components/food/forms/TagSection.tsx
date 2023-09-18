import { ChangeEvent, KeyboardEvent } from 'react';
import { TagInput, TagItem, TagWrapper } from './FoodForm.style';
import { nanoid } from 'nanoid';

interface Props {
    tags: string[];
    inputHashTag: string;
    addHashTag: (e: KeyboardEvent<HTMLInputElement>) => void;
    onDeleteTag: (idx: number) => void;
    onKeyDownHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
    onChangeHashTagInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TagSection = ({ tags, inputHashTag, addHashTag, onDeleteTag, onKeyDownHandler, onChangeHashTagInput }: Props) => {
    return (
        <TagWrapper>
            <TagInput
                type="text"
                placeholder="태그를 추가해 보세요."
                value={inputHashTag}
                onKeyUp={addHashTag}
                onKeyDown={onKeyDownHandler}
                onChange={onChangeHashTagInput}
                maxLength={30}
            />
            {tags.length > 0 &&
                tags.map((tag, idx) => {
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
        </TagWrapper>
    );
};

export default TagSection;

import React, { ChangeEvent } from 'react';
import { IconWrapper, Img, ImgLabel, ImgWrapper, Label, LabelContainer } from './FoodForm.style';
import ImgIcon from '../../../../../public/svg/ImgIcon';
import { nanoid } from 'nanoid';
import CloseIcon from '../../../../../public/svg/CloseIcon';
import { colors } from '@/asset/colors';

interface Props {
    onUploadImg: (e: ChangeEvent<HTMLInputElement>, idx?: number) => void;
    isLoading: boolean;
    foodImages: {
        id?: number | undefined;
        url: string;
    }[];
    removeImg: (idx: number) => void;
}

const ImageSection = ({ onUploadImg, isLoading, foodImages, removeImg }: Props) => {
    return (
        <ImgWrapper>
            {foodImages.length > 0 &&
                foodImages.map((v, idx) => {
                    return (
                        <LabelContainer key={`img-${nanoid(6)}`}>
                            <input
                                className="file_input"
                                id={`foodImage-${idx}`}
                                onChange={(e) => {
                                    onUploadImg(e, idx);
                                }}
                                disabled={isLoading}
                                type="file"
                                accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                            />
                            <IconWrapper
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImg(idx);
                                }}
                            >
                                <CloseIcon color={colors.white} />
                            </IconWrapper>
                            <ImgLabel htmlFor={`foodImage-${idx}`}>
                                <Img src={v.url} alt={'foodImg'} width="0" height="0" sizes="100vw" />
                            </ImgLabel>
                        </LabelContainer>
                    );
                })}
            {foodImages.length <= 5 && (
                <>
                    <input
                        className="file_input"
                        id="foodImage"
                        onChange={onUploadImg}
                        disabled={isLoading || foodImages.length > 5}
                        type="file"
                        accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                    />
                    <Label htmlFor="foodImage">
                        <ImgIcon />
                        <p>{foodImages.length}/6</p>
                    </Label>
                </>
            )}
        </ImgWrapper>
    );
};

export default ImageSection;

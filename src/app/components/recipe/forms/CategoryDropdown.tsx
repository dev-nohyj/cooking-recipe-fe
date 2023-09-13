import { colors } from '@/asset/colors';
import { nanoid } from 'nanoid';
import { MutableRefObject } from 'react';
import { styled } from 'styled-components';
import ToggleIcon from '../../../../../public/svg/ToggleIcon';

interface Props {
    categoryList: { title: string; onClick: () => void; isActive: boolean }[];
    isActive: boolean;
    onTargetClick: () => void;
    categoryRef: MutableRefObject<null>;
    categoryText: string;
}

const CategoryDropdown = ({ categoryList, isActive, categoryRef, onTargetClick, categoryText }: Props) => {
    return (
        <Container ref={categoryRef}>
            <Btn onClick={onTargetClick}>
                <span>{categoryText}</span>
                <IconWrapper>
                    <ToggleIcon />
                </IconWrapper>
            </Btn>
            {isActive && (
                <DropdownContainer>
                    {categoryList.map((category) => {
                        return (
                            <Item key={`category-${nanoid(6)}`} isActive={category.isActive}>
                                <button onClick={category.onClick}>{category.title}</button>
                            </Item>
                        );
                    })}
                </DropdownContainer>
            )}
        </Container>
    );
};

const Container = styled.section`
    width: 96px;
    margin-bottom: 12px;
`;
const Btn = styled.button`
    position: relative;
    border: 1px solid ${colors.grey9};
    width: 100%;
    height: 30px;
    font-size: 1.3rem;
    font-weight: 700;
    color: ${colors.black100};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const IconWrapper = styled.div`
    position: absolute;
    right: 6px;
`;
const DropdownContainer = styled.ul`
    position: absolute;
    width: 96px;
    z-index: 5;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
    background-color: ${colors.white};
`;
const Item = styled.li<{ isActive: boolean }>`
    display: block;
    width: 100%;
    height: 30px;
    & button {
        font-size: 1.3rem;
        color: ${colors.black100};
        width: 100%;
        height: 30px;
        font-weight: ${(props) => props.isActive && 700};
    }
`;

export default CategoryDropdown;

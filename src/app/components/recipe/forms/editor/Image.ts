import { nanoid } from 'nanoid';
import { Quill } from 'react-quill';

const Img = Quill.import('formats/image');
type valueType = {
    src: string;
};
class CustomImage extends Img {
    static create(value: valueType) {
        const node: HTMLElement = super.create(value);
        node.setAttribute('alt', `recipePost-${nanoid(6)}`);
        node.setAttribute('src', value.src);
        node.setAttribute('class', 'recipe-image');
        node.setAttribute('draggable', 'false');
        return node;
    }

    static value(domNode: HTMLElement): valueType {
        return {
            src: domNode.getAttribute('src') || '',
        };
    }
}

export default CustomImage;

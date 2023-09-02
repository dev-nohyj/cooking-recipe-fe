import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';

export const useInputHashTag = (watchTags: string[], setTags: (tags: string[]) => void, maxTagCount = 5) => {
    const [inputHashTag, setInputHashTag] = useState('');
    const addHashTag = (e: KeyboardEvent<HTMLInputElement>) => {
        const allowedCommand = ['Comma', 'Enter', 'NumpadEnter'];
        if (e.currentTarget.value.length === 0 && e.code === 'Backspace') {
            let tags = watchTags;
            tags.pop();
            setTags(tags);
        }
        if (!allowedCommand.includes(e.code)) return;

        if (e.currentTarget.value.trim().length === 0) {
            return setInputHashTag('');
        }

        let newHashTag = e.currentTarget.value.trim();
        const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
        if (regExp.test(newHashTag)) {
            newHashTag = newHashTag.replace(regExp, '');
        }
        if (newHashTag.includes(',')) {
            newHashTag = newHashTag.split(',').join('');
        }

        if (newHashTag.length === 0) return;
        const tags = [...new Set([...watchTags, newHashTag])];
        if (tags.length <= maxTagCount) {
            setTags(tags);
        }
        setInputHashTag('');
    };
    const onDeleteTag = (idx: number) => {
        const filterTags = watchTags.filter((_, index) => {
            return idx !== index;
        });
        setTags(filterTags);
    };

    const onKeyDownHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
        e.preventDefault();

        const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
        if (!regExp.test(e.currentTarget.value)) {
            setInputHashTag('');
        }
    }, []);

    const onChangeHashTagInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputHashTag(e.target.value);
    }, []);

    return { inputHashTag, addHashTag, onDeleteTag, onKeyDownHandler, onChangeHashTagInput };
};

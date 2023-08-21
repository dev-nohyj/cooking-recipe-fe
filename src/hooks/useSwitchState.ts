import { useCallback, useState } from 'react';

type returnType = [boolean, (v?: any) => void];

export const useSwitchState = (initValue: boolean = false): returnType => {
    const [value, setValue] = useState(initValue);
    const handler = useCallback((v?: any) => {
        if (typeof v === 'boolean') {
            setValue(v);
        } else {
            setValue((prev) => !prev);
        }
    }, []);

    return [value, handler];
};

import { useCallback, useEffect, useState } from 'react';

type returnType = [boolean, (v?: boolean) => void];

export const useOutsideClick = (ref: any = null, initialVisible: any = false): returnType => {
    const [isActive, setIsActive] = useState(initialVisible);

    useEffect(() => {
        const onClick = (e: any) => {
            if (ref.current !== null && !ref.current.contains(e.target)) {
                setIsActive(!isActive);
            }
        };
        if (isActive) {
            window.addEventListener('mousedown', onClick);
        }
        return () => {
            window.removeEventListener('mousedown', onClick);
        };
    }, [isActive, ref]);
    const onTargetClick = useCallback(
        (v?: boolean) => {
            setIsActive(typeof v === 'boolean' ? v : !isActive);
        },
        [isActive],
    );
    return [isActive, onTargetClick];
};

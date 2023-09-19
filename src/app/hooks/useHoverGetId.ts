import { useCallback, useState } from 'react';

type returnType = [number | null, (id: number) => void, () => void];

export const useHoverGetId = (): returnType => {
    const [targetVisibleId, setTargetVisibleId] = useState<number | null>(null);

    const onMouseEnter = useCallback((id: number) => {
        setTargetVisibleId(id);
    }, []);

    const onMouseLeave = useCallback(() => {
        setTargetVisibleId(null);
    }, []);

    return [targetVisibleId, onMouseEnter, onMouseLeave];
};

import { useState } from 'react';

export const useGenerateRecipe = () => {
    const [isStreamLoading, setIsStreamLoading] = useState(false);
    const [result, setResult] = useState<string>('');

    async function mutate<P>(variables: P) {
        try {
            setIsStreamLoading(true);
            setResult('');
            const res = await fetch('/api/generateRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(variables),
            });
            if (!res.ok) {
                alert('error');
            }

            const data = res.body;
            if (!data) {
                return;
            }
            const reader = data.getReader();
            const decoder = new TextDecoder();
            let done = false;
            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;

                const streamReview = decoder.decode(value);
                setResult((prev) => prev + streamReview);
            }
            setIsStreamLoading(false);
        } catch (err: any) {
            alert(err.response.data.error);
        }
    }

    return { mutate, result, isStreamLoading };
};

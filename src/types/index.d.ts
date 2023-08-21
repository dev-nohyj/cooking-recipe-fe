export {};
declare global {
    type ErrorMessage = string | undefined;
    type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
        ? ElementType
        : never;
    type ValueOf<T> = T[keyof T];
    type TAxiosError = { message: string; customErrorCode: number };
    interface CustomError extends Error {
        response?: {
            data: TAxiosError;
            status: number;
            headers: string;
        };
    }
}

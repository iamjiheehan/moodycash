export type actionFunction = (
    prevState: any,
    formData: FormData
) => Promise<{ message: string }>;

export type Service = {
    date: string;
};

import { create } from 'zustand';

type ServiceState = {
    serviceId: string;
    mood: string;
    price: number;
    date: Date | undefined;
    bankName: string;
    bankAccountNumber: string;
    description: string;
};

export const useServiceDetails = create<ServiceState>(() => {
    return {
        serviceId: '',
        price: 0,
        date: undefined,
        bankName: '',
        bankAccountNumber: '',
        mood: '',
        description: '',
    };
});

type TokenState = {
    accessToken: string;
    setAccessToken: (token: string) => void;
};

export const useTokenStore = create<TokenState>((set) => ({
    accessToken: '',
    setAccessToken: (token: string) => set({ accessToken: token }),
}));
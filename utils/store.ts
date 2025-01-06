import { create } from 'zustand';

type ProfileState = {
    id: string;
    clerkId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
};

type ServiceState = {
    serviceId: string;
    mood: string;
    price: number;
    date: Date | undefined;
    bankName: string;
    bankAccountNumber: string;
    description: string;
};

type BankingState = {
    bankingId: string;
    mood: string;
    bankName: string;
    bankCode: string;
    bankAccountNumber: string;
    description: string;
};

type TokenState = {
    accessToken: string;
    setAccessToken: (token: string) => void;
};

export const useProfile = create<ProfileState>(() => {
    return {
        id: '',
        clerkId: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
    };
});

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

export const useBankingDetails = create<BankingState>(() => {
    return {
        bankingId: '',
        mood: '',
        bankName: '',
        bankCode: '',
        bankAccountNumber: '',
        description: '',
    };
});

export const useTokenStore = create<TokenState>((set) => ({
    accessToken: '',
    setAccessToken: (token: string) => set({ accessToken: token }),
}));

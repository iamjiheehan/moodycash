import { create } from 'zustand';

type ProfileState = {
    id: string;
    clerkId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    resetProfile: () => void;
};

type ServiceState = {
    serviceId: string;
    mood: string;
    price: number;
    date: Date | undefined;
    bankName: string;
    bankAccountNumber: string;
    description: string;
    resetServiceDetails: () => void;
};

type BankingState = {
    bankingId: string;
    mood: string;
    bankName: string;
    bankCode: string;
    bankAccountNumber: string;
    description: string;
    resetBankingDetails: () => void;
};

type TokenState = {
    accessToken: string;
    setAccessToken: (token: string) => void;
};

type BankChangeState = {
    bankName: string;
    bankAccountNumber: string;
    setBankName: (name: string) => void;
    setBankAccountNumber: (number: string) => void;
};

export const useProfile = create<ProfileState>((set) => ({
    id: '',
    clerkId: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    resetProfile: () => set({
        id: '',
        clerkId: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
    }),
}));

export const useServiceDetails = create<ServiceState>((set) => ({
    serviceId: '',
    price: 0,
    date: undefined,
    bankName: '',
    bankAccountNumber: '',
    mood: '',
    description: '',
    resetServiceDetails: () => set({
        serviceId: '',
        price: 0,
        date: undefined,
        bankName: '',
        bankAccountNumber: '',
        mood: '',
        description: '',
    }),
}));

export const useBankingDetails = create<BankingState>((set) => ({
    bankingId: '',
    mood: '',
    bankName: '',
    bankCode: '',
    bankAccountNumber: '',
    description: '',
    resetBankingDetails: () => set({
        bankingId: '',
        mood: '',
        bankName: '',
        bankCode: '',
        bankAccountNumber: '',
        description: '',
    }),
}));

export const useTokenStore = create<TokenState>((set) => ({
    accessToken: '',
    setAccessToken: (token: string) => set({ accessToken: token }),
}));

export const useBankChangeStore = create<BankChangeState>((set) => ({
    bankName: '',
    bankAccountNumber: '',
    setBankName: (name: string) => set({ bankName: name }),
    setBankAccountNumber: (number: string) =>
        set({ bankAccountNumber: number }),
}));
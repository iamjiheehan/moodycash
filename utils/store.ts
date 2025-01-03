import { create } from 'zustand';

type ServiceState = {
    serviceId: string;
    mood: string;
    price: number;
    date: Date | undefined;
    bankName: string;
    bankAccountNumber: string;
};

export const useServiceDetails = create<ServiceState>(() => {
    return {
        serviceId: '',
        price: 0,
        date: undefined,
        bankName: '',
        bankAccountNumber: '',
        mood: '',
    };
});

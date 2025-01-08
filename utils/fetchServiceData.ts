import { fetchServiceAction } from './actions';

export type ServiceDetails = {
    id: string;
    date: Date;
    description: string;
    price: number;
    mood: string;
    bankingId: string;
    banking: {
        id: string;
        bankName: string;
        bankAccountHolder: string;
        bankAccountNumber: string;
        mood: string;
    };
};

export const fetchServiceData = async (): Promise<ServiceDetails[] | null> => {
    try {
        const data = await fetchServiceAction();
        if (!data) return null;
        return data as ServiceDetails[];
    } catch (error) {
        console.error('Error fetching service data:', error);
        return null;
    }
};

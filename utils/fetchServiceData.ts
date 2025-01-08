import { fetchServiceAction } from './actions';

interface ServiceData {
    id: string;
    date: Date;
    description: string;
    mood: string;
    price: number;
}

export const fetchServiceData = async (): Promise<ServiceData[] | null> => {
    try {
        const data = await fetchServiceAction();
        if (!data) return null;
        return data as ServiceData[];
    } catch (error) {
        console.error('Error fetching service data:', error);
        return null;
    }
};

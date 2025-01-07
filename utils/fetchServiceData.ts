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
        if (data && 'Service' in data) {
            return data.Service;
        } else {
            console.error('Error: Invalid data format', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching service data:', error);
        return null;
    }
};
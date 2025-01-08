'use client';

import PriceInputForm from '../form/PriceInputForm';
import { useServiceDetails } from '@/utils/store';

interface ServicePriceProps {
    price?: number;
}

export default function ServicePrice({ price }: ServicePriceProps) {
    const handlePriceChange = (price: number) => {
        useServiceDetails.setState({ price: price || undefined });
    };

    return (
        <PriceInputForm
            maxLength={4}
            onChange={handlePriceChange}
            label="얼마를 담아 보낼지 적어주세요"
            defaultValue={price ? price : 0}
        />
    );
}

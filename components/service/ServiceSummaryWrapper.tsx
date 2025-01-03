'use client';

import { useEffect } from 'react';
import { useServiceDetails } from '@/utils/store';
import SelectCalendar from './ServiceCalendar';
import SelectContainer from './ServiceContainer';

type SelectSummaryWrapperProps = {
    serviceId: string;
    price: number;
    date: Date;
};
export default function ServiceSummaryWrapper({
    serviceId,
    price,
    date,
}: SelectSummaryWrapperProps) {
    useEffect(() => {
        useServiceDetails.setState({
            serviceId,
            price,
            date,
        });
    }, []);
    return (
        <>
            <SelectCalendar />
            <SelectContainer />
        </>
    );
}

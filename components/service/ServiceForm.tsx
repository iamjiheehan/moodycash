'use client';
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useServiceDetails } from '@/utils/store';
import { useEffect } from 'react';
function ServiceForm() {
    const { date, mood, price, bankName, bankAccountNumber } =
        useServiceDetails((state) => state);
    useEffect(() => {
        console.log('Service details updated:', {
            date,
            mood,
            price,
            bankName,
            bankAccountNumber,
        });
    }, [date, mood, price, bankName, bankAccountNumber]);

    return (
        <Card className="p-8 mb-4">
            <CardTitle className="mb-8">Summary </CardTitle>
            <Separator />
            <CardTitle className="mt-8">
                <span className="font-semibold">{date?.toString()}</span>
                <span>{mood}</span>
                <span>{price}</span>
                <span>{bankName}</span>
                <span>{bankAccountNumber}</span>
            </CardTitle>
        </Card>
    );
}

export default ServiceForm;

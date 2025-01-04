'use client';
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useServiceDetails } from '@/utils/store';
import { formatDate } from '@/utils/format';

function ServiceForm() {
    const { date, mood, price, bankName, bankAccountNumber } =
        useServiceDetails((state) => state);

    return (
        <Card className="p-8 mb-4">
            <CardTitle className="mb-8">Summary </CardTitle>
            <Separator />
            <CardTitle className="mt-8">
                <span className="font-semibold">
                    {date ? formatDate(new Date(date)) : ''}
                </span>
                <span>{mood}</span>
                <span>{price}</span>
                <span>{bankName}</span>
                <span>{bankAccountNumber}</span>
            </CardTitle>
        </Card>
    );
}

export default ServiceForm;

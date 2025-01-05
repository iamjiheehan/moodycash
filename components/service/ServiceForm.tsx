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
            <CardTitle className="mt-8 flex flex-col gap-4">
                <span className="font-semibold">
                    {date ? formatDate(new Date(date)) : 'Date'}
                </span>
                <span> {mood ? mood : 'Mood'}</span>
                <span>{bankName ? bankName : 'Bank Name'}</span>
                <span>
                    {bankAccountNumber ? bankAccountNumber : 'Account Number'}
                </span>
                <span>{price ? price : 'How much ?'}</span>
            </CardTitle>
        </Card>
    );
}

export default ServiceForm;

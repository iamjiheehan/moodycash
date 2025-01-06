'use client';
import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useServiceDetails } from '@/utils/store';
import { formatDate } from '@/utils/format';
import BanksData from '@/data/BanksData';

function ServiceForm() {
    const { date, mood, price, bankName, bankAccountNumber } =
        useServiceDetails((state) => state);
    const bankLabel =
        BanksData.find((data) => data.value === bankName)?.label || bankName;
    return (
        <Card className="p-8 mb-4">
            <CardTitle className="mb-8">Summary </CardTitle>
            <Separator />
            <CardTitle className="mt-8 flex flex-col gap-4">
                <span className="font-semibold">
                    {date ? formatDate(new Date(date)) : 'Date'}
                </span>
                <span>{mood ? `${mood} 기분의 계좌` : 'Mood'}</span>
                <span>{bankLabel ? bankLabel : 'Bank Name'}</span>
                <span>
                    {bankAccountNumber ? bankAccountNumber : 'Account Number'}
                </span>
                <span>{price ? price : '금액을 입력해주세요'}</span>
            </CardTitle>
        </Card>
    );
}

export default ServiceForm;

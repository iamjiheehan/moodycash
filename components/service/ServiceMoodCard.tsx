import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useEffect } from 'react';
import { useServiceDetails } from '@/utils/store';
import BanksData from '@/data/BanksData';

type BankingInfoCardProps = {
    mood: string;
    bankName: string;
    bankAccountNumber: string;
    bankingId?: string;
    selected?: boolean;
    onChange?: () => void;
};

export function ServiceMoodCard({
    mood,
    bankName,
    bankingId,
    bankAccountNumber,
    selected = false,
    onChange,
}: BankingInfoCardProps) {
    useEffect(() => {
        if (selected) {
            useServiceDetails.setState({
                mood: mood,
                bankName: bankName,
                bankAccountNumber: bankAccountNumber,
                bankingId: bankingId,
            });

        }
    }, [selected]);
    const bankLabel =
        BanksData.find((data) => data.value === bankName)?.label || bankName;
    return (
        <Card
            className={`relative ${
                selected ? 'outline outline-offset-2 outline-blue-500 ' : ''
            }`}
            onClick={onChange}
        >
            <CardHeader>
                <h1> {mood} 기분 계좌</h1>
            </CardHeader>
            <CardContent className="flex gap-2">
                <p>{bankLabel}</p>
                <p>{bankAccountNumber}</p>
            </CardContent>
        </Card>
    );
}

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DeleteButton, EditButton } from '../form/Buttons';
import { useEffect } from 'react';
import { useServiceDetails } from '@/utils/store';
import { Separator } from '@radix-ui/react-dropdown-menu';
import BanksData from '@/data/BanksData';

type BankingInfoCardProps = {
    mood: string;
    bankName: string;
    bankAccountNumber: string;
    selected?: boolean;
    onChange?: () => void;
};

export function ServiceMoodCard({
    mood,
    bankName,
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
                <h1>{mood}</h1>
            </CardHeader>
            <CardContent className="flex gap-2">
                <p>{bankLabel}</p>
                <p>{bankAccountNumber}</p>
            </CardContent>
            
        </Card>
    );
}

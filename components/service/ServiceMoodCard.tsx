import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DeleteButton, EditButton } from '../form/Buttons';
import { useEffect } from 'react';
import { useServiceDetails } from '@/utils/store';

type BankingInfoCardProps = {
    mood: string;
    bankName: string;
    bankAccountNumber: string;
    description: string;
    selected?: boolean;
    onChange?: () => void;
};

export function ServiceMoodCard({
    mood,
    bankName,
    bankAccountNumber,
    description,
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
    return (
        <Card
            className={`relative h-[10rem] ${
                selected ? 'outline outline-offset-2 outline-blue-500 ' : ''
            }`}
            onClick={onChange} // Add onClick event to the card
        >
            <CardHeader>
                <h1>{mood}</h1>
                <h2>{description}</h2>
            </CardHeader>
            <CardContent>
                {bankName}
                {bankAccountNumber}
            </CardContent>
            <div className="absolute top-0 right-3 h-full py-2">
                <div className="flex flex-col justify-between h-full">
                    <EditButton />
                    <DeleteButton />
                </div>
            </div>
        </Card>
    );
}

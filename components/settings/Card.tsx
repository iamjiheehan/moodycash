import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DeleteButton, EditButton } from '../form/Buttons';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';

type BankingInfoCardProps = {
    mood: string;
    bankName: string;
    bankAccountNumber: string;
    description: string;
    selected?: boolean;
    onChange?: () => void;
    isRadio?: boolean;
};

export function MoodSettingCard({
    mood,
    bankName,
    bankAccountNumber,
    description,
    selected = false,
    onChange,
    isRadio = false,
}: BankingInfoCardProps) {
    return (
        <Card className={`relative h-[10rem] ${selected ? 'border-blue-500' : ''}`}>
            <CardHeader>
                <h1> Account for {mood} mood</h1>
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
            {isRadio && (
                <input
                    type="radio"
                    name="moodSetting"
                    checked={selected}
                    onChange={onChange}
                    className="absolute top-2 right-2"
                />
            )}
        </Card>
    );
}

export function MoodCreateCard() {
    return (
        <Link href="/settings/create">
            <Card className="relative h-[10rem]">
                <CardContent className="flex absolute items-center justify-center h-full w-full pb-0">
                    <FaPlus className="text-2xl text-primary" />
                </CardContent>
            </Card>
        </Link>
    );
}
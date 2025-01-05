import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DeleteButton, EditButton } from '../form/Buttons';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import BanksData from '@/data/BanksData';

type BankingInfoCardProps = {
    mood: string;
    bankName: string;
    bankAccountNumber: string;
    selected?: boolean;
    onChange?: () => void;
    isRadio?: boolean;
};

export function MoodSettingCard({
    mood,
    bankName,
    bankAccountNumber,
    selected = false,
    onChange,
    isRadio = false,
}: BankingInfoCardProps) {
    const bankLabel =
        BanksData.find((data) => data.value === bankName)?.label || bankName;
    return (
        <Card className={`relative ${selected ? 'border-blue-500' : ''}`}>
            <CardHeader>
                <h1> Account for {mood} mood</h1>
            </CardHeader>
            <CardContent>
                {bankLabel}
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
            <Card className="relative h-[7rem]">
                <CardContent className="flex absolute items-center justify-center h-full w-full pb-0">
                    <FaPlus className="text-2xl text-primary" />
                </CardContent>
            </Card>
        </Link>
    );
}

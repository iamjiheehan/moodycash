import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DeleteButton, EditButton } from '../form/Buttons';

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
    return (
        <Card
            className={`relative h-[10rem] ${
                selected ? 'border-blue-500' : ''
            }`}
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
            <input
                type="radio"
                name="moodSetting"
                checked={selected}
                onChange={onChange}
                className="absolute top-2 right-2"
            />
        </Card>
    );
}

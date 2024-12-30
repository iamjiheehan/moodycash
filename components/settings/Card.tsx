import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DeleteButton, EditButton } from '../form/Buttons';
import { FaPlus } from 'react-icons/fa';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
type BankingInfoCardProps = {
    mood: {
        name: string;
        description: string;
    };
    banking: {
        name: string;
        account: string;
    };
    children?: React.ReactNode;
};

export function MoodSettingCard({
    banking,
    mood,
    children,
}: BankingInfoCardProps) {
    return (
        <Card className="relative">
            <CardHeader>
                <h1> Account for {mood.name} mood</h1>
                <h2>{mood.description}</h2>
            </CardHeader>
            <CardContent>
                {banking.name}
                {banking.account}
            </CardContent>
            <div className="absolute top-0 right-3 h-full py-2">
                <div className="flex flex-col justify-between h-full">
                    <EditButton />
                    <DeleteButton />
                </div>
            </div>
            <div>{children}</div>
        </Card>
    );
}
export function MoodCreateCard() {
    return (
        <Link href="/settings/create">
            <Card className="relative h-full">
                <CardContent className="flex absolute items-center justify-center h-full w-full pb-0">
                    <FaPlus className="text-2xl text-primary" />
                </CardContent>
            </Card>
        </Link>
    );
}

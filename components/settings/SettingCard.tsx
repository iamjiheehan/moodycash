import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DeleteButton, EditButton } from '../form/Buttons';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import BanksData from '@/data/BanksData';
import { deleteBankingAction, fetchBankings } from '@/utils/actions';
import FormContainer from '../form/FormContainer';

type BankingInfoCardProps = {
    mood: string;
    bankName: string;
    bankAccountNumber: string;
    bankingId: string;
    selected?: boolean;
};

export async function MoodSettingCard({
    mood,
    bankName,
    bankAccountNumber,
    bankingId,
    selected = false,
}: BankingInfoCardProps) {
    const bankLabel =
        BanksData.find((data) => data.value === bankName)?.label || bankName;
    return (
        <Card className={`relative ${selected ? 'border-blue-500' : ''}`}>
            <CardHeader>
                <h1> Account for {mood} mood</h1>
            </CardHeader>
            <CardContent className="flex gap-2">
                <p>{bankLabel}</p>
                <p>{bankAccountNumber}</p>
            </CardContent>
            <div className="absolute top-0 right-3 h-full py-2">
                <div className="flex flex-col justify-between h-full">
                    <Link href={`/settings/${bankingId}/edit`}>
                        <EditButton />
                    </Link>
                    <DeleteBanking bankingId={bankingId} />
                </div>
            </div>
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

function DeleteBanking({ bankingId }: { bankingId: string }) {
    const deleteBanking = deleteBankingAction.bind(null, { bankingId });
    return (
        <FormContainer action={deleteBanking}>
            <DeleteButton />
        </FormContainer>
    );
}

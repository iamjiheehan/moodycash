import {
    MoodSettingCard,
    MoodCreateCard,
} from '@/components/settings/SettingCard';
import { fetchBankings } from '@/utils/actions';

type fetchedDetailsProps = {
    Banking: {
        bankName: string;
        bankAccountNumber: string;
        bankAccountHolder: string;
        mood: string;
        id: string;
    }[];
} | null;

export default async function SettingsPage() {
    const fetchedDetails: fetchedDetailsProps = await fetchBankings();
    return (
        <div className="container grid md:grid-cols-2 gap-8 mt-4">
            {fetchedDetails?.Banking.map((banking, index) => (
                <div key={index}>
                    <MoodSettingCard
                        key={index}
                        mood={banking.mood}
                        bankName={banking.bankName}
                        bankAccountNumber={banking.bankAccountNumber}
                        bankingId={banking.id}
                    />
                </div>
            ))}
            <MoodCreateCard />
        </div>
    );
}

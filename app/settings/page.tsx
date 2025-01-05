import { MoodSettingCard, MoodCreateCard } from '@/components/settings/Card';
import { fetchBankings } from '@/utils/actions';
import { useServiceDetails } from '@/utils/store';

type fetchedDetailsProps = {
    Banking: {
        bankName: string;
        bankAccountNumber: string;
        bankAccountHolder: string;
        mood: string;
        description: string;
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
                        onChange={() =>
                            useServiceDetails.setState({ mood: banking.mood })
                        }
                    />
                </div>
            ))}
            <MoodCreateCard />
        </div>
    );
}

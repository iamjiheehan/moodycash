// `SettingsPage`는 서버 컴포넌트
import { MoodSettingCard, MoodCreateCard } from '@/components/settings/Card';
import { fetchBankings } from '@/utils/actions';
import { useServiceDetails } from '@/utils/store';

export default async function SettingsPage() {
    const fetchedDetails = await fetchBankings();

    return (
        <div className="container grid md:grid-cols-2 gap-8 mt-4">
            {fetchedDetails?.Banking.map((banking, index) => (
                <div key={index}>
                    <MoodSettingCard
                        key={index}
                        mood={banking.mood}
                        bankName={banking.bankName}
                        bankAccountNumber={banking.bankAccountNumber}
                        description={banking.description}
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

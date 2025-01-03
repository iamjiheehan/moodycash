// `SettingsPage`는 서버 컴포넌트
import { MoodSettingCard, MoodCreateCard } from '@/components/settings/Card';
import { fetchBankings } from '@/utils/actions';

export default async function SettingsPage() {
    const data = await fetchBankings();

    return (
        <div className="container grid md:grid-cols-2 gap-8 mt-4">
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <MoodSettingCard
                        key={index}
                        banking={{
                            name: item.bankName,
                            account: item.bankAccountNumber,
                        }}
                        mood={{
                            name: item.mood,
                            description: item.description,
                        }}
                    />
                ))
            ) : (
                <div>No data available</div>
            )}
            <MoodCreateCard />
        </div>
    );
}

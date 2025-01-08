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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <section className="flex flex-row gap-2 mt-6 mb-6">
                <h1 className="text-2xl font-semibold capitalize">
                    등록된 계좌 모아보기
                </h1>
            </section>
            <section className="grid md:grid-cols-2 gap-8">
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
                {fetchedDetails && fetchedDetails?.Banking.length < 6 && (
                    <MoodCreateCard />
                )}
            </section>
        </div>
    );
}

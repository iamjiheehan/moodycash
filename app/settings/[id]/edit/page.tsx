import { MoodSettingCard } from '@/components/settings/SettingCard';
import { fetchBankinglDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';

async function EditSettingsPage({ params }: { params: { id: string } }) {
    const fetchedDetails = await fetchBankinglDetails(params.id);
    if (!fetchedDetails) redirect('/settings');

    return (
        <div className="container grid md:grid-cols-2 gap-8 mt-4">
            <MoodSettingCard
                mood={fetchedDetails.mood}
                bankName={fetchedDetails.bankName}
                bankAccountNumber={fetchedDetails.bankAccountNumber}
                bankingId={fetchedDetails.id}
            />
        </div>
    );
}

export default EditSettingsPage;

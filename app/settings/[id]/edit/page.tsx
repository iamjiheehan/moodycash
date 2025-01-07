// /app/settings/[id]/edit/page.tsx
import { fetchBankingDetails, fetchProfile } from '@/utils/actions';
import EditSettingsPage from '@/components/settings/EditSettingsPage';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import SettingLoadingCards from '@/components/settings/SettingLoadingCards';

interface PageProps {
    params: { id: string };
}

export default async function Page({ params }: PageProps) {
    const { id } = params;

    const fetchedDetails = await fetchBankingDetails(id);
    const profile = await fetchProfile();

    if (!fetchedDetails) {
        redirect('/settings');
    }

    return (
        <>
            <EditSettingsPage
                fetchedDetails={fetchedDetails}
                profile={profile}
            />
        </>
    );
}

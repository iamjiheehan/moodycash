import { fetchBankings } from '@/utils/actions';
import ServiceMood from './ServiceMoodContainer';
import EmptyList from '../home/EmptyList';

export default async function ServiceMoodWrapper() {
    const fetchedDetails = await fetchBankings();

    if (!fetchedDetails) {
        return <EmptyList />;
    }

    return (
        <>
            <ServiceMood fetchedDetails={fetchedDetails} />
        </>
    );
}

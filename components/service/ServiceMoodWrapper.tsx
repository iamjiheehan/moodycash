import { fetchBankings } from '@/utils/actions';
import ServiceMood from './ServiceMoodContainer';
import EmptyList from '../home/EmptyList';

export default async function ServiceMoodWrapper() {
    const fetchedDetails = await fetchBankings();

    if (!fetchedDetails) {
        return <EmptyList />;
    }

    return (
        <section>
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                How are you feeling?
            </h1>
            <ServiceMood fetchedDetails={fetchedDetails} />
        </section>
    );
}

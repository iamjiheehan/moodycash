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
                기분에 맞는 계좌를 선택해주세요
            </h1>
            <ServiceMood fetchedDetails={fetchedDetails} />
        </section>
    );
}

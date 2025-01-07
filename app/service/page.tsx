import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import ServiceDescription from '@/components/service/ServiceDescription';
import ConfirmService from '@/components/service/ConfirmService';
import ServiceContainer from '@/components/service/ServiceContainer';

const DynamicCalendarWrapper = dynamic(
    () => import('@/components/service/ServiceCalendarWrapper'),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[200px] w-full" />,
    }
);
const DynamicPriceWrapper = dynamic(
    () => import('@/components/service/ServicePrice'),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[200px] w-full" />,
    }
);
const DynamicMoodWrapper = dynamic(
    () => import('@/components/service/ServiceMoodWrapper'),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[200px] w-full" />,
    }
);

async function ServicePage() {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:grid-cols-2 lg:gap-8">
            <section className="basis-3/4">
                <div className="flex flex-col gap-8">
                    <DynamicMoodWrapper />
                    <ServiceDescription />
                    <DynamicPriceWrapper />
                </div>
            </section>
            <section className="basis-1/4 flex flex-col justify-end gap-8">
                <DynamicCalendarWrapper />
                <div>
                    <ServiceContainer />
                    <ConfirmService />
                </div>
            </section>
        </section>
    );
}

export default ServicePage;

import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const DynamicCreateSettingPageWrapper = dynamic(
    () => import('@/components/settings/CreateSettingPage'),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[200px] w-full" />,
    }
);
export default async function CreatePage() {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 border p-8 rounded-md shadow-2xl sm:w-[50%] md:w-[40%] lg:w-[35%]">
            <section className="flex flex-row gap-2 mt-6 mb-6">
                <h1 className="text-2xl font-semibold capitalize">
                    계좌 추가 (최대 6개)
                </h1>
            </section>
            <DynamicCreateSettingPageWrapper />
        </section>
    );
}

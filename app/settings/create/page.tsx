import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const DynamicVerifyAccountHolderWrapper = dynamic(
    () => import('@/components/settings/CreateVerifyAccountHolder'),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[200px] w-full" />,
    }
);
export default async function CreatePage() {
    return (
        <section className="container border p-8 rounded-md shadow-2xl w-[30%]">
            <section className="flex flex-row gap-2 mt-6 mb-6">
                <h1 className="text-2xl font-semibold capitalize">계좌 추가</h1>
            </section>
            <DynamicVerifyAccountHolderWrapper />
        </section>
    );
}

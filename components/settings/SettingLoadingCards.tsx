import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function SettingLoadingCards() {
    return (
        <section className="flex items-center justify-center mt-4 w-full">
            <SkeletonCard />
        </section>
    );
}

export function SkeletonCard() {
    return (
        <Card className="w-[30%] p-8 shadow-2xl flex flex-col gap-10">
            <div className="flex flex-col gap-1">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 mt-2 w-3/4" />
            </div>
            <div className="flex flex-col gap-1">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 mt-2 w-3/4" />
            </div>
            <div className="flex flex-col gap-1">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 mt-2 w-3/4" />
            </div>
            <div className="flex flex-col gap-1">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 mt-2 w-3/4" />
            </div>
            <div className="flex flex-col gap-1">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 mt-2 w-3/4" />
            </div>
        </Card>
    );
}

export default SettingLoadingCards;

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingCards() {
    return (
        <section className="mt-4 gap-8 grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
        </section>
    );
}

export function SkeletonCard() {
    return (
        <Card className="relative h-[10rem]">
            <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 mt-2 w-1/3" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 mt-2 w-full" />
                <Skeleton className="h-4 mt-2 w-3/4" />
            </CardContent>
        </Card>
    );
}

export default LoadingCards;

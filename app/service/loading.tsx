'use client';

import { RadioGroup } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';

function ServiceLoadingPage() {
    return (
        <form className="container mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:grid-cols-2 lg:gap-8">
            <h1>
                <Skeleton className="h-6 w-1/2" />
            </h1>
            <h1>
                <Skeleton className="h-6 w-1/2" />
            </h1>
            <section className="flex">
                <RadioGroup>
                    <Skeleton className="h-6 w-1/2" />
                </RadioGroup>
            </section>
            <section>
                <h1>
                    <Skeleton className="h-6 w-1/2" />
                </h1>
                <Skeleton className="h-6 w-1/2" />
            </section>
            <section className="flex gap-4 items-center justify-between">
                <h1>
                    <Skeleton className="h-6 w-1/2" />
                </h1>
                <section className="grid grid-cols-2 gap-4 items-center">
                    <Skeleton className="h-4 mt-2 w-1/3" />
                </section>
            </section>
            <section>
                <Skeleton className="h-6 w-1/2" />
            </section>
        </form>
    );
}

export default ServiceLoadingPage;

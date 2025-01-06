'use client';

import MoodCalendar from '@/components/mood/MoodCalendar';
import { MoodChart } from '@/components/mood/MoodChart';
import React from 'react';

export default function MoodPage() {
    return (
        <section className="container flex flex-col gap-24 py-10">
            <section className="flex flex-col gap-8">
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                    그래프로 확인하는 기록
                </h1>
                <MoodChart />
            </section>
            <section className="flex flex-col gap-8">
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                    달력으로 보는 기록
                </h1>
                <MoodCalendar />
            </section>
        </section>
    );
}

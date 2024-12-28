'use client';

import MoodCalendar from '@/components/mood/MoodCalendar';
import { MoodChart } from '@/components/mood/MoodChart';
import React from 'react';

export default function MoodPage() {
    return (
        <section>
            <h1>This is How you are feeling!</h1>
            <section>
                <h2>금액으로 보는 기분 변화 그래프</h2>
                <MoodChart />
            </section>
            <section>
                <h2>달력으로 보는 기록</h2>
                <section>
                    <MoodCalendar />
                </section>
            </section>
        </section>
    );
}

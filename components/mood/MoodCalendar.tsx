'use client';

import React, { useEffect, useState } from 'react';
import { Calendar } from '../ui/calendar';
import { chartData } from './MoodMockData';
import { DayMouseEventHandler } from 'react-day-picker';
import { formatDateFromISOString } from '@/utils/format';

export default function MoodCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date[]>([]);
    const [selectedData, setSelectedData] = useState<any | undefined>(
        undefined
    );

    useEffect(() => {
        const initialSelectedDates: Date[] = chartData.map(
            (item) => new Date(item.date)
        );
        setSelectedDate(initialSelectedDates);
    }, []);

    const handleDayClick: DayMouseEventHandler = (day, _) => {
        const selectedDateString = day.toISOString().split('T')[0];
        chartData.forEach((item) => {
            if (item.date === selectedDateString) {
                setSelectedData(item);
            }
        });
    };
    return (
        <section className="flex flex-row justify-between gap-8">
            <Calendar
                mode="multiple"
                onDayClick={handleDayClick}
                selected={selectedDate}
                className="rounded-md border shadow"
            />
            <section className="border p-8 rounded-md w-full shadow">
                {!selectedData && <div>날짜를 선택해주세요</div>}
                {selectedDate.length > 0 && selectedData && (
                    <section className="flex flex-col gap-4">
                        <p className="text-xl">
                            {formatDateFromISOString(selectedData.date)}에
                        </p>
                        <p className="text-xl">
                            {`${selectedData.amount}원을 ${selectedData.mood} 계좌에 담아두셨군요!`}
                        </p>
                        <p className="text-xl">
                            그 날 남긴 메모는 {selectedData.memo} 이에요.
                        </p>
                    </section>
                )}
            </section>
        </section>
    );
}

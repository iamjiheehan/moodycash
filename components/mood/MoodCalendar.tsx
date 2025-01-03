'use client';

import React, { useEffect, useState } from 'react';
import { Calendar } from '../ui/calendar';
import { chartData } from './MoodMockData';
import { DayMouseEventHandler } from 'react-day-picker';

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
        console.log('selectedDateString:', selectedDateString);
        chartData.forEach((item) => {
            if (item.date === selectedDateString) {
                setSelectedData(item);
            }
        });
    };
    return (
        <section className="flex flex-row justify-between">
            <Calendar
                mode="multiple"
                onDayClick={handleDayClick}
                selected={selectedDate}
                className="rounded-md border shadow"
            />
            {!selectedData && <div>날짜를 선택해주세요</div>}
            {selectedDate.length > 0 && selectedData && (
                <section>
                    <div>{selectedData.date}</div>
                    <div>
                        {selectedData.amount} 원 만큼
                        {selectedData.mood}한 날
                    </div>
                    <div>{selectedData.memo}</div>
                </section>
            )}
        </section>
    );
}

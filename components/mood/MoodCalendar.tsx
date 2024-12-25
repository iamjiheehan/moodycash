import React, { useState } from 'react';
import { Calendar } from '../ui/calendar';
import { chartData } from './MoodMockData';

export default function MoodCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );
    const [selectedData, setSelectedData] = useState<any | undefined>(
        undefined
    );

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
            const selectedDateString = date.toISOString().split('T')[0];
            const data = chartData.find(
                (item) => item.date === selectedDateString
            );
            setSelectedData(data);
        } else {
            setSelectedData(undefined);
        }
    };

    const initialSelectedDates = chartData.map((item) => new Date(item.date));

    return (
        <section className="flex flex-col items-center">
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                className="rounded-md border shadow"
            />
            <div>선택된 날짜를 클릭해보세요</div>
            {selectedDate && selectedData && (
                <section>
                    <div>{selectedData.date}</div>
                    <div>
                        {selectedData.amount} 원 만큼
                        {selectedData.mood}한 날
                    </div>
                    <div>메모: {selectedData.memo}</div>
                </section>
            )}
        </section>
    );
}

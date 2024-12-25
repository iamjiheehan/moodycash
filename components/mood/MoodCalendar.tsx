import React, { useState } from 'react';
import { Calendar } from '../ui/calendar';
import { chartData } from './MoodMockData';

export default function MoodCalendar() {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [selectedData, setSelectedData] = useState<any>(null);

    function handleDateChange(dates: Date[] | undefined) {
        if (dates) {
            setSelectedDates(dates);
            const selectedDateStrings = dates.map(
                (date) => date.toISOString().split('T')[0]
            );
            const data = chartData.filter((item) =>
                selectedDateStrings.includes(item.date)
            );
            setSelectedData(data);
        } else {
            setSelectedDates([]);
            setSelectedData(null);
        }
    }

    // Convert chartData dates to Date objects
    const initialSelectedDates = chartData.map((item) => new Date(item.date));

    return (
        <section className="flex flex-col items-center">
            <Calendar
                mode="multiple"
                selected={initialSelectedDates}
                onSelect={handleDateChange}
                className="rounded-md border shadow"
            />
            <div>선택된 날짜를 클릭해보세요</div>
            {selectedData && selectedData.length > 0 && (
                <section>
                    {selectedData.map((data: any, index: number) => (
                        <div key={index} className="mt-4">
                            <div>{data.date}</div>
                            <div>
                                {data.amount} 원 만큼{data.feeling}한 날날
                            </div>
                            <div>메모: {data.memo}</div>
                        </div>
                    ))}
                </section>
            )}
        </section>
    );
}

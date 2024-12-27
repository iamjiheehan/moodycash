import React, { useState } from 'react';
import { Calendar } from '../ui/calendar';
import { chartData } from './MoodMockData';

export default function MoodCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date[] | undefined>([]); // 초기값을 빈 배열로 설정
    const [selectedData, setSelectedData] = useState<any | undefined>(
        undefined
    );

    const handleDateChange = (dates: Date[] | undefined) => {
        setSelectedDate(dates);
        if (dates && dates.length > 0) {
            const selectedDateString = dates[0].toISOString().split('T')[0]; // 첫 번째 선택된 날짜만 사용
            const data = chartData.find(
                (item) => item.date === selectedDateString
            );
            setSelectedData(data);
        } else {
            setSelectedData(undefined);
        }
    };

    const initialSelectedDates = chartData.map((item) => new Date(item.date));
    console.log('initialSelectedDates :', initialSelectedDates);
    return (
        <section className="flex flex-col items-center">
            <Calendar
                mode="multiple"
                selected={selectedDate}
                onSelect={handleDateChange} // dates는 Date[] | undefined
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

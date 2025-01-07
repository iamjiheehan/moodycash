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
    const [firstDate, setFirstDate] = useState<string | undefined>(undefined);
    const [lastDate, setLastDate] = useState<string | undefined>(undefined);
    const [count, setCount] = useState(0);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const initialSelectedDates: Date[] = chartData.map(
            (item) => new Date(item.date)
        );
        setSelectedDate(initialSelectedDates);

        const sortedData = [...chartData].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setFirstDate(sortedData[0]?.date);
        setLastDate(sortedData[sortedData.length - 1]?.date);

        const totalAmount = chartData.reduce(
            (sum, item) => sum + item.amount,
            0
        );
        setAmount(totalAmount);
        setCount(chartData.length);
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
        <section className="flex flex-col sm:flex-row justify-between gap-8">
            {selectedDate.length === 0 ? (
                <p className="text-xl">아직 기록을 하신 적이 없어요</p>
            ) : (
                <>
                    <Calendar
                        mode="multiple"
                        onDayClick={handleDayClick}
                        selected={selectedDate}
                        className="rounded-md border shadow"
                        fromMonth={firstDate ? new Date(firstDate) : undefined}
                        toMonth={lastDate ? new Date(lastDate) : undefined}
                    />
                    <section className="border p-8 rounded-md w-full shadow">
                        {!selectedData && <div>기록한 날짜를 선택해주세요</div>}
                        {selectedDate.length > 0 && selectedData && (
                            <section className="flex flex-col gap-4">
                                <p>
                                    {formatDateFromISOString(selectedData.date)}
                                    에
                                </p>
                                <p>
                                    {`${selectedData.amount}원 만큼 ${selectedData.mood}한 날이었어요.`}
                                </p>
                                <p className="">
                                    그 날 남긴 메모는 {selectedData.memo}{' '}
                                    이에요.
                                </p>
                            </section>
                        )}
                    </section>
                    <section className="border p-8 rounded-md w-full shadow flex flex-col gap-4">
                        <p>
                            가장 처음에 기록한 날짜는{' '}
                            {firstDate
                                ? formatDateFromISOString(firstDate)
                                : ''}
                            .
                        </p>
                        <p>
                            가장 최근에 기록한 날짜는{' '}
                            {lastDate ? formatDateFromISOString(lastDate) : ''}.
                        </p>
                        <p>지금까지 {count}번 기록했어요.</p>
                        <p>총 송금 금액은 {amount}원 이에요.</p>
                    </section>
                </>
            )}
        </section>
    );
}

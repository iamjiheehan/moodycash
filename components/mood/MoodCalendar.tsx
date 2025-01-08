import React, { useEffect, useState } from 'react';
import { Calendar } from '../ui/calendar';
import { DayMouseEventHandler } from 'react-day-picker';
import { formatCurrency, formatDateFromISOString } from '@/utils/format';
import { fetchServiceData } from '@/utils/fetchServiceData';
import { Button } from '../ui/button';
import Link from 'next/link';

interface ServiceData {
    id: string;
    date: Date;
    description: string;
    mood: string;
    price: number;
}

export default function MoodCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date[]>([]);
    const [selectedData, setSelectedData] = useState<ServiceData | undefined>(
        undefined
    );
    const [firstDate, setFirstDate] = useState<Date | undefined>(undefined);
    const [lastDate, setLastDate] = useState<Date | undefined>(undefined);
    const [count, setCount] = useState(0);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchServiceData();
            if (data) {
                const serviceData: ServiceData[] = data.map((item) => ({
                    ...item,
                    date: new Date(item.date),
                }));

                const initialSelectedDates: Date[] = serviceData.map(
                    (item) => item.date
                );
                setSelectedDate(initialSelectedDates);

                const sortedData = [...serviceData].sort(
                    (a, b) => a.date.getTime() - b.date.getTime()
                );
                setFirstDate(sortedData[0]?.date);
                setLastDate(sortedData[sortedData.length - 1]?.date);

                const totalAmount = serviceData.reduce(
                    (sum, item) => sum + item.price,
                    0
                );
                setAmount(totalAmount);
                setCount(serviceData.length);
            }
        };

        fetchData();
    }, []);

    const handleDayClick: DayMouseEventHandler = (day, _) => {
        const selectedDateString = day.toISOString().split('T')[0];
        fetchServiceData().then((data) => {
            if (data) {
                const serviceData: ServiceData[] = data.map((item) => ({
                    ...item,
                    date: new Date(item.date),
                }));
                serviceData.forEach((item) => {
                    if (
                        item.date.toISOString().split('T')[0] ===
                        selectedDateString
                    ) {
                        setSelectedData(item);
                    }
                });
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
                            <section className="flex flex-col gap-4 relative h-full">
                                <p>
                                    {formatDateFromISOString(selectedData.date)}
                                    에
                                </p>
                                <p>
                                    {`${selectedData.price}원 만큼 '${selectedData.mood}'한 날이었어요.`}
                                </p>
                                <p className="">
                                    {`그 날 남긴 메모는 '${selectedData.description}'
                                    이에요.`}
                                </p>
                                <section className="absolute right-0 bottom-0">
                                    <Link
                                        href={`/service/${selectedData.id}/edit`}
                                    >
                                        <Button>해당 기록 수정하기</Button>
                                    </Link>
                                </section>
                            </section>
                        )}
                    </section>
                    <section className="border p-8 rounded-md w-full shadow flex flex-col gap-4">
                        <p>
                            가장 처음에 기록한 날짜는
                            <br />
                            {firstDate
                                ? formatDateFromISOString(firstDate)
                                : ''}
                            .
                        </p>
                        <p>
                            가장 최근에 기록한 날짜는
                            <br />
                            {lastDate ? formatDateFromISOString(lastDate) : ''}.
                        </p>
                        <p>지금까지 {count}번 기록했어요.</p>
                        <p>총 송금 금액은 {formatCurrency(amount)} 이에요.</p>
                    </section>
                </>
            )}
        </section>
    );
}

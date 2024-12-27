'use client';

import React from 'react';
import { Calendar } from '../ui/calendar';

type SelectCalendarProps = {
    onChange: (date: Date | undefined) => void;
};

export default function SelectCalendar({ onChange }: SelectCalendarProps) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const handleDateChange = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        onChange(selectedDate);
    };

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="rounded-md border shadow"
        />
    );
}
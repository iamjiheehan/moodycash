'use client';

import React, { useEffect, useState } from 'react';
import { Calendar } from '../ui/calendar';
import { useServiceDetails } from '@/utils/store';

export default function SelectCalendar() {
    const currentDate = new Date();
    const [date, setDate] = useState<Date | undefined>(currentDate);

    useEffect(() => {
        if (date) {
            useServiceDetails.setState({ date });
        }
    }, [date]);
    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow w-full mt-4"
        />
    );
}

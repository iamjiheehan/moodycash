'use client';

import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Calendar } from '../ui/calendar';

export default function SelectCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
        />
    );
}

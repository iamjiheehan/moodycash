'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import TextAreaInput from '@/components/form/TextAreaInput';
import React, { useState, useEffect } from 'react';
import SelectCalendar from '@/components/service/SelectCalendar';
import { InputOTPControlled } from '@/components/form/OptInput';
import { formatCurrency } from '@/utils/format';
import AlertForm from '@/components/form/AlertForm';
import { fetchMoods } from '@/utils/actions';

function ServicePage() {
    const feelingList = ['Good', 'Bad', 'Angry', 'Hungry'];
    const [otpValue, setOtpValue] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );
    const [selectedFeeling, setSelectedFeeling] = useState(feelingList[0]);
    const [moods, setMoods] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedMoods = await fetchMoods();
            if (fetchedMoods) {
                setMoods(fetchedMoods);
            }
        };

        fetchData();
        console.log('moods:', moods);
    }, []);

    const formattedOtpValue = formatCurrency(
        Number(otpValue.replace(/,/g, ''))
    );

    return (
        <form>
            <h1>When did you start feeling this way?</h1>
            <SelectCalendar onChange={setSelectedDate} />
            <h1>How are you feeling?</h1>
            <section className="flex">
                <RadioGroup
                    defaultValue={feelingList[0]}
                    onValueChange={setSelectedFeeling}
                >
                    {feelingList.map((feeling, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem id={`r${index}`} value={feeling} />
                            <Label htmlFor={`r${index}`}>{feeling}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </section>
            <section>
                <h1>What’s behind how you’re feeling?</h1>
                <TextAreaInput
                    name="description"
                    labelText="Description (10 - 50 Words)"
                    placeholder="Describe your feelings"
                />
            </section>
            <section className="flex gap-4 items-center justify-between">
                <h1>How much would you like to transfer?</h1>
                <section className="grid grid-cols-2 gap-4 items-center">
                    <InputOTPControlled
                        maxLength={4}
                        value={otpValue}
                        onChange={setOtpValue}
                    />
                    <p>won</p>
                </section>
            </section>
            <section>
                You are feeling {selectedFeeling} on{' '}
                {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : 'No date selected'}
                , and you would like to transfer {formattedOtpValue} won worth
                of {selectedFeeling.toLowerCase()} into your account.
            </section>
            <section className="flex justify-center py-8">
                <AlertForm
                    actionType="submit"
                    title="Are you sure?"
                    description={`Transferring ${formattedOtpValue} won to happy account`}
                />
            </section>
        </form>
    );
}

export default ServicePage;

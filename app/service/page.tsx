import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import TextAreaInput from '@/components/form/TextAreaInput';
import React, { useState, useEffect } from 'react';
import SelectCalendar from '@/components/service/ServiceCalendar';
import { formatCurrency } from '@/utils/format';
import AlertForm from '@/components/form/AlertForm';
import {
    fetchBankings,
    fetchMoods,
    fetchMoodWithBankings,
    fetchProfile,
} from '@/utils/actions';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { useServiceDetails } from '@/utils/store';
import ServiceRadio from '@/components/service/ServiceRadio';
import RadioGroupComponent from '@/components/service/ServiceRadio';
import SelectRadio from '@/components/service/ServiceRadio';

const DynamicServiceWrapper = dynamic(
    () => import('@/components/service/ServiceSummaryWrapper'),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[200px] w-full" />,
    }
);
const DynamicPriceWrapper = dynamic(
    () => import('@/components/service/ServicePrice'),
    {
        ssr: false,
        loading: () => <Skeleton className="h-[200px] w-full" />,
    }
);

async function ServicePage() {
    const fetchedDetails = await fetchBankings();
    const { clerkId } = await fetchProfile();

    console.log('fetchedDetails:', fetchedDetails);
    return (
        <form className="container flex flex-col gap-24 py-10">
            {/* {fetchedDetails?.Banking.map((mood, index) => (
                <div key={index}>
                    <p>Mood: {mood.mood}</p>
                    <p>Bank Name: {mood.bankName}</p>
                    <p>Bank Account Holder: {mood.bankAccountHolder}</p>
                    <p>Bank Account Number: {mood.bankAccountNumber}</p>
                    <p>Description: {mood.description}</p>
                </div>
            ))} */}
            <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
                <div className="lg:col-span-8">
                    <section className="flex flex-col gap-8">
                        <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                            How are you feeling?
                        </h1>
                        <SelectRadio moods={fetchedDetails?.Banking || []} />
                    </section>
                    <section className="flex flex-col gap-8">
                        <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                            What’s behind how you’re feeling?
                        </h1>
                        <TextAreaInput
                            name="description"
                            labelText="Description (10 - 50 Words)"
                            placeholder="Describe your feelings"
                        />
                    </section>
                    <section className="flex gap-4 items-center justify-between">
                        <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                            How much would you like to transfer?
                        </h1>
                        <section className="flex gap-4 items-center">
                            <DynamicPriceWrapper />
                            <p>won</p>
                        </section>
                    </section>
                </div>
                <div className="lg:col-span-4 flex flex-col items-center">
                    <section className="flex flex-col gap-8">
                        <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                            When did you start feeling this way?
                        </h1>
                        {/* <SelectCalendar onChange={setSelectedDate} /> */}
                    </section>{' '}
                    *
                    <DynamicServiceWrapper />
                </div>
            </section>
            <section className="flex justify-between">
                {/* <h1 className="text-lg font-bold text-black-600">
                    You are feeling {selectedFeeling} on{' '}
                    {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : 'No date selected'}
                    , and you would like to transfer {formattedOtpValue} won
                    worth of {selectedFeeling.toLowerCase()} into your account.
                </h1> */}
                {/* <AlertForm
                    actionType="submit"
                    title="Are you sure?"
                    description={`Transferring ${formattedOtpValue} won to happy account`}
                /> */}
            </section>
        </form>
    );
}

export default ServicePage;

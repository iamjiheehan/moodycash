'use client';

import { useEffect, useState } from 'react';
import { MoodCreateCard } from '@/components/settings/Card';
import { ServiceMoodCard } from './ServiceMoodCard';
import { useServiceDetails } from '@/utils/store';

type BankingInfo = {
    mood: string;
    bankName: string;
    bankAccountNumber: string;
    description: string;
};

type ServiceMoodProps = {
    fetchedDetails: {
        Banking: BankingInfo[];
    };
};

export default function ServiceMood({ fetchedDetails }: ServiceMoodProps) {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    const handleRadioChange = (mood: string) => {
        setSelectedMood(mood);
    };

    return (
        <div className="container grid md:grid-cols-2 gap-8 mt-4">
            {fetchedDetails?.Banking.map((banking, index) => (
                <div key={index}>
                    <ServiceMoodCard
                        key={index}
                        mood={banking.mood}
                        bankName={banking.bankName}
                        bankAccountNumber={banking.bankAccountNumber}
                        selected={selectedMood === banking.mood}
                        onChange={() => handleRadioChange(banking.mood)}
                    />
                </div>
            ))}
            <MoodCreateCard />
        </div>
    );
}

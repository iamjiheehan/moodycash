'use client';

import { useState } from 'react';
import { MoodCreateCard } from '@/components/settings/SettingCard';
import { ServiceMoodCard } from './ServiceMoodCard';

type BankingInfo = {
    id: string;
    mood: string;
    bankName: string;
    bankAccountNumber: string;
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
                        selected={selectedMood === banking.id}
                        onChange={() => handleRadioChange(banking.id)}
                    />
                </div>
            ))}
            {fetchedDetails && fetchedDetails?.Banking.length < 6 && (
                <MoodCreateCard />
            )}
        </div>
    );
}

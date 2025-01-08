'use client';

import { useState } from 'react';
import {
    MoodCreateCard,
    MoodTemplateCard,
} from '@/components/settings/SettingCard';
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

    const bankingCount = fetchedDetails.Banking.length || 0; 
    const templateCount = Math.max(0, 6 - bankingCount - 1); 

    return (
        <div className="grid md:grid-cols-2 gap-8 mt-4">
            {fetchedDetails.Banking.map((banking, index) => (
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
            {Array.from({ length: templateCount }).map((_, index) => (
                <MoodTemplateCard key={`template-${index}`} />
            ))}
            {bankingCount < 6 && <MoodCreateCard />}
        </div>
    );
}

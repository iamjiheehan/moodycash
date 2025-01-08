'use client';

import { useEffect, useState } from 'react';
import {
    MoodCreateCard,
    MoodTemplateCard,
} from '@/components/settings/SettingCard';
import { ServiceMoodCard } from './ServiceMoodCard';
import { useToast } from '@/hooks/use-toast';

type BankingInfo = {
    id: string;
    mood: string;
    bankName: string;
    bankAccountNumber: string;
};

type BankingDeatilsProps = {
    fetchedBankingDetails: {
        Banking: BankingInfo[];
    };
};

type FetchedMoodProps = {
    mood?: string;
    bankingId?: string;
};

type ServiceMoodProps = BankingDeatilsProps & FetchedMoodProps;

export default function ServiceMood({
    fetchedBankingDetails,
    mood,
    bankingId,
}: ServiceMoodProps) {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (bankingId) {
            const matchedBanking = fetchedBankingDetails.Banking.find(
                (banking) => banking.id === bankingId
            );
            if (matchedBanking) {
                setSelectedMood(matchedBanking.id);
            } else {
                toast({
                    description:
                        '해당 기록시 선택하셨던 계좌가 존재하지 않습니다',
                });
            }
        }
    }, [bankingId, fetchedBankingDetails.Banking]);

    const handleRadioChange = (mood: string) => {
        setSelectedMood(mood);
    };

    const bankingCount = fetchedBankingDetails.Banking.length || 0;
    const templateCount = Math.max(0, 6 - bankingCount - 1);

    return (
        <div className="grid md:grid-cols-2 gap-8 mt-4">
            {fetchedBankingDetails.Banking.map((banking, index) => (
                <div key={index}>
                    <ServiceMoodCard
                        key={index}
                        mood={banking.mood}
                        bankName={banking.bankName}
                        bankingId={banking.id}
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

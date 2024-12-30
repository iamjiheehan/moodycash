'use client';

import { MoodSettingCard, MoodCreateCard } from '@/components/settings/Card';
import { fetchBankings } from '@/utils/actions';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
    const [data, setData] = useState<
        | {
              bankName: string;
              mood: string;
              description: string;
              bankAccountNumber: string;
          }[]
        | undefined
    >(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedBankingData = await fetchBankings();
            if (fetchedBankingData) {
                setData(fetchedBankingData);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log('fetchedBankingData:', data);
    }, [data]);

    return (
        <div className="grid md:grid-cols-2 gap-8 mt-4 ">
            {data &&
                data.map((data, index) => (
                    <MoodSettingCard
                        key={index}
                        banking={{
                            name: data.bankName,
                            account: data.bankAccountNumber,
                        }}
                        mood={{
                            name: data.mood,
                            description: data.description,
                        }}
                    />
                ))}
            <MoodCreateCard />
        </div>
    );
}

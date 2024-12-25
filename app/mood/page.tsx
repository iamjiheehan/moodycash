'use client';

import AlertForm from '@/components/form/AlertForm';
import { EditButton } from '@/components/form/Buttons';
import EmptyList from '@/components/home/EmptyList';
import { MoodChart } from '@/components/mood/MoodChart';
import MoodSettingCard from '@/components/setting/BankingInfoCard';
import { deleteMoodInfoAction } from '@/utils/actions';
import Link from 'next/link';
import React from 'react';

export default function MoodPage() {
    return (
        <section>
            <h1>This is How you are feeling!</h1>
            <section>
                <h2>금액으로 보는 기분 변화 그래프</h2>
                <MoodChart />
            </section>

            <MoodList />
        </section>
    );
}

function MoodList() {
    const moodlist = [
        {
            id: 1,
            moodInfo: {
                name: 'Happy',
                description: 'I am happy',
            },
            bankingInfo: {
                name: 'IBK',
                account: '123456789',
            },
        },
        {
            id: 2,
            moodInfo: {
                name: 'Sad',
                description: 'I am Sad',
            },
            bankingInfo: {
                name: 'IBK',
                account: '123456789',
            },
        },
    ];

    if (moodlist.length === 0) return <EmptyList />;

    const handleDeleteAction = async (moodId: number) => {
        await deleteMoodInfoAction({ moodId });
    };

    return (
        <section className="grid md:grid-cols-2 gap-8 mt-4 ">
            {moodlist.map((mood) => {
                const moodInfo = mood.moodInfo;
                const bankingInfo = mood.bankingInfo;

                return (
                    <MoodSettingCard
                        key={mood.id}
                        moodInfo={moodInfo}
                        bankingInfo={bankingInfo}
                    >
                        <section className="h-full flex flex-col justify-between">
                            <Link href="/mood/setting">
                                <EditButton />
                            </Link>
                            <AlertForm
                                actionType="delete"
                                title="Are you sure?"
                                description={`Deleting ${moodInfo.name} mood and banking information.`}
                                callback={() => handleDeleteAction(mood.id)}
                            />
                        </section>
                    </MoodSettingCard>
                );
            })}
        </section>
    );
}

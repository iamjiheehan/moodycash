import { MoodSettingCard, MoodCreateCard } from '@/components/settings/page';
import React from 'react';

export default function SettingsPage() {
    const banking = { name: 'lala', account: 'lala' };
    const mood = { name: 'happy', description: 'I will be fine' };
    return (
        <div className="grid md:grid-cols-2 gap-8 mt-4 ">
            <MoodSettingCard banking={banking} mood={mood} />
            <MoodCreateCard />
        </div>
    );
}

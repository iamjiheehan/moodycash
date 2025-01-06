'use Client';

import React, { useEffect, useState } from 'react';
import FormInput from '../form/FormInput';
import { useBankingDetails } from '@/utils/store';

export default function SettingMoodWrapper() {
    const [mood, setMood] = useState('');
    useEffect(() => {
        useBankingDetails.setState({ mood });
    }, [mood]);

    return (
        <>
            <FormInput
                name="mood"
                type="text"
                placeholder="예시 :  기쁜 날, 슬픈 날"
                label="어떤 기분을 담아 이 계좌에 돈을 넣으실 건가요?"
                onChange={(e) => setMood(e.target.value)}
            />
        </>
    );
}

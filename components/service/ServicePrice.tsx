'use client';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { useServiceDetails } from '@/utils/store';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useEffect, useState } from 'react';

export default function ServicePrice() {
    const [price, setPrice] = useState<number>();
    const maxLength = 4;

    useEffect(() => {
        useServiceDetails.setState({ price: price || undefined });
    }, [price]);

    const handleChange = (newValue: string) => {
        const numericValue = newValue.replace(/[^0-9]/g, '');
        if (numericValue !== newValue) return;
        setPrice(Number(numericValue));
    };

    return (
        <section className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                얼마를 담아 보낼지 적어주세요
            </h1>
            <div className="space-y-2 flex items-center gap-8">
                <InputOTP
                    maxLength={maxLength}
                    pattern={REGEXP_ONLY_DIGITS}
                    onChange={handleChange}
                    inputMode="numeric"
                >
                    <InputOTPGroup>
                        {Array.from({ length: maxLength }).map((_, index) => (
                            <InputOTPSlot key={index} index={index} />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
                <h2>원</h2>
            </div>
        </section>
    );
}

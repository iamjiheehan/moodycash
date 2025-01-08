'use client';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useEffect, useState } from 'react';

interface PriceInputProps {
    maxLength?: number;
    onChange: (price: number) => void;
    label?: string;
    defaultValue?: number;
}

export default function PriceInputForm({
    maxLength = 4,
    onChange,
    label = 'Enter the amount',
    defaultValue = 0,
}: PriceInputProps) {
    const [price, setPrice] = useState<string>(defaultValue !== 0 ? defaultValue.toString() : '');

    useEffect(() => {
        onChange(Number(price) || 0);
    }, [price, onChange]);

    const handleChange = (newValue: string) => {
        const numericValue = newValue.replace(/[^0-9]/g, '');
        setPrice(numericValue);
    };

    return (
        <section className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                {label}
            </h1>
            <div className="space-y-2 flex items-center gap-8">
                <InputOTP
                    maxLength={maxLength}
                    pattern={REGEXP_ONLY_DIGITS}
                    onChange={handleChange}
                    inputMode="numeric"
                    value={price} // Use value instead of defaultValue
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
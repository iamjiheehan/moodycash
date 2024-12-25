'use client';

import * as React from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { formatCurrency } from '@/utils/format';

type InputOTPControlledProps = {
    maxLength: number;
    value: string;
    onChange: (value: string) => void;
};

export function InputOTPControlled({
    maxLength,
    value,
    onChange,
}: InputOTPControlledProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/[^0-9]/g, ''); // 숫자가 아닌 문자는 제거
        onChange(newValue);
    };

    const formattedValue = value
        ? formatCurrency(Number(value.replace(/,/g, '')))
        : '';

    return (
        <div className="space-y-2">
            <InputOTP maxLength={maxLength} value={value} onChange={(newValue) => handleChange({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>)}>
                <InputOTPGroup>
                    {Array.from({ length: maxLength }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                    ))}
                </InputOTPGroup>
            </InputOTP>
            <div className="text-center text-sm">
                {value === '' ? (
                    <>Enter the amount.</>
                ) : (
                    <>You entered: {formattedValue}</>
                )}
            </div>
        </div>
    );
}
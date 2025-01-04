'use client';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { useServiceDetails } from '@/utils/store';
import { useEffect, useState } from 'react';

export default function ServicePrice() {
    const [price, setPrice] = useState<number>();
    const maxLength = 4;

    useEffect(() => {
        useServiceDetails.setState({ price: price || undefined });
    }, [price]);

    return (
        <div className="space-y-2">
            <InputOTP
                maxLength={maxLength}
                onChange={(newValue: string) => setPrice(Number(newValue))}
            >
                <InputOTPGroup>
                    {Array.from({ length: maxLength }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                    ))}
                </InputOTPGroup>
            </InputOTP>
        </div>
    );
}

'use client';

import React from 'react';
import ValidationFormInput from '../form/ValidationFormInput';

interface SettingAccountHolderWrapperProps {
    profile: { firstName: string; lastName: string };
    holder: string;
}

export default function SettingAccountHolderWrapper({
    profile,
    holder,
}: SettingAccountHolderWrapperProps) {
    const isHolderMatching =
        holder === `${profile.lastName}${profile.firstName}`;

    return (
        <>
            <ValidationFormInput
                name="bankAccountHolder"
                label="예금주(계좌 확인 API의 잦은 오류로 임의로 입력 허용)"
                value={holder}
                readOnly={isHolderMatching}
                placeholder={`예금주는 본인명의인 ${profile.lastName}${profile.firstName}님과 일치해야 합니다`}
                isValid={isHolderMatching}
            />
        </>
    );
}

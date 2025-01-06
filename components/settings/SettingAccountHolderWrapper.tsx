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
                value={holder}
                readOnly={isHolderMatching}
                placeholder={`예금주는 본인명의인 ${profile.lastName}${profile.firstName}님과 일치해야 합니다`}
                isValid={isHolderMatching}
            />
        </>
    );
}

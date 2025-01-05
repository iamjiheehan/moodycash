import React, { useState } from 'react';
import { SettingBank } from './SettingBank';
import { Label } from '../ui/label';

export default function SettingBankWrapper() {
    const name = 'bankCode';

    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor={name} className="capitalize">
                {name}
            </Label>
            <SettingBank />
        </div>
    );
}

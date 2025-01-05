import React from 'react';
import { SettingBank } from './SettingBank';
import { Label } from '../ui/label';

export default function SettingBankWrapper() {
    const name = 'bankName';

    
    return (
        <div className="mb-2">
            <Label htmlFor={name} className="capitalize">
                {name}
            </Label>
            <SettingBank />
        </div>
    );
}

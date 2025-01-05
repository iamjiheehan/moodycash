'use client';
import { SubmitButton } from '@/components/form/Buttons';
import FormInput from '@/components/form/FormInput';
import SettingBankWrapper from '@/components/settings/SettingBankWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect } from 'react';

async function fetchToken() {
    const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data.response.access_token;
    } else {
        console.error('Error fetching token:', response.statusText);
        return null;
    }
}

async function verification(
    accessToken: string,
    bankCode: string,
    bankNum: string
) {
    const response = await fetch('/api/verification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accessToken,
            bankCode: bankCode,
            bankNum: bankNum,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data.response.bank_holder);
        return data.response.bank_holder;
    } else {
        console.error('Error fetching bank holder:', response.statusText);
    }
}

export default function CreatePage() {
    const [holder, setHolder] = React.useState('');
    const getTokenAndVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const bankAccountNumber = formData.get('bankAccountNumber') as string;
        const bankCode = formData.get('bankCode') as string;

        const token = await fetchToken();
        if (token) {
            const holder = await verification(
                token,
                bankCode,
                bankAccountNumber
            );
            setHolder(holder);
        }
    };
    return (
        <section className="container">
            <h1 className="text-2xl font-semibold mb-8 capitalize">
                계좌 추가하기
            </h1>
            <div className="border p-8 rounded-md">
                <form onSubmit={getTokenAndVerify}>
                    <section className="flex flex-row items-end gap-4">
                        <div className="flex-grow-[1]">
                            <SettingBankWrapper />
                        </div>
                        <div className="flex-grow-[2]">
                            <FormInput
                                type="text"
                                name="bankAccountNumber"
                                label="Bank Account"
                            />
                        </div>
                        <SubmitButton text="계좌좌 확인" />
                    </section>
                    <section className="flex flex-row items-end gap-4">
                        <div className="flex-grow-[1]">
                            <Label htmlFor="accountHolder">예금주</Label>
                            <Input type="text" value={holder} readOnly />
                        </div>
                        <div className="flex-grow-[2]">
                            <Label htmlFor="accountHolder">예금주</Label>
                            <Input type="text" value={holder} readOnly />
                        </div>
                    </section>
                </form>
                {/* <input type="text" value={holder} /> */}
            </div>
        </section>
    );
}

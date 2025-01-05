'use client';

import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import SettingBankWrapper from '@/components/settings/SettingBankWrapper';
import { createBankingAction } from '@/utils/actions';
import React, { useEffect, useState } from 'react';

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

async function verification(accessToken: string) {
    const response = await fetch('/api/verification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accessToken,
            bankCode: '003',
            bankNum: '01086088219',
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        console.error('Error fetching bank holder:', response.statusText);
    }
}

export default function CreatePage() {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const getTokenAndVerify = async () => {
            const token = await fetchToken();
            if (token) {
                setAccessToken(token);
                await verification(token);
            }
        };

        getTokenAndVerify();
    }, []);

    return (
        <section className="container">
            <h1 className="text-2xl font-semibold mb-8 capitalize">
                Setting banking schema
            </h1>
            <div className="border p-8 rounded-md">
                <FormContainer action={createBankingAction}>
                    <div className="grid gap-4 md:grid-cols-2 mt-4 ">
                        <SettingBankWrapper />
                        <FormInput
                            type="text"
                            name="bankAccountNumber"
                            label="Bank Account"
                        />
                        <FormInput
                            type="text"
                            name="bankAccountHolder"
                            label="Account Holder"
                        />
                        <FormInput type="text" name="mood" label="Mood" />
                    </div>
                    <SubmitButton
                        text="Create Mood & Banking"
                        className="mt-8"
                    />
                </FormContainer>
            </div>
        </section>
    );
}

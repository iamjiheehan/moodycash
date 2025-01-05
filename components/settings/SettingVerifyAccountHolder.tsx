'use client';
import { SubmitButton } from '@/components/form/Buttons';
import FormInput from '@/components/form/FormInput';
import React, { useState, useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';
import { createBankingAction, fetchProfile } from '@/utils/actions';
import AlertForm from '../form/AlertForm';
import FormContainer from '../form/FormContainer';
import { SettingBank } from './SettingBank';
import { redirect } from 'next/dist/server/api-utils';
import { revalidatePath } from 'next/cache';

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
    }
    throw new Error('Error fetching bank holder');
}

export default function SettingVerifyAccountHolder() {
    const [bankCodeData, setBankCodeData] = useState('');
    const [bankAccountNumberData, setBankAccountNumberData] = useState('');
    const [holder, setHolder] = useState('한지희');
    const [profile, setProfile] = useState({ firstName: '', lastName: '' });
    const { toast } = useToast();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profileData = await fetchProfile();
                setProfile(profileData);
                console.log(profileData.firstName, profileData.lastName);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfileData();
    }, []);

    const getTokenAndVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        const bankAccountNumber = bankAccountNumberData;
        const bankCode = bankCodeData;

        const token = await fetchToken();
        if (token) {
            try {
                const holder = await verification(
                    token,
                    bankCode,
                    bankAccountNumber
                );
                setHolder(holder);
            } catch (error) {
                toast({ description: '존재하는 계좌가 없습니다' });
                console.error('Error:', error);
            }
        }
    };

    const isHolderMatching =
        holder === `${profile.lastName}${profile.firstName}`;

    return (
        <section>
            <div className="flex flex-col gap-2">
                <FormContainer action={createBankingAction}>
                    <div className="flex flex-col gap-8">
                        <section className="flex flex-row items-end gap-4">
                            <div className="flex-grow-[1]">
                                <div className="flex flex-col gap-1">
                                    <Label
                                        htmlFor="bankName"
                                        className="capitalize"
                                    >
                                        bankName
                                    </Label>
                                    <SettingBank
                                        value={bankCodeData}
                                        onChange={setBankCodeData}
                                    />
                                </div>
                            </div>
                            <div className="flex-grow-[2]">
                                <FormInput
                                    type="text"
                                    name="bankAccountNumber"
                                    label="Bank Account"
                                    value={bankAccountNumberData}
                                    onChange={(e) =>
                                        setBankAccountNumberData(e.target.value)
                                    }
                                />
                            </div>
                            <button onClick={getTokenAndVerify} type="button">
                                계좌 확인
                            </button>
                        </section>
                        <section>
                            <Label htmlFor="accountHolder">예금주</Label>
                            <Input
                                name="bankAccountHolder"
                                type="text"
                                value={holder}
                                readOnly
                                placeholder={`예금주는 본인명의인 ${profile.lastName}${profile.firstName}님과 일치해야 합니다`}
                                className={
                                    isHolderMatching ? 'border-green-500' : ''
                                }
                            />
                        </section>
                        <div>
                            <Label htmlFor="mood">
                                어떤 기분을 담아 이 계좌에 돈을 넣으실 건가요?
                            </Label>
                            <Input
                                name="mood"
                                type="text"
                                placeholder="예시 : 기쁜 날, 슬픈 날"
                            />
                        </div>
                    </div>
                    <AlertForm
                        title="계좌 등록"
                        actionType="submit"
                        callback={() => {
                            revalidatePath('/settings');
                        }}
                    />
                </FormContainer>
            </div>
        </section>
    );
}

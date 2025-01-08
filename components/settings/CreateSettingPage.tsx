'use client';
import { useState, useEffect } from 'react';
import FormInput from '@/components/form/FormInput';
import { Label } from '../ui/label';
import { createBankingAction, fetchProfile } from '@/utils/actions';
import FormContainer from '../form/FormContainer';
import { SettingBank } from './SettingBank';
import { CallbackButton, SubmitButton } from '../form/Buttons';
import { ErrorAlertForm } from '../form/AlertForm';
import getTokenAndVerify from '@/utils/getTokenAndVerify';
import { Skeleton } from '../ui/skeleton';
import dynamic from 'next/dynamic';

const SettingAccountHolderWrapper = dynamic(
    () => import('@/components/settings/SettingAccountHolderWrapper'),
    {
        ssr: false,
        loading: () => <Skeleton className="w-full rounded-md" />,
    }
);

export default function CreateSettingPage() {
    const [bankCodeData, setBankCodeData] = useState('');
    const [bankLabelData, setBankLabelData] = useState('');
    const [bankAccountNumberData, setBankAccountNumberData] = useState('');
    const [holder, setHolder] = useState('');
    const [profile, setProfile] = useState({ firstName: '', lastName: '' });
    const [pending, setPending] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profileData = await fetchProfile();

                if (!profileData) {
                    return (
                        <ErrorAlertForm
                            title="에러 발생"
                            description="프로필 정보를 찾을 수 없습니다. 프로필을 생성해주세요"
                        />
                    );
                }
                setProfile(profileData);
            } catch (error) {
                console.error('Error fetching profile:', error);
                <ErrorAlertForm
                    title="에러 발생"
                    description="프로필 정보를 찾을 수 없습니다. 다시 로그인해주세요"
                />;
            }
        };

        fetchProfileData();
    }, []);

    return (
        <section>
            <FormContainer action={createBankingAction}>
                <section className="flex flex-col gap-10">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="bankName" className="capitalize">
                            은행이름
                        </Label>
                        <SettingBank
                            value={bankCodeData}
                            label={bankLabelData}
                            onChange={(value: string, label: string) => {
                                setBankCodeData(value);
                                setBankLabelData(label);
                            }}
                        />
                    </div>
                    <FormInput
                        type="text"
                        name="bankAccountNumber"
                        label="계좌번호"
                        value={bankAccountNumberData}
                        placeholder='"-"를 제외한 숫자만 입력해주세요. '
                        onChange={(e) =>
                            setBankAccountNumberData(e.target.value)
                        }
                        onInput={(e) => {
                            const inputEvent =
                                e as React.FormEvent<HTMLInputElement>;
                            const target =
                                inputEvent.target as HTMLInputElement;
                            target.value = target.value.replace(/[^0-9]/g, '');
                        }}
                    />
                    <CallbackButton
                        callback={(e) =>
                            getTokenAndVerify(
                                e,
                                bankAccountNumberData,
                                bankCodeData,
                                setPending,
                                setHolder
                            )
                        }
                        isPending={pending}
                        text="계좌 확인"
                    />
                    <SettingAccountHolderWrapper
                        profile={profile}
                        holder={holder}
                        setHolder={setHolder}
                    />
                    <FormInput
                        name="mood"
                        type="text"
                        placeholder="예시 : 행복, 슬픔"
                        label="어떤 기분을 담아 이 계좌에 돈을 넣으실 건가요?"
                    />
                    <SubmitButton text="등록하기" />
                </section>
            </FormContainer>
        </section>
    );
}

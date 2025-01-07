'use client';
import { useState, useEffect } from 'react';
import FormInput from '@/components/form/FormInput';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { createBankingAction, fetchProfile } from '@/utils/actions';
import FormContainer from '../form/FormContainer';
import { SettingBank } from './SettingBank';
import { CallbackButton, SubmitButton } from '../form/Buttons';
import { FaCheck } from 'react-icons/fa';
import { ErrorAlertForm } from '../form/AlertForm';
import getTokenAndVerify from '@/utils/getTokenAndVerify';

export default function SettingVerifyAccountHolder() {
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
                        onChange={(e) =>
                            setBankAccountNumberData(e.target.value)
                        }
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
                    <div>
                        <Label htmlFor="accountHolder">
                            예금주(계좌 확인 API의 잦은 오류로 임의로 입력 허용)
                        </Label>
                        <div className="relative">
                            <Input
                                name="bankAccountHolder"
                                type="text"
                                value={holder}
                                // readOnly={
                                //     holder ===
                                //     `${profile.lastName}${profile.firstName}`
                                // }
                                placeholder={`예금주는 본인명의인 ${profile.lastName}${profile.firstName}님과 일치해야 합니다`}
                                className={`${
                                    holder ===
                                    `${profile.lastName}${profile.firstName}`
                                        ? 'border-[hsl(var(--primary))] text-[hsl(var(--primary))]'
                                        : ''
                                }`}
                            />
                            {holder ===
                                `${profile.lastName}${profile.firstName}` && (
                                <span className="absolute top-1/2 transform -translate-y-1/2 right-4">
                                    <FaCheck className="text-[hsl(var(--primary))]" />
                                </span>
                            )}
                        </div>
                    </div>
                    <FormInput
                        name="mood"
                        type="text"
                        placeholder="예시 :  기쁜 날, 슬픈 날"
                        label="어떤 기분을 담아 이 계좌에 돈을 넣으실 건가요?"
                    />
                    <SubmitButton text="등록하기" />
                </section>
            </FormContainer>
        </section>
    );
}

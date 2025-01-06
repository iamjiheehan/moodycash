'use client';
import FormInput from '@/components/form/FormInput';
import { useState, useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';
import { createBankingAction, fetchProfile } from '@/utils/actions';
import FormContainer from '../form/FormContainer';
import { SettingBank } from './SettingBank';
import { SubmitButton } from '../form/Buttons';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { FaCheck } from 'react-icons/fa';
import { ErrorAlertForm } from '../form/AlertForm';

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
        return data.response.bank_holder;
    }
    throw new Error('Error fetching bank holder');
}

export default function SettingVerifyAccountHolder() {
    const [bankCodeData, setBankCodeData] = useState('');
    const [bankLabelData, setBankLabelData] = useState('');
    const [bankAccountNumberData, setBankAccountNumberData] = useState('');
    const [holder, setHolder] = useState('');
    const [profile, setProfile] = useState({ firstName: '', lastName: '' });
    const [pending, setPending] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profileData = await fetchProfile();
                setProfile(profileData);
            } catch (error) {
                console.error('Error fetching profile:', error);
                <ErrorAlertForm title="에러 발생" description="프로필 정보를 찾을 수 없습니다. 다시 로그인해주세요"/>
            }
        };

        fetchProfileData();
    }, []);

    const getTokenAndVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

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
        setPending(false);
    };

    const isHolderMatching =
        holder === `${profile.lastName}${profile.firstName}`;

    return (
        <section>
            <FormContainer action={createBankingAction}>
                <section className="flex flex-col gap-10">
                    <div className="flex-grow-[1]">
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
                    </div>
                    <div className="flex-grow-[2]">
                        <FormInput
                            type="text"
                            name="bankAccountNumber"
                            label="계좌번호"
                            value={bankAccountNumberData}
                            onChange={(e) =>
                                setBankAccountNumberData(e.target.value)
                            }
                        />
                    </div>
                    <Button
                        type="button"
                        onClick={getTokenAndVerify}
                        disabled={pending}
                        className="capitalize"
                    >
                        {pending ? (
                            <>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </>
                        ) : (
                            '계좌 확인'
                        )}
                    </Button>
                    <div>
                        <Label htmlFor="accountHolder">예금주</Label>
                        <div className="relative">
                            <Input
                                name="bankAccountHolder"
                                type="text"
                                value={holder}
                                readOnly={isHolderMatching}
                                placeholder={`예금주는 본인명의인 ${profile.lastName}${profile.firstName}님과 일치해야 합니다`}
                                className={`${
                                    isHolderMatching
                                        ? 'border-[hsl(var(--primary))] text-[hsl(var(--primary))]'
                                        : ''
                                }`}
                            />
                            {isHolderMatching && (
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

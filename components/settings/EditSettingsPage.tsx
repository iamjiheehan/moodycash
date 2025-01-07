'use client';
import { useState } from 'react';
import {
    BackButton,
    CallbackButton,
    SubmitButton,
} from '@/components/form/Buttons';
import FormInput from '@/components/form/FormInput';
import { SettingBank } from '@/components/settings/SettingBank';
import { Label } from '@/components/ui/label';
import dynamic from 'next/dynamic';
import getTokenAndVerify from '@/utils/getTokenAndVerify';
import { Skeleton } from '../ui/skeleton';
import FormContainer from '../form/FormContainer';
import { updateBankingAction } from '@/utils/actions';
import { routeModule } from 'next/dist/build/templates/app-page';
import { Router } from 'next/router';
import Link from 'next/link';

const SettingAccountHolderWrapper = dynamic(
    () => import('@/components/settings/SettingAccountHolderWrapper'),
    {
        ssr: false,
        loading: () => <Skeleton className="w-full rounded-md" />,
    }
);

interface EditSettingsPageProps {
    fetchedDetails: any;
    profile: any;
}

const EditSettingsPage: React.FC<EditSettingsPageProps> = ({
    fetchedDetails,
    profile,
}) => {
    const [bankCodeData, setBankCodeData] = useState(fetchedDetails.bankCode);
    const [bankLabelData, setBankLabelData] = useState('');
    const [bankAccountNumberData, setBankAccountNumberData] = useState(
        fetchedDetails.bankAccountNumber
    );
    const [holder, setHolder] = useState(fetchedDetails.bankAccountHolder);
    const [pending, setPending] = useState(false);

    return (
        <section>
            <FormContainer action={updateBankingAction}>
                <input type="hidden" name="id" value={fetchedDetails.id} />
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 border p-8 rounded-md shadow-2xl sm:w-[50%] md:w-[40%] lg:w-[30%]">
                    <section className="flex flex-row gap-2 mt-6 mb-6">
                        <h1 className="text-2xl font-semibold capitalize">
                            계좌 수정
                        </h1>
                    </section>
                    <section className="flex flex-col gap-10">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="bankName" className="capitalize">
                                은행이름{fetchedDetails.bankCode}
                            </Label>
                            <SettingBank
                                defaultValue={fetchedDetails.bankName}
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
                        <SettingAccountHolderWrapper
                            profile={profile}
                            holder={holder}
                        />
                        <FormInput
                            name="mood"
                            type="text"
                            placeholder="예시 :  기쁜 날, 슬픈 날"
                            label="어떤 기분을 담아 이 계좌에 돈을 넣으실 건가요?"
                            defaultValue={fetchedDetails.mood}
                        />
                        <section className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
                            <Link href="/settings" className="block w-full">
                                <BackButton />
                            </Link>
                            <SubmitButton text="변경하기" />
                        </section>
                    </section>
                </section>
            </FormContainer>
        </section>
    );
};

export default EditSettingsPage;

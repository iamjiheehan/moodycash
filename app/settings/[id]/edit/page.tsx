import { FallbackButton } from '@/components/form/Buttons';
import FormInput from '@/components/form/FormInput';
import { SettingBank } from '@/components/settings/SettingBank';
import { MoodSettingCard } from '@/components/settings/SettingCard';
import { Label } from '@/components/ui/label';
import { fetchBankingDetails, fetchProfile } from '@/utils/actions';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const SettingAccountHolderWrapper = dynamic(
    () => import('@/components/settings/SettingAccountHolderWrapper')
);

async function EditSettingsPage({ params }: { params: { id: string } }) {
    const fetchedDetails = await fetchBankingDetails(params.id);
    const profile = await fetchProfile();

    if (!fetchedDetails) redirect('/settings');

    return (
        <section className="container border p-8 rounded-md shadow-2xl w-[30%]">
            <section className="flex flex-row gap-2 mt-6 mb-6">
                <h1 className="text-2xl font-semibold capitalize">계좌 수정</h1>
            </section>
            <section className="flex flex-col gap-10">
                <div className="flex-grow-[1]">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="bankName" className="capitalize">
                            은행이름
                        </Label>
                        <SettingBank
                            defaultValue={fetchedDetails.bankName}
                            label={fetchedDetails.bankName}
                        />
                    </div>
                </div>
                <div className="flex-grow-[2]">
                    <FormInput
                        type="text"
                        name="bankAccountNumber"
                        label="계좌번호"
                        defaultValue={fetchedDetails.bankAccountNumber}
                    />
                </div>
                <FallbackButton
                    fallback={getTokenAndVerify}
                    isPending={pending}
                    text="계좌 확인"
                />
                <SettingAccountHolderWrapper
                    profile={profile}
                    holder={fetchedDetails.bankAccountHolder}
                />
                <FormInput
                    name="mood"
                    type="text"
                    placeholder="예시 :  기쁜 날, 슬픈 날"
                    label="어떤 기분을 담아 이 계좌에 돈을 넣으실 건가요?"
                    defaultValue={fetchedDetails.mood}
                />
            </section>
        </section>
    );
}

export default EditSettingsPage;

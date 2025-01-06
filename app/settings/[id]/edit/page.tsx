import FormInput from '@/components/form/FormInput';
import SettingAccountHolderWrapper from '@/components/settings/SettingAccountHolderWrapper';
import { SettingBank } from '@/components/settings/SettingBank';
import { MoodSettingCard } from '@/components/settings/SettingCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fetchBankingDetails, fetchProfile } from '@/utils/actions';
import { redirect } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';

async function EditSettingsPage({ params }: { params: { id: string } }) {
    const fetchedDetails = await fetchBankingDetails(params.id);
    const profile = await fetchProfile();

    if (!fetchedDetails) redirect('/settings');

    return (
        <div className="container grid md:grid-cols-2 gap-8 mt-4">
            <MoodSettingCard
                mood={fetchedDetails.mood}
                bankName={fetchedDetails.bankName}
                bankAccountNumber={fetchedDetails.bankAccountNumber}
                bankingId={fetchedDetails.id}
            />
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
            {/* <div>
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
            </div> */}
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
        </div>
    );
}

export default EditSettingsPage;

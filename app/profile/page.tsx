import FormContainer from '@/components/form/FormContainer';
import { updateProfileAction, fetchProfile } from '@/utils/actions';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';

async function ProfilePage() {
    const profile = await fetchProfile();

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 border p-8 rounded-md shadow-2xl sm:w-[50%] md:w-[40%] lg:w-[35%]">
            <section className="flex flex-row gap-2 mt-6 mb-6">
                <h1 className="text-2xl font-semibold capitalize">
                    나의 프로필
                </h1>
            </section>
            {/* image input container */}
            <FormContainer action={updateProfileAction}>
                <div className="flex flex-col gap-10">
                    <FormInput
                        type="text"
                        name="lastName"
                        label="성"
                        defaultValue={profile.lastName}
                    />
                    <FormInput
                        type="text"
                        name="firstName"
                        label="이름"
                        defaultValue={profile.firstName}
                    />
                    <FormInput
                        type="text"
                        name="username"
                        label="닉네임"
                        defaultValue={profile.username}
                    />
                </div>
                <SubmitButton text="프로필 업데이트" className="mt-16 w-full" />
            </FormContainer>
        </section>
    );
}
export default ProfilePage;

import FormContainer from '@/components/form/FormContainer';
import { updateProfileAction, fetchProfile } from '@/utils/actions';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';
import { currentUser } from '@clerk/nextjs/server';

async function ProfilePage() {
    const profile = await fetchProfile();

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold mb-8 capitalize">프로필</h1>
            <div className="border p-8 rounded-md">
                {/* image input container */}
                <FormContainer action={updateProfileAction}>
                    <div className="grid gap-4 md:grid-cols-2 mt-4 ">
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
                    <SubmitButton text="프로필 변경" className="mt-8" />
                </FormContainer>
            </div>
        </section>
    );
}
export default ProfilePage;

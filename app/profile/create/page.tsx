import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { SubmitButton } from '@/components/form/Buttons';
import { createProfileAction } from '@/utils/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function CreateProfile() {
    const user = await currentUser();
    if (user?.privateMetadata?.hasProfile) {
        // redirect('/');
        console.log('유저 정보가 없습니다 뭐야 이게', user);
    }

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 border p-8 rounded-md shadow-2xl sm:w-[50%] md:w-[40%] lg:w-[30%]">
            <section className="flex flex-row gap-2 mt-6 mb-6">
                <h1 className="text-2xl font-semibold mb-8 capitalize">
                    프로필 생성
                </h1>
            </section>
            <FormContainer action={createProfileAction}>
                <div className="flex flex-col gap-10">
                    <FormInput type="text" name="lastName" label="성" />
                    <FormInput type="text" name="firstName" label="이름" />
                    <FormInput type="text" name="username" label="닉네임" />
                </div>
                <SubmitButton text="프로필 생성" className="mt-16 w-full" />
            </FormContainer>
        </section>
    );
}
export default CreateProfile;

'use client';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useServiceDetails } from '@/utils/store';
import FormContainer from '@/components/form/FormContainer';
import { SubmitButton } from '@/components/form/Buttons';
import { createServiceAction } from '@/utils/actions';

function ConfirmService() {
    const { userId } = useAuth();
    const { date, mood, price, description } = useServiceDetails(
        (state) => state
    );
    if (!userId)
        return (
            <SignInButton mode="modal">
                <Button type="button" className="w-full">
                    Sign In to Complete Booking
                </Button>
            </SignInButton>
        );

    const createService = async (
        formData: Record<string, any>
    ): Promise<{ message: string }> => {
        const data = new FormData();
        if (date) {
            data.append('date', date.toISOString());
        }
        if (mood) {
            data.append('mood', mood);
        }
        if (price) {
            data.append('price', price.toString());
        }
        if (description) {
            data.append('description', description);
        }

        if (!date || !mood || !price || !description) {
            return { message: '모든 빈 칸을 입력해주세요' };
        }

        return await createServiceAction(null, data);
    };

    return (
        <section>
            <FormContainer action={createService}>
                <SubmitButton text="등록하기" className="w-full" />
            </FormContainer>
        </section>
    );
}
export default ConfirmService;

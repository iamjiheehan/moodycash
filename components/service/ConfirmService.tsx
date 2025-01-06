'use client';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useServiceDetails } from '@/utils/store';
import FormContainer from '@/components/form/FormContainer';
import { SubmitButton } from '@/components/form/Buttons';
import { createServiceAction } from '@/utils/actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function ConfirmService() {
    const { userId } = useAuth();
    const { date, mood, price, description, resetServiceDetails } =
        useServiceDetails((state) => ({
            date: state.date,
            mood: state.mood,
            price: state.price,
            description: state.description,
            resetServiceDetails: state.resetServiceDetails,
        }));

    if (!userId)
        return (
            <SignInButton mode="modal">
                <Button type="button" className="w-full">
                    로그인이 필요합니다
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
        data.append('mood', mood);
        data.append('price', price.toString());
        data.append('description', description);
        const result = await createServiceAction(null, data);

        return result;
    };

    return (
        <section>
            <FormContainer action={createService}>
                <SubmitButton text="Confirm" className="w-full" />
            </FormContainer>
        </section>
    );
}
export default ConfirmService;

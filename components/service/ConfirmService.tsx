'use client';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useServiceDetails } from '@/utils/store';
import FormContainer from '@/components/form/FormContainer';
import { SubmitButton } from '@/components/form/Buttons';
import { createServiceAction } from '@/utils/actions';

function ConfirmService() {
    const { userId } = useAuth();
    const { date, mood, price } = useServiceDetails((state) => state);
    if (!userId)
        return (
            <SignInButton mode="modal">
                <Button type="button" className="w-full">
                    Sign In to Complete Booking
                </Button>
            </SignInButton>
        );

    const createService = createServiceAction.bind(null, {
        date,
        mood,
        price,
    });
    return (
        <section>
            <FormContainer action={createService}>
                <SubmitButton text="Confirm" className="w-full" />
            </FormContainer>
        </section>
    );
}
export default ConfirmService;

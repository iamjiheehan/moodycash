'use client';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useServiceDetails } from '@/utils/store';
import FormContainer from '@/components/form/FormContainer';
import { SubmitButton } from '@/components/form/Buttons';
import { createServiceAction, updateServiceAction } from '@/utils/actions';
import { formatDateToDateTime } from '@/utils/format';

interface ConfirmServiceProps {
    actionType: 'create' | 'update';
    serviceId?: string; 
}

function ConfirmService({ actionType, serviceId }: ConfirmServiceProps) {
    const { userId } = useAuth();
    const { date, mood, price, description, bankingId } = useServiceDetails(
        (state) => state
    );
    if (!userId)
        return (
            <SignInButton mode="modal">
                <Button type="button" className="w-full">
                    로그인이 필요한 서비스입니다
                </Button>
            </SignInButton>
        );

    const handleSubmit = async (
        formData: Record<string, any>
    ): Promise<{ message: string }> => {
        const data = new FormData();
        if (date) {
            const formattedDate = formatDateToDateTime(new Date(date));
            data.append('date', formattedDate);
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
        if (bankingId) {
            data.append('bankingId', bankingId);
        }

        if (!date || !mood || !price || !description || !bankingId) {
            return { message: '모든 빈 칸을 올바르게 입력해주세요' };
        }

        if (actionType === 'create') {
            return await createServiceAction(null, data);
        } else if (actionType === 'update') {
            if (serviceId) {
                data.append('id', serviceId);
            }
            return await updateServiceAction(null, data);
        } else {
            return { message: '알 수 없는 작업 유형입니다' };
        }
    };

    return (
        <section>
            <FormContainer action={handleSubmit}>
                {actionType === 'update' && serviceId && (
                    <input type="hidden" name="id" value={serviceId} />
                )}
                <SubmitButton
                    text={actionType === 'create' ? '등록하기' : '업데이트하기'}
                    className="w-full"
                />
            </FormContainer>
        </section>
    );
}

export default ConfirmService;
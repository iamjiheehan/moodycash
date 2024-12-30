import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import { createBankingAction } from '@/utils/actions';
import React from 'react';

export default async function CreatePage() {
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">
                Setting banking schema
            </h1>
            <div className="border p-8 rounded-md">
                <FormContainer action={createBankingAction}>
                    <div className="grid gap-4 md:grid-cols-2 mt-4 ">
                        <FormInput
                            type="text"
                            name="bankName"
                            label="Bank Name"
                        />
                        <FormInput
                            type="text"
                            name="bankAccountNumber"
                            label="Bank Account"
                        />
                        <FormInput
                            type="text"
                            name="bankAccountHolder"
                            label="Account Holder"
                        />
                        <FormInput type="text" name="mood" label="Mood" />
                        <FormInput
                            type="text"
                            name="description"
                            label="Description"
                        />
                    </div>
                    <SubmitButton
                        text="Create Mood & Banking"
                        className="mt-8"
                    />
                </FormContainer>
            </div>
        </section>
    );
}

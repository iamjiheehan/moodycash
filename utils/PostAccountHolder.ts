'use client';

export async function PostAccountHolder({
    accessToken,
    bankCode,
    bankAccountNumber,
}: {
    accessToken: string;
    bankCode: string;
    bankAccountNumber: string;
}) {
    try {
        const response = await fetch('/api/verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accessToken,
                bankCode,
                bankNum: bankAccountNumber,
            }),
        });

        if (!response.ok) {
            throw new Error('Bank account verification failed');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error in VerifyAccountHolder:', error);
        throw error;
    }
}

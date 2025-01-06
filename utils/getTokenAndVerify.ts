import { toast } from '@/hooks/use-toast';

async function fetchToken() {
    const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data.response.access_token;
    } else {
        console.error('Error fetching token:', response.statusText);
        return null;
    }
}

async function verification(
    accessToken: string,
    bankCode: string,
    bankNum: string
) {
    const response = await fetch('/api/verification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accessToken,
            bankCode: bankCode,
            bankNum: bankNum,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        return data.response.bank_holder;
    }
    throw new Error('Error fetching bank holder');
}

const getTokenAndVerify = async (
    e: React.FormEvent,
    bankAccountNumberData: string,
    bankCodeData: string,
    setPending: (pending: boolean) => void,
    setHolder: (holder: string) => void
) => {
    e.preventDefault();
    setPending(true);

    const bankAccountNumber = bankAccountNumberData;
    const bankCode = bankCodeData;

    const token = await fetchToken();
    if (token) {
        try {
            const holder = await verification(
                token,
                bankCode,
                bankAccountNumber
            );
            setHolder(holder);
        } catch (error) {
            toast({ description: '존재하는 계좌가 없습니다' });
            console.error('Error:', error);
        }
    }
    setPending(false);
};

export default getTokenAndVerify;

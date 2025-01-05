import type { NextApiRequest, NextApiResponse } from 'next';

type TokenResponse = {
    code: number;
    message: string;
    response?: {
        access_token: string;
        now: number;
        expired_at: number;
    };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<TokenResponse>) {
    const { NEXT_PUBLIC_REST_API_KEY, NEXT_PUBLIC_REST_API_SECRET } = process.env;

    if (!NEXT_PUBLIC_REST_API_KEY || !NEXT_PUBLIC_REST_API_SECRET) {
        return res.status(500).json({ code: 500, message: 'API key or secret is missing' });
    }

    const response = await fetch('https://api.iamport.kr/users/getToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imp_key: NEXT_PUBLIC_REST_API_KEY,
            imp_secret: NEXT_PUBLIC_REST_API_SECRET,
        }),
    });

    const data: TokenResponse = await response.json();
    res.status(response.status).json(data);
}
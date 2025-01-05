import type { NextApiRequest, NextApiResponse } from 'next';

type VerifyBankResponse = {
    code: number;
    message: string;
    response?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<VerifyBankResponse>) {
    const { accessToken, bankCode, bankNum } = req.body;

    if (!accessToken || !bankCode || !bankNum) {
        return res.status(400).json({ code: 400, message: 'Missing required parameters' });
    }

    const url = `https://api.iamport.kr/vbanks/holder?bank_code=${bankCode}&bank_num=${bankNum}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    res.status(response.status).json(data);
}
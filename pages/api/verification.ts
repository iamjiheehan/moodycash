// pages/api/verification.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { accessToken, bankCode, bankNum } = req.body;

    if (!accessToken || !bankCode || !bankNum) {
        return res
            .status(400)
            .json({ code: 400, message: 'Missing required parameters' });
    }

    try {
        const externalResponse = await fetch(
            `https://api.iamport.kr/vbanks/holder?bank_code=${bankCode}&bank_num=${bankNum}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!externalResponse.ok) {
            return res.status(externalResponse.status).json({
                code: externalResponse.status,
                message: 'Failed to fetch bank holder data',
            });
        }

        const data = await externalResponse.json();
        return res.status(200).json(data); 
    } catch (error) {
        console.error('Error fetching bank holder:', error);
        return res
            .status(500)
            .json({ code: 500, message: 'Internal Server Error' });
    }
}

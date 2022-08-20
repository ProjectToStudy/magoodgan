import { NextApiRequest, NextApiResponse } from 'next';
import { JoinDuplicatedBody } from '../../types/join';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { body }: {
          body: JoinDuplicatedBody;
        } = req;
        const { userId, email } = body;
        if (userId) {
            res.statusCode = 200;
            return res.send(body);
        }
        if (email) {
            res.statusCode = 409;
            return res.send('이미 가입한 이메일입니다.');
        }
    }
    return res.end();
};

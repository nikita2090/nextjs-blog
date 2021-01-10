import { NextApiRequest, NextApiResponse } from 'next';
import { USERS } from './users';

export default (req: NextApiRequest, res: NextApiResponse): void => {
    const { method } = req;

    switch (method) {
        case 'GET':
            res.status(200).json({ users: USERS });
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method Not Allowed`);
    }
};

import { NextApiRequest, NextApiResponse } from 'next';
import { USERS } from './users';

export default (req: NextApiRequest, res: NextApiResponse): void => {
    const {
        query: { userId },
        method,
    } = req;

    const user = USERS.find((user) => user.id === Number(userId));
    switch (method) {
        case 'GET':
            if (user) {
                res.status(200).json({ user });
            } else {
                res.status(404).json({ user: `Not found` });
            }
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method Not Allowed`);
    }
};

import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
    const { method } = req;

    switch (method) {
        case 'GET':
            res.status(200).json({ text: 'Hello' });
            break;
        case 'POST':
            console.log(req.body);
            res.status(200).json({ text: 'OK' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method Not Allowed`);
    }
};

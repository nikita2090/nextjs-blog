import Head from 'next/head';

import Layout from '../../components/layout';
import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export interface IUser {
    name: string;
    id: number;
}

interface IResponce {
    users: IUser[];
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<IUser[] | []>([]);

    const handleGetBtnClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        try {
            const res: AxiosResponse = await axios('/api/users');
            const data = res.data as IResponce;
            setUsers(data.users);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <Layout>
            <Head>
                <title>Serverless Functions</title>
            </Head>
            <h1>Serverless Functions (Dynamic)</h1>
            <div>
                <button onClick={handleGetBtnClick}>Get all users</button>
                <div>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    {users.map(({ name, id }: IUser) => (
                        <p key={id}>{name}</p>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Users;

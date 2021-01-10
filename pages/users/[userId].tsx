import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import Layout from '../../components/layout';
import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IUser } from './index';

interface IResponce {
    user: IUser;
}

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: [
        {
            params: {
                userId: '1',
            },
        },
        {
            params: {
                userId: '2',
            },
        },
    ],
    fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const name = params?.userId;
    //const name = false;

    if (!name) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            name,
        },
        revalidate: 1,
    };
};

interface Props {
    name: string;
}

const User: React.FC<Props> = ({ name }) => {
    const [user, setUser] = useState<IUser | null>(null);

    const handleGetBtnClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        try {
            const res: AxiosResponse = await axios(`/api/users/${name}`);
            const data = res.data as IResponce;
            setUser(data.user);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <Layout>
            <Head>
                <title>Serverless Functions</title>
            </Head>
            <h1>Serverless Functions (Static)</h1>
            {user ? (
                <div>
                    <div>Name:{user.name}</div>
                    <div>Id: {user.id}</div>
                </div>
            ) : null}
            <button onClick={handleGetBtnClick}>Get current user</button>
        </Layout>
    );
};

export default User;

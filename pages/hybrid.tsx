import Head from 'next/head';
import Layout from '../components/layout';
import { useState } from 'react';

// Hybrid (static page with fetching data and client-side rendering)

export interface IRes {
    name: {
        first: string;
        last: string;
        title: string;
    };
}

export interface IResponce {
    info?: {
        seed: string;
        results: number;
        page: number;
        version: string;
    };
    results: IRes[];
}

interface Props {
    globalState: string;
    handleGlobalState: (str: string) => void;
}

const Hybrid: React.FC<Props> = ({ globalState, handleGlobalState }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBtnClick = async () => {
        handleGlobalState('changed');
        let name;
        try {
            setLoading(true);
            const res = await fetch('https://randomuser.me/api/?inc=name');
            const data = (await res.json()) as IResponce;
            name = data.results[0].name.first;
            setName(name);
            setLoading(false);
        } catch (err) {
            alert(err);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>Hybrid Page(Static + CSR)</h1>
            <p>{loading ? 'Loading...' : `Hello! My name is ${name}`}</p>
            <button onClick={handleBtnClick}>fetch name</button>
            <div>Global state {globalState}</div>
        </Layout>
    );
};

export default Hybrid;

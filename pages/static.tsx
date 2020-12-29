import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { GetStaticProps } from 'next';

// Static generation with fetching data on build time and
// revalidate (page re-generates when request comes and at most once every second)

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

export const getStaticProps: GetStaticProps = async () => {
    let name;
    try {
        const res = await fetch('https://randomuser.me/api/?inc=name');
        const data = (await res.json()) as IResponce;
        name = data.results[0].name.first;
    } catch (err) {
        alert(err);
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

const Static: React.FC<Props> = ({ name }) => (
    <Layout>
        <Head>
            <title>First Post</title>
        </Head>
        <p>Hello! My name is {name}</p>

        <h1>First Post</h1>
        <h2>
            <Link href="/posts/redirect">
                <a>Redirect</a>
            </Link>
        </h2>
    </Layout>
);

export default Static;

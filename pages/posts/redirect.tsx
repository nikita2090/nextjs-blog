import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';

import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
    const data = true;

    if (!data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            h1: 'Data has fetched',
        },
    };
};

interface Props {
    h1: string;
}

const Redirect: React.FC<Props> = ({ h1 }) => (
    <Layout>
        <Head>
            <title>Redirect</title>
        </Head>

        <h1>{h1}</h1>
        <h2>
            <Link href="/">
                <a>Back to home</a>
            </Link>
        </h2>
    </Layout>
);

export default Redirect;

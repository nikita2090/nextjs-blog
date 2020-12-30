import Layout from '../components/layout';
import Head from 'next/head';

import utilStyles from '../styles/utils.module.scss';

import { GetServerSideProps } from 'next';

// SSR (every user request generates page), if no data => 404

export const getServerSideProps: GetServerSideProps = async () => {
    const someFetchedData = 'When my guitar gently weeps';
    // const someFetchedData = false;

    if (!someFetchedData) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            someFetchedData,
        },
    };
};

interface Props {
    someFetchedData: string;
}

const SSR: React.FC<Props> = ({ someFetchedData }) => (
    <Layout>
        <Head>
            <title>SSR</title>
        </Head>
        <h1>SSR Page</h1>
        <section className={utilStyles.headingMd}>
            <p>{someFetchedData}</p>
        </section>
    </Layout>
);

export default SSR;

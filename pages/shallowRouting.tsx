import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/layout';

const ShallowRouting: React.FC = () => {
    const router = useRouter();

    const handleClick = () => {
        void router.push('/shallowRouting?counter=10', undefined, {
            shallow: true,
        });
    };
    return (
        <Layout>
            <Head>
                <title>Shallow Routing</title>
            </Head>
            <h1>Shallow Routing</h1>
            <button onClick={handleClick}>Go</button>
        </Layout>
    );
};

export default ShallowRouting;

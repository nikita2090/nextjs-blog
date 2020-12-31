import Head from 'next/head';
import Layout from '../components/layout';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
    const { USERNAME1, NEXT_PUBLIC_API } = process.env;
    let serverEnvs = false;
    console.log(USERNAME1, NEXT_PUBLIC_API);

    if (USERNAME1 && NEXT_PUBLIC_API) {
        serverEnvs = true;
    }

    return {
        props: {
            data: 'Environment Variables',
            serverEnvs,
        },
    };
};

interface Props {
    data: string;
    serverEnvs: boolean;
}

const Static: React.FC<Props> = ({ data, serverEnvs }) => {
    // destructuring doesnt work
    console.log(process.env.USERNAME1);
    console.log(process.env.NEXT_PUBLIC_API);
    return (
        <Layout>
            <Head>
                <title>{data}</title>
            </Head>
            <h1>{data}</h1>

            <h2>Server</h2>
            {serverEnvs ? <p>Ok</p> : null}

            <h2>Browser</h2>
            <p>{process.env.USERNAME1}</p>
            <p>{process.env.NEXT_PUBLIC_API}</p>
        </Layout>
    );
};

export default Static;

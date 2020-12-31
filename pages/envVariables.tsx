import Head from 'next/head';
import Layout from '../components/layout';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
    const { USERNAME1, NEXT_PUBLIC_API } = process.env;
    console.log(USERNAME1, NEXT_PUBLIC_API);

    let serverEnvs = false;
    if (USERNAME1 && NEXT_PUBLIC_API) {
        serverEnvs = true;
    }

    const { SECRET } = process.env; // env variable from Vercel
    let vercelEnv = false;
    if (SECRET === 'next123') {
        vercelEnv = true;
    }

    return {
        props: {
            data: 'Environment Variables',
            serverEnvs,
            vercelEnv,
        },
    };
};

interface Props {
    data: string;
    serverEnvs: boolean;
    vercelEnv: boolean;
}

const Envs: React.FC<Props> = ({ data, serverEnvs, vercelEnv }) => {
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
            <p>{process.env.NEXT_PUBLIC_API} - Ok</p>

            <h2>Vercel</h2>
            {vercelEnv ? <p>Ok</p> : null}
        </Layout>
    );
};

export default Envs;

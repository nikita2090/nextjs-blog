import Head from 'next/head';
import Link from 'next/link';

import Layout from '../../components/layout';

const FirstPost: React.FC = () => (
    <Layout>
        <Head>
            <title>First Post</title>
        </Head>

        <h1>First Post</h1>
        <h2>
            <Link href="/posts/redirect">
                <a>Redirect</a>
            </Link>
        </h2>
    </Layout>
);

export default FirstPost;

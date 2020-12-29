import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.scss';

import Layout from '../../components/layout';

// Static generation of dynamic routes
// with fallback (missing pageId doesn't return 404 page and generate new static page on first user request.
// Other users will get this static page on their requests)

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: [
        {
            params: {
                pageId: 'phone',
            },
        },
        {
            params: {
                pageId: 'computer',
            },
        },
    ],
    fallback: true,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
    props: {
        name: params?.pageId,
    },
    revalidate: 1,
});

interface Props {
    name: string;
}

const Product: React.FC<Props> = ({ name }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <Head>
                <title>{name}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{name}</h1>
            </article>
        </Layout>
    );
};

export default Product;

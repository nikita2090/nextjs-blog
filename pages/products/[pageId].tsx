import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.scss';

import Layout from '../../components/layout';

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

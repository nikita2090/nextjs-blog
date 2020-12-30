import Layout, { siteTitle } from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';

import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.scss';
import { GetStaticProps } from 'next';

// Static generation with fetching data on build time

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
};

interface IAllPostsData {
    date: string;
    title: string;
    id: string;
}

interface Props {
    allPostsData: IAllPostsData[];
}

const Home: React.FC<Props> = ({ allPostsData }) => (
    <Layout home>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
            <h1>Types of rendering:</h1>
            <Link href="/static">
                <a>Static</a>
            </Link>
            <br />

            <Link href="/ssr">
                <a>SSR</a>
            </Link>
            <br />

            <Link href="/hybrid">
                <a>Hybrid (Static + CSR)</a>
            </Link>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>
                Static Generation with Dynamic Routing:
            </h2>
            <ul className={utilStyles.list}>
                {allPostsData.map(({ id, date, title }: IAllPostsData) => (
                    <li className={utilStyles.listItem} key={id}>
                        <Link href={`/posts/${id}`}>
                            <a>{title}</a>
                        </Link>
                        <br />
                        <small className={utilStyles.lightText}>
                            <Date dateString={date} />
                        </small>
                    </li>
                ))}
            </ul>

            <h2 className={utilStyles.headingLg}>
                Static Generation with Dynamic Routing and fallback:
            </h2>

            <Link href="/products/something">
                <a>Something</a>
            </Link>
            <hr />
            <Link href="/imageTest">
                <a>Next-Image Test</a>
            </Link>
        </section>
    </Layout>
);

export default Home;

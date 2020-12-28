import Layout, { siteTitle } from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';

import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.scss';
import { GetStaticProps } from 'next';

// eslint-disable-next-line @typescript-eslint/require-await
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
            <p>[Your Self Introduction]</p>
            <Link href="/posts/first-post">
                <a>First post</a>
            </Link>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Blog</h2>
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
        </section>
    </Layout>
);

export default Home;

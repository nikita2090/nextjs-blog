import { Fragment } from 'react';
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

const RENDERING_TYPES = [
    { name: 'Static', path: '/static' },
    { name: 'SSR', path: '/ssr' },
    { name: 'Hybrid (Static + CSR)', path: '/hybrid' },
];

const FEATURES = [
    {
        name: 'Static Generation with Dynamic Routing and fallback',
        path: '/products/something',
        ElemAfter: 'hr',
    },
    { name: 'Next-Image Test', path: '/imageTest', ElemAfter: 'hr' },
    { name: 'Env Test', path: '/envVariables', ElemAfter: 'hr' },
    { name: 'Shallow Routing', path: '/shallowRouting', ElemAfter: 'hr' },
    {
        name: 'Serverless Functions (Static)',
        path: '/serverlessFunctionsStatic',
        ElemAfter: 'br',
    },
    {
        name: 'Serverless Functions (Static-2)',
        path: '/users',
        ElemAfter: 'br',
    },
    {
        name: 'Serverless Functions (Dynamic)',
        path: '/users/2',
        ElemAfter: 'hr',
    },
    { name: 'Locale (ru)', path: '/locales', ElemAfter: 'br' },
    {
        name: 'Locale (en-US)',
        path: '/locales',
        ElemAfter: 'br',
        locale: 'en-US',
    },
];

const Home: React.FC<Props> = ({ allPostsData }) => (
    <Layout home>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
            <h1>Types of rendering:</h1>
            {RENDERING_TYPES.map(({ name, path }) => (
                <Fragment key={name}>
                    <Link href={path}>
                        <a>{name}</a>
                    </Link>
                    <br />
                </Fragment>
            ))}
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

            {FEATURES.map(({ name, path, locale, ElemAfter }) => {
                return (
                    <Fragment key={name}>
                        <Link href={path} locale={locale}>
                            <a>{name}</a>
                        </Link>
                        <ElemAfter />
                    </Fragment>
                );
            })}
        </section>
    </Layout>
);

export default Home;

import Head from 'next/head';
import Layout from '../components/layout';
import { GetStaticProps } from 'next';

// Static generation with locales.
// Next.js generates separate static page for each locale
// See locale changing in Link prop in index.js

export interface IRes {
    name: {
        first: string;
        last: string;
        title: string;
    };
}

export interface IResponce {
    info?: {
        seed: string;
        results: number;
        page: number;
        version: string;
    };
    results: IRes[];
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    let name;
    try {
        const res = await fetch('https://randomuser.me/api/?inc=name');
        const data = (await res.json()) as IResponce;
        name = data.results[0].name.first;
    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            name,
            locale,
        },
        revalidate: 1,
    };
};

interface Props {
    name: string;
    locale: string;
}

const StaticLocales: React.FC<Props> = ({ name, locale }) => (
    <Layout>
        <Head>
            <title>Static Locales</title>
        </Head>
        <h1>Static Locales</h1>
        <h2>
            <p>
                {locale === 'ru'
                    ? `Привет. Меня зовут ${name}`
                    : `Hello! My name is ${name}`}
            </p>
        </h2>
    </Layout>
);

export default StaticLocales;

import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';

import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.scss';

import { GetStaticProps, GetStaticPaths } from 'next';

interface IStaticProps {
    params: {
        id: string,
    },
}

export const getStaticProps: GetStaticProps = async ({ params }: IStaticProps) => {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

interface Props {
    postData: {
        title: string;
        date: string;
        contentHtml: string;
    },
}

const Post: React.FC<Props> = ({ postData }) => (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
);

export default Post;


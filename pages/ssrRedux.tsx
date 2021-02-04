import Layout from '../components/layout';
import Head from 'next/head';

import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount } from '../features/counter/counterSlice';
import * as actions from '../features/counter/counterSlice';

// SSR (every user request generates page) with Redux, if no data => 404

export const getServerSideProps: GetServerSideProps = async () => {
    const someFetchedCount = 42;
    // const someFetchedData = false;

    if (!someFetchedCount) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            someFetchedCount,
        },
    };
};

interface Props {
    someFetchedCount: number;
}

const SSRRedux: React.FC<Props> = ({ someFetchedCount }) => {
    const dispatch = useDispatch();
    const counter = useSelector(selectCount);

    const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(actions.increment());
    };

    const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(actions.decrement());
    };

    const handleSetCount = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(actions.setCount(someFetchedCount));
    };
    return (
        <Layout>
            <Head>
                <title>SSR with Redux</title>
            </Head>
            <h1>SSR Page with Redux</h1>

            <p>Fetched count: {someFetchedCount}</p>
            <p>Count: {counter}</p>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={handleSetCount}>set fetched count</button>
        </Layout>
    );
};

export default SSRRedux;

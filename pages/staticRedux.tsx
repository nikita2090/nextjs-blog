import Head from 'next/head';
import Layout from '../components/layout';

import { useDispatch, useSelector } from 'react-redux';
import { selectCount } from '../features/counter/counterSlice';
import * as actions from '../features/counter/counterSlice';

// Static generation with redux

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

interface Props {
    name: string;
}

const StaticRedux: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const counter = useSelector(selectCount);

    const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(actions.increment());
    };

    const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(actions.decrement());
    };

    const handleIncrementWithSaga = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        dispatch(actions.incrementWithSaga({ ms: 2000 }));
    };
    return (
        <Layout>
            <Head>
                <title>With Redux</title>
            </Head>
            <h1>Static Page with Redux</h1>

            <p>Count: {counter}</p>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={handleIncrementWithSaga}>+ with saga</button>
            <></>
        </Layout>
    );
};

export default StaticRedux;

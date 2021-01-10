import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import Head from 'next/head';
import Layout from '../components/layout';

export interface IResponce {
    text: string;
}

const ServerlessFunctionsStatic: React.FC = () => {
    const [getReqResult, setGetReqResult] = useState('');
    const [inputText, setInputText] = useState('');
    const [postReqResult, setPostReqResult] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleGetBtnClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        try {
            const res: AxiosResponse = await axios('/api/message');
            const data = res.data as IResponce;
            setGetReqResult(data.text);
        } catch (err) {
            alert(err);
        }
    };

    const handlePostBtnClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        try {
            const res: AxiosResponse = await axios.post('/api/message', {
                message: inputText,
            });
            const data = res.data as IResponce;
            setPostReqResult(data.text);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <Layout>
            <Head>
                <title>Serverless Functions</title>
            </Head>
            <h1>Serverless Functions (Static)</h1>
            <div>
                <div>Get:{getReqResult}</div>
                <button onClick={handleGetBtnClick}>Get message</button>
                <hr />

                <div>Post:{postReqResult}</div>
                <input value={inputText} onChange={handleInputChange} />
                <button onClick={handlePostBtnClick}>Post message</button>
            </div>
        </Layout>
    );
};

export default ServerlessFunctionsStatic;

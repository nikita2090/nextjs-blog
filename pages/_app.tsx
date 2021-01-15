import '../styles/global.scss';
import { AppProps, NextWebVitalsMetric } from 'next/app';
import { useState } from 'react';

export function reportWebVitals(metric: NextWebVitalsMetric): void {
    console.log(metric);
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const [globalState, setGlobalState] = useState('default');

    const handleGlobalState = (str: string) => {
        setGlobalState(str);
    };

    return (
        <Component
            {...pageProps}
            globalState={globalState}
            handleGlobalState={handleGlobalState}
        />
    );
};

export default App;

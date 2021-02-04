import '../styles/global.scss';
import { AppProps, NextWebVitalsMetric } from 'next/app';
import { useState } from 'react';

import { Provider } from 'react-redux';
import { store } from '../store/store';

export function reportWebVitals(metric: NextWebVitalsMetric): void {
    console.log(metric);
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const [globalState, setGlobalState] = useState('default');

    const handleGlobalState = (str: string) => {
        setGlobalState(str);
    };

    return (
        <Provider store={store}>
            <Component
                {...pageProps}
                globalState={globalState}
                handleGlobalState={handleGlobalState}
            />
        </Provider>
    );
};

export default App;

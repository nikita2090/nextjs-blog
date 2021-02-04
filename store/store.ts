import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../features/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        counter: counterSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

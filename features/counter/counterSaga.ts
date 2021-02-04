import { takeLatest, put, delay } from 'redux-saga/effects';
import { incrementWithSaga, increment, changeLoading } from './counterSlice';

import { IIncrementWithSaga } from './counterSlice';

export default function* counterWatcher(): Generator {
    yield takeLatest(incrementWithSaga.type, handleSagaIncrement);
}

interface IIncrementSagaAction {
    payload: IIncrementWithSaga;
    type: string;
}

function* handleSagaIncrement(action: IIncrementSagaAction) {
    const {
        payload: { ms },
    } = action;

    yield put(changeLoading(true));
    yield delay(ms);
    yield put(increment());
    yield put(changeLoading(false));
}

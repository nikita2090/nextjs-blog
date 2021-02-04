import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        loading: false,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCount: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export interface IIncrementWithSaga {
    ms: number;
}

export const incrementWithSaga = createAction<IIncrementWithSaga>(
    'counter/incrementWithSaga'
);

export const {
    increment,
    decrement,
    changeLoading,
    setCount,
} = counterSlice.actions;

export const selectLoading = (state: RootState): boolean =>
    state.counter.loading;

export const selectCount = (state: RootState): number => state.counter.value;

export default counterSlice.reducer;

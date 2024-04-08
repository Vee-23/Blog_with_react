import {configureStore} from '@reduxjs/toolkit';
import { SliceReducer } from './authSlice';

const store = configureStore({
    reducer:SliceReducer
})

export default store;
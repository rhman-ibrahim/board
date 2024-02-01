import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@theme/state/slice';


const initialState  = {};
const store         = configureStore(
    {
        reducer:
        {
            theme: themeReducer,
        },
        preloadedState: initialState,
    }
);

export default store;

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@theme/state/slice';
import labelsReducer from '@api/labels';
import listsReducer from '@api/lists';


const initialState  = {};
const store         = configureStore(
    {
        reducer:
        {
            theme: themeReducer,
            labels: labelsReducer,
            lists: listsReducer
        },
        preloadedState: initialState,
    }
);

export default store;

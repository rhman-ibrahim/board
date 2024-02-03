import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '@api/cards';
import themeReducer from '@theme/slice';
import labelsReducer from '@api/labels';
import listsReducer from '@api/lists';


const initialState  = {};
const store         = configureStore(
    {
        reducer:
        {
            theme: themeReducer,
            cards: cardsReducer,
            labels: labelsReducer,
            lists: listsReducer
        },
        preloadedState: initialState,
    }
);

export default store;

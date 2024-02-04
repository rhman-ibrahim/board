import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '@core/bridge';

const about = {
    "Queue": {
        phase:1,
        description:"This phase represents the next features to work on.",
        icon:"new_label",
        background:"#ff9800",
        color:"#ffffff"
    },
    "Doing": {
        phase:2,
        description:"This phase represents features in progress.",
        icon:"label",
        background:"#2979ff",
        color:"#ffffff"
    },
    "Done": {
        phase:3,
        description:"This phase represents completed features.",
        icon:"all_match",
        background:"#1c54b2",
        color:"#ffffff"
    },
    "Tested": {
        phase:4,
        description:"This phase indicates that completed features have passed its tests successfully.",
        icon:"verified",
        background:"#4caf50",
        color:"#ffffff"
    },
    "Integrated": {
        phase:5,
        description:"This phase represents features that have been implemented successfully in projects.",
        icon:"account_tree",
        background:"#357a38",
        color:"#ffffff",
    },
    "Bugs": {
        phase:6,
        description:"This phase represents features that raise error/warning or do not function as supposed.",
        icon:"bug_report",
        background:"#aa2e25",
        color:"#ffffff"
    }
}

const initialState = {
    lists: [],
    count: 0,
    isLoading: false,
    error: null,
    about: about
};
  
export const fetchLists = createAsyncThunk(
    'lists/fetchLists', async (_, { rejectWithValue }) => {
        return fetchData('lists', rejectWithValue);
    }
);
  
const listsSlice = createSlice(
    {
        name: 'lists',
        initialState,
        extraReducers: (builder) => {
        builder
        .addCase(
            fetchLists.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
        .addCase(
            fetchLists.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.lists = action.payload;
                    state.count = action.payload.length;
                }
            )
        .addCase(
            fetchLists.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
        }
    }
);
  
export default listsSlice.reducer;
  
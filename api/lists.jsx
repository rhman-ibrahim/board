import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '@core/bridge';

const glyphs = {
    "Queue": {
        phase:1,
        icon:"new_label",
        background:"#ffc107",
        color:"#000000"
    },
    "Doing": {
        phase:2,
        icon:"label",
        background:"#2979ff",
        color:"#ffffff"
    },
    "Done": {
        phase:3,
        icon:"all_match",
        background:"#1c54b2",
        color:"#ffffff"
    },
    "Tested": {
        phase:4,
        icon:"verified",
        background:"#4caf50",
        color:"#000000"
    },
    "Integrated": {
        phase:5,
        icon:"account_tree",
        background:"#357a38",
        color:"#ffffff",
    },
    "Bugs": {
        phase:6,
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
    glyphs: glyphs
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
  
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '@core/bridge';


const initialState = {
    lists: [],
    count: 0,
    isLoading: false,
    error: null,
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
  
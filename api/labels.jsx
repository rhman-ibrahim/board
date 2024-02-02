import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '@core/bridge';


const initialState = {
    labels: [],
    count: 0,
    cards: 0,
    isLoading: false,
    error: null,
};
  
export const fetchLabels = createAsyncThunk(
    'labels/fetchLabels', async (_, { rejectWithValue }) => {
        return fetchData('labels', rejectWithValue);
    }
);
  
const labelsSlice = createSlice(
    {
        name: 'labels',
        initialState,
        extraReducers: (builder) => {
        builder
        .addCase(
            fetchLabels.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
        .addCase(
            fetchLabels.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.labels = action.payload;
                    state.count = action.payload.length;
                    state.cards = action.payload.reduce((total, label) => total + label.uses, 0)
                }
            )
        .addCase(
            fetchLabels.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
        }
    }
);
  
export default labelsSlice.reducer;
  
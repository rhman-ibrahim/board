import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBoard } from '@core/bridge';


const initialState = {
    cards: [],
    count: 0,
    isLoading: false,
    error: null,
};
  
export const fetchCards = createAsyncThunk(
    'cards/fetchCards', async (_, { rejectWithValue }) => {
        return fetchBoard('cards', rejectWithValue);
    }
);
  
const cardsSlice = createSlice(
    {
        name: 'cards',
        initialState,
        extraReducers: (builder) => {
        builder
        .addCase(
            fetchCards.pending, (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
        .addCase(
            fetchCards.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.cards = action.payload;
                    state.count = action.payload.length;
                }
            )
        .addCase(
            fetchCards.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            );
        }
    }
);
  
export default cardsSlice.reducer;
  
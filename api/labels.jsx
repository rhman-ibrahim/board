import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '@core/bridge';

const about = {
    "Authentication": {
        icon:"security",
        color:"#357a38"
    },
    "Forms": {
        icon:"edit_document",
        color:"#ffc107"
    },
    "Time": {
        icon:"schedule",
        color:"#ffc107"
    },
    "Notifications": {
        icon:"notifications",
        color:"#f73378"
    },
    "Logging": {
        icon:"history",
        color:"#f73378"
    },
    "Language": {
        icon:"translate",
        color:"#2979ff"
    },
    "Theme": {
        icon:"brightness_4",
        color:"#2979ff"
    },
    "API": {
        icon:"api",
        color:"#b28704"
    },
    "Channels": {
        icon:"compare_arrows",
        color:"#b28704"
    }
}

const initialState = {
    labels: [],
    count: 0,
    totalUses: 0,
    isLoading: false,
    error: null,
    about: about
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
                    state.totalUses = action.payload.reduce((total, label) => total + label.uses, 0);
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
  
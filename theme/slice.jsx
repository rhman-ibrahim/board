import { createSlice } from '@reduxjs/toolkit';


const theme = createSlice(
    {
        name: 'theme',
        initialState: {
            currentTheme: localStorage.getItem('theme') || 'light',
        },
        reducers: {
            setDefaultTheme: state => {
                const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = prefersDarkMode ? 'dark':'light';
                state.currentTheme = theme;
                localStorage.setItem('theme', theme);
            },
            setDarkTheme: state => {
                state.currentTheme = 'dark';
                localStorage.setItem('theme', 'dark');
            },
            setLightTheme: state => {
                state.currentTheme = 'light';
                localStorage.setItem('theme', 'light');
            }
        },
    }
);

export const { setDefaultTheme, setDarkTheme, setLightTheme } = theme.actions;
export const selectTheme = (state) => state.theme.currentTheme;
export default theme.reducer;

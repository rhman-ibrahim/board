import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setDefaultTheme, setDarkTheme, setLightTheme } from '@theme/slice';


const DefaultThemeCard = () => {

    const currentTheme              = useSelector(selectTheme);
    const dispatch                  = useDispatch();
   
    const applyDefaultTheme = () => {
        dispatch(setDefaultTheme());
    };
    
    useEffect(
        () => {
            document.body.className = currentTheme;
        },
        [currentTheme]
    );
    
    return (
        <button type='button' onClick={ applyDefaultTheme }>
            <i className='material-symbols-outlined'>tune</i>
        </button>
    )

}

const ThemeProvider = () => {

    const currentTheme              = useSelector(selectTheme);
    const dispatch                  = useDispatch();
   
    const applyDarkTheme = () => {
        dispatch(setDarkTheme());
    };
    const applyLightTheme = () => {
        dispatch(setLightTheme());
    };
    
    useEffect(
        () => {
            document.body.className = currentTheme;
        },
        [currentTheme]
    );
    
    return (
        <nav>
            <button type='button' onClick={ applyDarkTheme }>
                <i className='material-symbols-outlined' style={{ color: currentTheme == 'dark' ? 'var(--info)': null}}>dark_mode</i>
            </button>
            <button type='button' onClick={ applyLightTheme } style={{ color: currentTheme == 'light' ? 'var(--info)': null}}>
                <i className='material-symbols-outlined'>light_mode</i>
            </button>
        </nav>
    )

}

export default ThemeProvider;
export { DefaultThemeCard };
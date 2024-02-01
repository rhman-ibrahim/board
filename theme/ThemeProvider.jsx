import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setDefaultTheme, setDarkTheme, setLightTheme } from '@theme/state/slice';


const ThemeProvider = () => {

    const currentTheme              = useSelector(selectTheme);
    const dispatch                  = useDispatch();
   
    const applyDefaultTheme = () => {
        dispatch(setDefaultTheme());
    };
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
            <button type='button' onClick={ applyDefaultTheme }>
                <i className='material-symbols-outlined'>tune</i>
            </button>
            <button type='button' onClick={ applyDarkTheme }>
                <i className='material-symbols-outlined'>dark_mode</i>
            </button>
            <button type='button' onClick={ applyLightTheme }>
                <i className='material-symbols-outlined'>light_mode</i>
            </button>
        </nav>
    )

}

export default ThemeProvider;
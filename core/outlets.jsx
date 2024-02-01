import React from 'react';
import { Outlet } from 'react-router';
import ThemeProvider from '@theme/ThemeProvider';
import useCSSInject from '@hooks/useCSSInject';


const Providers = () => {
    return (
        <>
            <ThemeProvider />
        </>
    )
}

export const LandingOutlet = () => {
    useCSSInject("/css/Theme.css");
    return (
        <>
            <Providers />
            <Outlet />
        </>
    )
}
import React from 'react';
import { Outlet } from 'react-router';
import Header from '@components/base/Header';
import useCSSInject from '@hooks/useCSSInject';


export const LandingOutlet = () => {
    useCSSInject("/css/Theme.css");
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
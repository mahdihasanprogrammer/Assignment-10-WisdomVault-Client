
import MainNavbar from '@/components/shared/MainNavbar';
import React from 'react';

const MainLayout = ({children}) => {
    return (
        <div>
            <MainNavbar/>
            <main>{children}</main>
        </div>
    );
};

export default MainLayout;

import Footer from '@/components/shared/Footer';
import MainNavbar from '@/components/shared/MainNavbar';
import React from 'react';

const MainLayout = ({children}) => {
    return (
        <div>
            <MainNavbar/>
            <main className='min-h-screen'>{children}</main>
            <Footer/>
        </div>
    );
};

export default MainLayout;
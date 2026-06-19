import DashboardSideBar from '@/components/dashboard/DashboardSideBar';
import DashboardNavbar from '@/components/shared/DashboardNavbar';
import React from 'react';


const ProtectedLayout = ({children}) => {
    return (
        <div className='flex flex-col'>
            <DashboardNavbar/>
           <div className='flex min-h-screen'>
             <DashboardSideBar/>
            <main className='flex-1'>{children}</main>
           </div>
        </div>
    );
};

export default ProtectedLayout;
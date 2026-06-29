import { getUserSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminLayout =async ({children}) => {
    const user = await getUserSession();
     if(user?.userRole !== 'admin'){
        redirect('/forbidden')
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminLayout;
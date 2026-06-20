import DashboardSideBar from '@/components/dashboard/DashboardSideBar';
import DashboardNavbar from '@/components/shared/DashboardNavbar';



const ProtectedLayout = ({children}) => {
    return (
        <div className='flex flex-col z-80'>
            <DashboardNavbar/>
           <div className='flex min-h-screen'>
             <DashboardSideBar/>
            <main className='flex-1'>{children}</main>
           </div>
        </div>
    );
};

export default ProtectedLayout;
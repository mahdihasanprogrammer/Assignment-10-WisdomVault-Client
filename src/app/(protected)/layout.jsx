import DashboardSideBar from '@/components/dashboard/DashboardSideBar';
import DashboardNavbar from '@/components/shared/DashboardNavbar';



const ProtectedLayout = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <DashboardNavbar />
            <div className='flex'>
                <DashboardSideBar />
                <main className='flex-1'>{children}</main>
            </div>
        </div>
    );
};

export default ProtectedLayout;
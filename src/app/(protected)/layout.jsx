
const ProtectedLayout = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen'>
                
                <main className=''>{children}</main>
           
        </div>
    );
};

export default ProtectedLayout;
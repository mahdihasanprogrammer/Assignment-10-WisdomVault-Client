import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";

const ProtectedLayout = async({ children }) => {
    const user = await getUserSession();
    if(!user){
        redirect('/signin')
    }
    return (
        <div className='flex flex-col min-h-screen'>
                
                <main className=''>{children}</main>
           
        </div>
    );
};

export default ProtectedLayout;
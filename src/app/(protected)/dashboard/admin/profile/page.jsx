import React from 'react';
import { getUserSession } from "@/lib/session";
import AdminProfileClient from './AdminProfileClient';


const AdminProfilePage = async () => {
   
    const user = await getUserSession();
    

  
    const adminData = {
        name: user?.name || "Admin User",
        email: user?.email || "No Email Provided",
        image: user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256", // ফলব্যাক অবতার
        role: user?.role === 'admin' ? "System Admin" : "Super Admin",
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-purple-300 tracking-tight">Admin Profile</h1>
                <p className="text-sm text-white/50 mt-1">Manage your administrative credentials and identity.</p>
            </div>
            
            {/* ক্লায়েন্ট পার্টকে রিয়াল ডাটা পাস করা হচ্ছে */}
            <AdminProfileClient initialAdminData={adminData} />
        </div>
    );
};

export default AdminProfilePage;
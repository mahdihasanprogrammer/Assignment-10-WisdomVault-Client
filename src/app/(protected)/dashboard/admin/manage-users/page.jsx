import React from 'react';
import { FiUsers } from 'react-icons/fi';
import { getUsersList } from "@/lib/api/users";
import ManageUsersTable from './ManageUsersTable';


const ManageUsersPage = async () => {
  // সার্ভার সাইড থেকে ডাটা ফেচ করা
  const users = await getUsersList() || [];

  return (
    <div className="p-4 sm:p-8 bg-[#080418] min-h-screen text-white space-y-6">
      
      {/* হেডার */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-5">
        <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
          <FiUsers className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent">Manage Users</h1>
          <p className="text-xs text-white/40 mt-0.5">Overview of registered user matrix and contributions.</p>
        </div>
      </div>

      {/* ক্লায়েন্ট টেবিল কম্পোনেন্টে ডাটা পাস করা হলো */}
      <ManageUsersTable users={users} />
      
    </div>
  );
};

export default ManageUsersPage;
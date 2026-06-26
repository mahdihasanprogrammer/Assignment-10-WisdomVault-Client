"use client";


import { Table } from '@heroui/react';
import { FiUser, FiMail, FiShield, FiBookOpen, FiTrash2, FiUserCheck, FiUserX } from 'react-icons/fi';
import Image from 'next/image';
import { changeRole } from '@/lib/actions/users';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// ==========================================
// ১. সাব-কম্পোনেন্ট: প্রোফাইল কলাম (নাম ও ইমেইল)
// ==========================================
const UserProfileCell = ({ user }) => {
  const imageSrc = user?.image;
  const name = user?.name || "Anonymous";
  const email = user?.email || "No Email Provided";

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl border border-white/10 bg-purple-500/5 flex items-center justify-center overflow-hidden shrink-0">
        {imageSrc ? (
          <Image 
            src={imageSrc} 
            alt={name} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
            width={80} 
            height={80} 
          />
        ) : (
          <FiUser className="text-purple-400 w-4 h-4" />
        )}
      </div>
      <div className="min-w-0">
        <span className="text-sm font-bold text-white block tracking-wide truncate">{name}</span>
        <span className="text-xs text-white/40 flex items-center gap-1 mt-0.5 truncate">
          <FiMail className="w-3 h-3 text-purple-500/50" /> {email}
        </span>
      </div>
    </div>
  );
};

// ==========================================
// ২. সাব-কম্পোনেন্ট: ডাইনামিক অ্যাকশন বাটনসমূহ
// ==========================================
const ActionCell = ({ isAdmin, user, onRoleToggle }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {isAdmin ? (
        <button 
          onClick={() => onRoleToggle(user)}
          title="Demote to User"
          className="p-2 bg-amber-500/5 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 rounded-xl transition-all flex items-center justify-center cursor-pointer"
        >
          <FiUserX className="w-4 h-4" />
          <span className="text-[10px] ml-1 font-bold">Make User</span>
        </button>
      ) : (
        <button 
          onClick={() => onRoleToggle(user)}
          title="Promote to Admin"
          className="p-2 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-xl transition-all flex items-center justify-center cursor-pointer"
        >
          <FiUserCheck className="w-4 h-4" />
          <span className="text-[10px] ml-1 font-bold">Make Admin</span>
        </button>
      )}

      <button 
        title="Delete Account" 
        className="p-2 bg-rose-500/5 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 rounded-xl transition-all flex items-center justify-center cursor-pointer"
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

// ==========================================
// ৩. মেইন ক্লায়েন্ট টেবিল কম্পোনেন্ট
// ==========================================
const ManageUsersTable = ({ users = [] }) => {
  const router = useRouter();


  const handleRoleToggle = async (user) => {
    if (!user?._id) return;

    try {

      const updateRole = user?.role === "admin" ? "user" : "admin";
      const result = await changeRole(user._id, { updateRole });

      if (result?.modifiedCount > 0) {
          router.refresh();
          toast.success(`Successfully converted to ${updateRole}!`);
      } else {
        toast.error("Failed to update user role.");
      }
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className={`border border-white/10 rounded-2xl overflow-hidden bg-[#0a051a]/60 backdrop-blur-xl shadow-2xl transition-opacity`}>
      <Table className="min-w-full text-white">
        <Table.ScrollContainer>
          <Table.Content aria-label="Registered users directory">
            
            <Table.Header className="bg-white/5 border-b border-white/10">
              <Table.Column className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300">User Profile</Table.Column>
              <Table.Column className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300">Role Matrix</Table.Column>
              <Table.Column className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300">Lessons Created</Table.Column>
              <Table.Column className="text-center py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300 w-56">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {users.map((user, index) => {
                const isAdmin = user?.role === 'admin';
                const rowKey = user?._id?.$oid || user?._id || `user-row-${index}`;

                return (
                  <Table.Row key={rowKey} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    
                    {/* ইউজার প্রোফাইল কলাম */}
                    <Table.Cell className="py-4 px-6">
                      <UserProfileCell user={user} />
                    </Table.Cell>

                    {/* রোল মেট্রিড্স কলাম */}
                    <Table.Cell className="py-4 px-6">
                      {isAdmin ? (
                        <span className="bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 shadow-lg shadow-amber-950/20">
                          <FiShield className="w-3 h-3" /> Admin ⭐
                        </span>
                      ) : (
                        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md inline-flex items-center gap-1.5">
                          <FiUser className="w-3 h-3" /> User
                        </span>
                      )}
                    </Table.Cell>

                    {/* লেসন কাউন্ট কলাম */}
                    <Table.Cell className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-white/80">
                        <FiBookOpen className="w-4 h-4 text-indigo-400" />
                        <span>{user?.lessonCount || 0}</span>
                      </div>
                    </Table.Cell>

                    {/* অ্যাকশন বাটন কলাম */}
                    <Table.Cell className="py-4 px-6 text-center">
                      <ActionCell 
                        user={user} 
                        isAdmin={isAdmin} 
                        onRoleToggle={handleRoleToggle} 
                      />
                    </Table.Cell>

                  </Table.Row>
                );
              })}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer />
      </Table>
    </div>
  );
};

export default ManageUsersTable;
"use client";

import React, { useState, useEffect } from 'react';
import { Table } from '@heroui/react';
import { FiUser, FiMail, FiShield, FiBookOpen, FiTrash2, FiUserCheck, FiUserX, FiAlertCircle } from 'react-icons/fi';
import Image from 'next/image';
import { changeRole } from '@/lib/actions/users';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// ==========================================
// ১. সাব-কম্পোনেন্ট: প্রোফাইল কলাম
// ==========================================
const UserProfileCell = ({ user }) => {
  const imageSrc = user?.image;
  const name = user?.name || "Anonymous";
  const email = user?.email || "No Email Provided";

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl border border-white/10 bg-purple-500/5 flex items-center justify-center overflow-hidden shrink-0">
        {imageSrc ? (
          <Image src={imageSrc} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" width={80} height={80} />
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
const ActionCell = ({ isAdmin, user, onRoleToggle, disabled }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {isAdmin ? (
        <button 
          onClick={() => onRoleToggle(user)}
          disabled={disabled}
          title="Demote to User"
          className="p-2 bg-amber-500/5 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FiUserX className="w-4 h-4" />
          <span className="text-[10px] ml-1 font-bold">Make User</span>
        </button>
      ) : (
        <button 
          onClick={() => onRoleToggle(user)}
          disabled={disabled}
          title="Promote to Admin"
          className="p-2 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <FiUserCheck className="w-4 h-4" />
          <span className="text-[10px] ml-1 font-bold">Make Admin</span>
        </button>
      )}

      <button disabled={disabled} title="Delete Account" className="p-2 bg-rose-500/5 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
        <FiTrash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

// ==========================================
// ৩. মেইন ক্লায়েন্ট টেবিল কম্পোনেন্ট
// ==========================================
const ManageUsersTable = ({ users: initialUsers = [] }) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // ১. সার্ভার থেকে আসা ইউজারদের লোকাল এরে স্টেটে রাখা হলো ইনস্ট্যান্ট রিফ্রেশের জন্য
  const [localUsers, setLocalUsers] = useState(initialUsers);

  const handleRoleToggle = async (user) => {
    if (!user?._id || isUpdating) return;

    const updateRole = user?.UserRole === "admin" ? "user" : "admin";

    try {
      setIsUpdating(true);
      const result = await changeRole(user._id, { updateRole });

      if (result?.modifiedCount > 0) {
        // ২. ইনস্ট্যান্ট ম্যাজিক রিফ্রেশ লজিক (স্টেট আপডেট)
        setLocalUsers((prevUsers) =>
          prevUsers.map((u) => (u._id === user._id ? { ...u, role: updateRole } : u))
        );
        
        toast.success(`Successfully converted to ${updateRole}!`);
        router.refresh(); // ব্যাকএন্ড ক্যাশ ক্লিয়ারের জন্য
      } else {
        toast.error("Failed to update user role.");
      }
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`border border-white/10 rounded-2xl overflow-hidden bg-[#0a051a]/60 backdrop-blur-xl shadow-2xl transition-opacity duration-300`}>
      <Table className="min-w-full text-white">
        <Table.ScrollContainer>
          <Table.Content aria-label="Registered users directory">
            
            <Table.Header className="bg-white/5 border-b border-white/10">
              <Table.Column isRowHeader className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300">User Profile</Table.Column>
              <Table.Column className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300">Role Matrix</Table.Column>
              <Table.Column className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300">Lessons Created</Table.Column>
              <Table.Column className="text-center py-4 px-6 text-xs font-black uppercase tracking-wider text-purple-300 w-56">Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {/* ৩. এখন লুপ চলবে localUsers এর উপর */}
              {localUsers.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="py-12 text-center text-white/40">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FiAlertCircle className="w-6 h-6 text-purple-400/50" />
                      <span className="text-sm font-medium">No registered entities found.</span>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ) : (
                localUsers.map((user, index) => {
                  const isAdmin = user?.userRole === 'admin';
                  const rowKey = user?._id?.$oid || user?._id || `user-row-${index}`;

                  return (
                    <Table.Row key={rowKey} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      
                      <Table.Cell className="py-4 px-6">
                        <UserProfileCell user={user} />
                      </Table.Cell>

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

                      <Table.Cell className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-white/80">
                          <FiBookOpen className="w-4 h-4 text-indigo-400" />
                          <span>{user?.lessonCount || 0}</span>
                        </div>
                      </Table.Cell>

                      <Table.Cell className="py-4 px-6 text-center">
                        <ActionCell 
                          user={user} 
                          isAdmin={isAdmin} 
                          onRoleToggle={handleRoleToggle} 
                          disabled={isUpdating}
                        />
                      </Table.Cell>

                    </Table.Row>
                  );
                })
              )}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer />
      </Table>
    </div>
  );
};

export default ManageUsersTable;
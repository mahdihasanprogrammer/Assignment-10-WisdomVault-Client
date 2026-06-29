"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

const SignOutBtn = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();

    router.push("/signin");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-300 hover:text-red-200 hover:bg-red-500/10 transition cursor-pointer"
    >
      <FiLogOut className="w-5 h-5" />
      Sign Out
    </button>
  );
};

export default SignOutBtn;
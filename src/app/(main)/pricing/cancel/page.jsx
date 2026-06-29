import Link from "next/link";
import { FiXCircle, FiRefreshCw, FiArrowLeft, FiShield } from "react-icons/fi";

export default async function CancelPage({ searchParams }) {
  const { canceled } = await searchParams;

  console.log("canceled:", canceled);

  return (
    <main className="min-h-screen bg-[#030014] flex items-center justify-center px-4 text-white">
      <div className="max-w-md w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">

        {/* Icon */}
        <FiXCircle className="mx-auto text-red-500 w-20 h-20 mb-6" />

        {/* Title */}
        <h1 className="text-4xl font-bold mb-3">
          Payment Cancelled
        </h1>

        {/* Description */}
        <p className="text-white/50 mb-8">
          Your payment was cancelled before completion.
          <br />
          No charges have been made to your account.
        </p>

        {/* Secure Status */}
        <div className="border border-white/10 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-green-400">
            <FiShield />
            <span className="font-semibold">Secure Status</span>
          </div>

          <p className="text-sm text-white/50 mt-2">
            Your payment information remains secure.
            You can safely try your payment again.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">

          {/* Try Again */}
          <form action="/api/checkout_sessions" method="POST">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 transition-all flex justify-center items-center gap-2 cursor-pointer font-semibold"
            >
              <FiRefreshCw />
              Try Payment Again
            </button>
          </form>

          {/* Return Home */}
          <Link href="/">
            <button
              className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all flex justify-center items-center gap-2 cursor-pointer font-semibold"
            >
              <FiArrowLeft />
              Return Home
            </button>
          </Link>

        </div>

      </div>
    </main>
  );
}
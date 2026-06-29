import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
// FiShieldCheck এর বদলে FiShield ইম্পোর্ট করা হলো
import { FiCheckCircle, FiMail, FiArrowRight, FiShield } from 'react-icons/fi'
import { addPaymentInfo } from '@/lib/actions/paymentInfo'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {

    const paymentInfo = {email: customerEmail};
    const result = await addPaymentInfo(paymentInfo);
    console.log(result, 'result')





    return (
      <main className="py-10 bg-[#030014] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden select-none">
        
        {/* ব্যাকগ্রাউন্ড নিওন অরা গ্লো */}
        <div className="absolute w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] bg-purple-600/[0.02] blur-[130px] rounded-full pointer-events-none" />

        {/* সাকসেস স্ল্যাব কন্টেইনার */}
        <div className="w-full max-w-md border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-2xl rounded-3xl p-8  shadow-[0_30px_100px_rgba(0,0,0,0.8)] text-center relative">
          
          {/* গ্লোয়িং সাকসেস আইকন অরবিট */}
          <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
            <div className="w-full h-full border border-emerald-500/30 bg-emerald-500/10 rounded-2xl flex items-center justify-center relative z-10">
              <FiCheckCircle className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            </div>
          </div>

          {/* হেডিংস */}
          <div className="space-y-2 mb-8">
            <span className="text-[10px] font-mono tracking-[0.3em] text-emerald-400 uppercase font-bold">
              Payment Secured
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Upgrade Successful!
            </h1>
            <p className="text-xs sm:text-sm text-white/40 font-medium max-w-sm mx-auto">
              We appreciate your business. Your premium access has been instantly provisioned.
            </p>
          </div>

          {/* ট্রানজেকশন/কনফার্মেশন ডিটেইলস পড */}
          <div className="w-full bg-white/[0.01] border border-white/[0.04] rounded-2xl p-4 space-y-3 mb-8 text-left">
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-xs mt-0.5">
                <FiMail />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-wider">Confirmation Sent To</p>
                <p className="text-xs font-bold text-white/80 truncate font-mono mt-0.5">{customerEmail}</p>
              </div>
            </div>

            <div className="h-[1px] bg-white/[0.04]" />

            <div className="text-[11px] text-white/30 leading-relaxed">
              Have any issues or questions? Reach out to our dedicated dispatch terminal at{' '}
              <a href="mailto:orders@example.com" className="text-purple-400 hover:underline font-mono font-bold">
                orders@example.com
              </a>
            </div>
          </div>

          {/* অ্যাকশন বাটন */}
          <div className="space-y-4">
            <Link href="/dashboard" className="block w-full">
              <button className="w-full cursor-pointer py-4 bg-linear-to-br from-indigo-600  to-pink-500 hover:bg-white/90 transition-all hover:text-black text-xs font-black tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 group shadow-[0_10px_30px_rgba(255,255,255,0.05)]">
                Go to Dashboard
                <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* এখানে FiShieldCheck এর বদলে FiShield ব্যবহার করা হয়েছে */}
            <div className="flex items-center gap-1.5 justify-center text-[10px] font-mono text-white/20">
              <FiShield className="text-emerald-500/60 w-3.5 h-3.5" /> Stripe Verification Handshake Complete
            </div>
          </div>

        </div>
      </main>
    )
  }
}
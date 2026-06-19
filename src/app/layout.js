import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WisdomVault | Digital Life Lessons",
  description: "Preserve personal wisdom, explore lessons, and grow together.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-screen bg-[#070314] text-[#F3EEFF] antialiased overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200 relative flex flex-col">

        {/* Deep Cyber-Glass Background Base */}
        <div className="fixed inset-0 -z-30 bg-[#060212]" />

        {/* High-Fidelity Ambient Mesh Glow Radiants */}
        <div className="fixed top-[-15%] right-[-10%] h-[55vw] w-[55vw] rounded-full bg-linear-to-br from-purple-600/15 to-fuchsia-600/10 blur-[160px] pointer-events-none -z-20 animate-pulse duration-1000" />
        <div className="fixed bottom-[-10%] left-[-10%] h-[45vw] w-[45vw] rounded-full bg-linear-to-tr from-indigo-600/10 via-purple-600/10 to-transparent blur-[140px] pointer-events-none -z-20" />
        <div className="fixed top-[35%] left-[25%] h-75 w-75 rounded-full bg-fuchsia-500/5 blur-[120px] pointer-events-none -z-20" />



        {/* Global Structural Layout Wrapper */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  relative z-10">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
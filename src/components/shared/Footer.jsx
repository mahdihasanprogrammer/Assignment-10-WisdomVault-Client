import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6"; // FaXTwitter আমদানি করা হয়েছে
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebookF, href: "https://www.facebook.com/hasan.shardar.1", label: "Facebook" },
    { icon: FaXTwitter, href: "https://x.com", label: "X (Twitter)" }, // নতুন X লোগো
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/mahdi-hasan-web", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/mahdihasanprogrammer", label: "GitHub" },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Lessons", href: "/public-lessons" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="w-full bg-[#080418] border-t border-white/10 text-white pt-16 pb-8 px-4 md:px-8 lg:px-16 mt-auto">
      {/* Top Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <LuSparkles className="text-white w-4 h-4 animate-pulse" />
            </div>
            <span className="font-black text-xl tracking-wide">
              Wisdom<span className="text-purple-400">Vault</span>
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Unlock the gateway to interactive learning and wisdom. Secure, scalable, and tailored for global learners.
          </p>
          {/* Social Icons Row */}
          <div className="flex items-center gap-3 mt-2">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-purple-400 hover:bg-white/10 border-transparent hover:border-white/20 transition-all duration-200 active:scale-95"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400">Quick Explore</h3>
          <ul className="flex flex-col gap-2.5 text-sm font-medium text-white/60">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-white transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400">Contact Us</h3>
          <ul className="flex flex-col gap-3.5 text-sm font-medium text-white/60">
            <li className="flex items-center gap-3">
              <FiMail className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <a href="mailto:support@wisdomvault.com" className="hover:text-white truncate">
                support@wisdomvault.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <a href="tel:+8801234567890" className="hover:text-white">
                +880 1234-567890
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FiMapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* Newsletter/Meta Column (Optional but makes it 4 columns grid look pro) */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400">Our Vision</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            Empowering curious minds by archiving lessons, notes, and expert-curated modules under a modern unified dashboard.
          </p>
        </div>

      </div>

      {/* Bottom Legal & Copyright Area */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/40 font-medium">
          &copy; {currentYear} WisdomVault. All rights reserved.
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-white/40">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="hover:text-purple-400 transition-colors duration-200">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { 
    icon: FaGithub, 
    href: "https://github.com/garv-svnitcse", 
    label: "GitHub" 
  },
  { 
    icon: FaLinkedin, 
    href: "#", // Replace with your LinkedIn profile link when ready
    label: "LinkedIn" 
  },
  { 
    icon: Mail, 
    href: "mailto:garv.agarwal2409@gmail.com", 
    label: "Email" 
  },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-slate-950 border-t border-white/10 text-white relative overflow-hidden">
      {/* Subtle bottom glow effect to match your premium theme */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[50px] bg-gradient-to-r from-[#1cd8d2]/10 via-[#00bf8f]/10 to-[#302b63]/10 blur-[40px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo, Terminal Branding & Copyright */}
          <div className="text-center md:text-left space-y-1">
            <a href="#" className="text-xl font-bold tracking-tight font-mono hover:text-[#1cd8d2] transition-colors">
              garv<span className="text-[#00bf8f]">.</span>log
            </a>
            <p className="text-xs text-slate-400">
              © {currentYear} Garv Agarwal. All rights reserved.
            </p>
          </div>

          {/* Core Section Links */}
          <nav className="flex flex-wrap justify-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 hover:text-[#1cd8d2] transition-colors relative font-medium group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00bf8f] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Social Profiles & Mail Actions */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 rounded-xl border border-white/5 bg-slate-900/60 text-slate-400 hover:text-[#00bf8f] hover:border-[#00bf8f]/30 hover:scale-105 transition-all duration-200"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};
export default Footer
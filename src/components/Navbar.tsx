import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import {
  Home,
  Users,
  Compass,
  Heart,
  MessageCircle,
  Bell,
  Menu,
  X,
  Gift,
  User,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/matching", label: "Community", icon: Users },
  { to: "/compass", label: "Compass", icon: Compass },
  { to: "/tracker", label: "Wellness", icon: Heart },
  { to: "/home-link", label: "Care", icon: Gift },
  { to: "/messages", label: "Messages", icon: MessageCircle },
];

export function Navbar() {
  const location = useLocation();
  const user = useUserStore((s) => s.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-sand/60">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-red rounded-lg flex items-center justify-center">
              <Home className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-heading text-lg font-bold text-charcoal tracking-tight">
              HomeBase
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    isActive
                      ? "bg-red text-white"
                      : "text-warmgray hover:text-charcoal hover:bg-cream"
                  }`}
                >
                  <link.icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-warmgray hover:text-charcoal transition-colors">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red rounded-full" />
            </button>
            <Link to="/profile">
              <div className="w-8 h-8 bg-gradient-to-br from-red to-red-dark rounded-full flex items-center justify-center text-white text-[11px] font-bold ring-2 ring-sand/60 ring-offset-1">
                {user.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "?"}
              </div>
            </Link>
            <button
              className="md:hidden p-1.5 text-warmgray"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-sand/40"
          >
            <div className="px-4 py-2 space-y-0.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium ${
                      isActive
                        ? "bg-red/10 text-red"
                        : "text-warmgray hover:bg-cream"
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

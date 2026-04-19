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
      <div className="max-w-[430px] mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <Link to="/dashboard" className="flex items-center gap-1.5">
            <div className="w-6 h-6 bg-red rounded-md flex items-center justify-center">
              <Home className="w-3 h-3 text-white" />
            </div>
            <span className="font-heading text-[15px] font-bold text-charcoal tracking-tight">
              HomeBase
            </span>
          </Link>

          {/* Desktop nav — hidden on small, shown on md+ */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium transition-all ${
                    isActive
                      ? "bg-red text-white"
                      : "text-warmgray hover:text-charcoal"
                  }`}
                >
                  <link.icon className="w-3 h-3" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <button className="relative p-1.5 text-warmgray hover:text-charcoal">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red rounded-full" />
            </button>
            <Link to="/profile">
              <div className="w-7 h-7 bg-gradient-to-br from-red to-red-dark rounded-full flex items-center justify-center text-white text-[9px] font-bold ring-2 ring-sand/50 ring-offset-1">
                {user.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "?"}
              </div>
            </Link>
            <button
              className="md:hidden p-1 text-warmgray"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-sand/40"
          >
            <div className="max-w-[430px] mx-auto px-4 py-1.5 space-y-0.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium ${
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

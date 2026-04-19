import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import {
  MapPin,
  Edit3,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  Award,
  Home,
} from "lucide-react";

export default function Profile() {
  const { user, resetUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    resetUser();
    navigate("/onboarding");
  };

  const menuItems = [
    {
      icon: Bell,
      label: "Notifications",
      desc: "Manage alerts and reminders",
    },
    {
      icon: Shield,
      label: "Privacy & Parental Control",
      desc: "Sharing settings and family access",
    },
    {
      icon: HelpCircle,
      label: "Support",
      desc: "Help center and feedback",
    },
  ];

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto px-5 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red to-red-dark flex items-center justify-center text-white font-bold text-2xl ring-4 ring-white shadow-lg mb-4">
            {user.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "?"}
          </div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">
            {user.name || "Your Name"}
          </h1>
          <p className="text-warmgray text-sm mt-0.5">{user.university}</p>
        </motion.div>

        {/* My Home Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-sand/60 p-5 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-red" />
              <h2 className="font-heading text-base font-semibold text-charcoal">
                My Home
              </h2>
            </div>
            <button className="text-red text-xs font-medium flex items-center gap-0.5 hover:underline">
              <Edit3 className="w-3 h-3" /> Edit Home Base
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-red" />
            </div>
            <div>
              <p className="font-medium text-sm text-charcoal">
                {user.homeState || "Not set"}
              </p>
              <p className="text-xs text-warmgray">Home State</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-cream/60 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-charcoal">1,200</p>
              <p className="text-[10px] text-warmgray">Points</p>
            </div>
            <div className="bg-cream/60 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 text-red" />
                <p className="text-lg font-bold text-charcoal">12</p>
              </div>
              <p className="text-[10px] text-warmgray">Day Streak</p>
            </div>
            <div className="bg-cream/60 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <Award className="w-3.5 h-3.5 text-red" />
                <p className="text-lg font-bold text-charcoal">5</p>
              </div>
              <p className="text-[10px] text-warmgray">Connections</p>
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-sand/60 p-5 mb-4"
        >
          <h3 className="font-heading text-base font-semibold text-charcoal mb-3">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.length > 0 ? (
              user.interests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs bg-red/8 text-red px-3 py-1 rounded-full font-medium capitalize"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-sm text-warmgray">No interests set</p>
            )}
          </div>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-sand/60 divide-y divide-sand/40 mb-4"
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-cream/40 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div className="w-9 h-9 rounded-xl bg-cream/80 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-warmgray" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-charcoal">
                  {item.label}
                </p>
                <p className="text-[11px] text-warmgray">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-warmgray-light shrink-0" />
            </button>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 text-red text-sm font-medium hover:bg-red/5 rounded-2xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
}

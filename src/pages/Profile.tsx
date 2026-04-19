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
    { icon: Bell, label: "Notifications", desc: "Alerts and reminders" },
    { icon: Shield, label: "Privacy & Parental Control", desc: "Sharing and family access" },
    { icon: HelpCircle, label: "Support", desc: "Help center and feedback" },
  ];

  return (
    <PageTransition>
      <div className="max-w-[430px] mx-auto px-4 py-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red to-red-dark flex items-center justify-center text-white font-bold text-xl ring-4 ring-white shadow-lg mb-3">
            {user.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "?"}
          </div>
          <h1 className="font-heading text-xl font-bold text-charcoal">
            {user.name || "Your Name"}
          </h1>
          <p className="text-warmgray text-xs mt-0.5">{user.university}</p>
        </motion.div>

        {/* My Home */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="bg-white rounded-2xl border border-sand/60 p-4 mb-3"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-red" />
              <h2 className="font-heading text-sm font-semibold text-charcoal">
                My Home
              </h2>
            </div>
            <button className="text-red text-[10px] font-medium flex items-center gap-0.5">
              <Edit3 className="w-2.5 h-2.5" /> Edit Home Base
            </button>
          </div>

          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-red" />
            </div>
            <div>
              <p className="font-medium text-xs text-charcoal">
                {user.homeState || "Not set"}
              </p>
              <p className="text-[10px] text-warmgray">Home State</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-cream/60 rounded-xl p-2.5 text-center">
              <p className="text-base font-bold text-charcoal">1,200</p>
              <p className="text-[9px] text-warmgray">Points</p>
            </div>
            <div className="bg-cream/60 rounded-xl p-2.5 text-center">
              <div className="flex items-center justify-center gap-0.5">
                <Star className="w-3 h-3 text-red" />
                <p className="text-base font-bold text-charcoal">12</p>
              </div>
              <p className="text-[9px] text-warmgray">Streak</p>
            </div>
            <div className="bg-cream/60 rounded-xl p-2.5 text-center">
              <div className="flex items-center justify-center gap-0.5">
                <Award className="w-3 h-3 text-red" />
                <p className="text-base font-bold text-charcoal">5</p>
              </div>
              <p className="text-[9px] text-warmgray">Connections</p>
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white rounded-2xl border border-sand/60 p-4 mb-3"
        >
          <h3 className="font-heading text-sm font-semibold text-charcoal mb-2.5">
            Interests
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {user.interests.length > 0 ? (
              user.interests.map((interest) => (
                <span
                  key={interest}
                  className="text-[10px] bg-red/8 text-red px-2.5 py-1 rounded-full font-medium capitalize"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-xs text-warmgray">No interests set</p>
            )}
          </div>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="bg-white rounded-2xl border border-sand/60 divide-y divide-sand/30 mb-4"
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-cream/30 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div className="w-8 h-8 rounded-lg bg-cream/80 flex items-center justify-center shrink-0">
                <item.icon className="w-3.5 h-3.5 text-warmgray" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs text-charcoal">
                  {item.label}
                </p>
                <p className="text-[10px] text-warmgray">{item.desc}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-warmgray-light shrink-0" />
            </button>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 text-red text-xs font-medium hover:bg-red/5 rounded-2xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
}

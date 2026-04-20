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
    { icon: Bell, label: "Notifications", desc: "Manage alerts and reminders" },
    { icon: Shield, label: "Privacy & Parental Control", desc: "Sharing settings and family access" },
    { icon: HelpCircle, label: "Support", desc: "Help center and feedback" },
  ];

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-8 py-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red to-red-dark flex items-center justify-center text-white font-bold text-3xl ring-4 ring-white shadow-xl mb-5">
            {user.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "?"}
          </div>
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            {user.name || "Your Name"}
          </h1>
          <p className="text-warmgray text-base mt-1">{user.university}</p>
        </motion.div>

        {/* My Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-sand/60 p-6 mb-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-red" />
              <h2 className="font-heading text-lg font-semibold text-charcoal">
                My Home
              </h2>
            </div>
            <button className="text-red text-sm font-medium flex items-center gap-1 hover:underline">
              <Edit3 className="w-4 h-4" /> Edit Home Base
            </button>
          </div>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-red/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-red" />
            </div>
            <div>
              <p className="font-medium text-base text-charcoal">
                {user.homeState || "Not set"}
              </p>
              <p className="text-sm text-warmgray">Home State</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-cream/60 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-charcoal">1,200</p>
              <p className="text-sm text-warmgray">Points</p>
            </div>
            <div className="bg-cream/60 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-red" />
                <p className="text-2xl font-bold text-charcoal">12</p>
              </div>
              <p className="text-sm text-warmgray">Day Streak</p>
            </div>
            <div className="bg-cream/60 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <Award className="w-4 h-4 text-red" />
                <p className="text-2xl font-bold text-charcoal">5</p>
              </div>
              <p className="text-sm text-warmgray">Connections</p>
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-sand/60 p-6 mb-5"
        >
          <h3 className="font-heading text-lg font-semibold text-charcoal mb-4">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.length > 0 ? (
              user.interests.map((interest) => (
                <span
                  key={interest}
                  className="text-sm bg-red/10 text-red px-4 py-1.5 rounded-full font-medium capitalize"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-base text-warmgray">No interests set</p>
            )}
          </div>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-sand/60 divide-y divide-sand/30 mb-6"
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-cream/30 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div className="w-11 h-11 rounded-xl bg-cream/80 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-warmgray" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-base text-charcoal">
                  {item.label}
                </p>
                <p className="text-sm text-warmgray">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-warmgray-light shrink-0" />
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
            className="w-full flex items-center justify-center gap-2 py-3 text-red text-base font-medium hover:bg-red/5 rounded-2xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
}

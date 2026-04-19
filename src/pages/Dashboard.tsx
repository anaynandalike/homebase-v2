import { Link } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Plane,
  MapPin,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { students } from "@/data/students";
import { conversations } from "@/data/messages";
import { familyNotes } from "@/data/familyNotes";

const familyMembers = [
  { name: "Mom", initials: "M", color: "from-red to-red-dark" },
  { name: "Dad", initials: "D", color: "from-charcoal to-warmgray" },
  { name: "Sister", initials: "S", color: "from-red-light to-red" },
];

export default function Dashboard() {
  const user = useUserStore((s) => s.user);
  const nearbyStudents = students.slice(0, 6);
  const mentors = students.filter((s) => s.isMentor);

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-5 py-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-warmgray text-sm mb-1">Welcome back,</p>
          <h1 className="font-heading text-[2.2rem] leading-tight font-bold text-charcoal">
            to the hearth.
          </h1>
        </motion.div>

        {/* Family Care Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              Family Care
            </h2>
            <Link
              to="/home-link"
              className="text-red text-xs font-medium flex items-center gap-0.5 hover:underline"
            >
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {familyMembers.map((member, i) => (
              <Link
                to="/home-link"
                key={member.name}
                className="flex flex-col items-center gap-2 shrink-0"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg ring-2 ring-white shadow-sm`}
                >
                  {member.initials}
                </div>
                <span className="text-xs text-warmgray font-medium">
                  {member.name}
                </span>
              </Link>
            ))}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-sand flex items-center justify-center text-warmgray-light">
                <span className="text-2xl">+</span>
              </div>
              <span className="text-xs text-warmgray-light">Add</span>
            </div>
          </div>
        </motion.div>

        {/* Travel / Next Trip Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-red rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">
                    Next Trip Home
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold font-heading">
                        {user.homeState === "California"
                          ? "SFO"
                          : user.homeState === "New York"
                          ? "JFK"
                          : user.homeState === "Texas"
                          ? "IAH"
                          : "ORD"}
                      </p>
                      <p className="text-[10px] text-white/60">Campus</p>
                    </div>
                    <div className="flex items-center gap-1 text-white/40">
                      <div className="w-8 h-px bg-white/30" />
                      <Plane className="w-4 h-4 rotate-0" />
                      <div className="w-8 h-px bg-white/30" />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold font-heading">
                        {user.homeState === "California"
                          ? "LAX"
                          : user.homeState === "New York"
                          ? "LGA"
                          : user.homeState === "Texas"
                          ? "DFW"
                          : "JFK"}
                      </p>
                      <p className="text-[10px] text-white/60">Home</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs">Dec 15</p>
                  <p className="text-white/80 text-xs">Winter Break</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/matching"
                  className="bg-white text-red text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
                >
                  Find Ride
                </Link>
                <span className="text-white/50 text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> 3 students heading your way
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Nearby Community */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              Nearby Community
            </h2>
            <Link
              to="/matching"
              className="text-red text-xs font-medium flex items-center gap-0.5 hover:underline"
            >
              Show All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {nearbyStudents.map((student) => (
              <Link
                to="/matching"
                key={student.id}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sand to-cream-dark flex items-center justify-center text-charcoal font-bold text-sm ring-2 ring-white shadow-sm group-hover:ring-red/30 transition-all">
                  {student.avatar}
                </div>
                <span className="text-xs text-warmgray font-medium text-center leading-tight">
                  {student.name.split(" ")[0]}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Threads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              Recent Threads
            </h2>
            <Link
              to="/messages"
              className="text-red text-xs font-medium flex items-center gap-0.5 hover:underline"
            >
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-sand/60 divide-y divide-sand/40">
            {conversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              return (
                <Link
                  key={conv.id}
                  to="/messages"
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-cream/40 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sand to-cream-dark flex items-center justify-center text-charcoal text-xs font-bold shrink-0">
                    {conv.participantAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-charcoal">
                      {conv.participantName}
                    </p>
                    <p className="text-xs text-warmgray truncate">
                      {lastMsg.text}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] text-warmgray-light">
                      {conv.lastActive}
                    </span>
                    <MessageCircle className="w-3.5 h-3.5 text-warmgray-light" />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Kinship Mentors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-charcoal">
              Kinship Mentors
            </h2>
            <Link
              to="/matching"
              className="text-red text-xs font-medium flex items-center gap-0.5 hover:underline"
            >
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {mentors.slice(0, 2).map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-2xl border border-sand/60 p-4 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red/20 to-sand flex items-center justify-center text-charcoal font-bold shrink-0">
                  {mentor.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm text-charcoal">
                      {mentor.name}
                    </p>
                    <span className="text-[10px] bg-red/10 text-red px-2 py-0.5 rounded-full font-medium">
                      Mentor
                    </span>
                  </div>
                  <p className="text-xs text-warmgray">
                    {mentor.year} · {mentor.homeState}
                  </p>
                  <p className="text-xs text-warmgray mt-1 line-clamp-1">
                    {mentor.bio}
                  </p>
                </div>
                <Link
                  to="/matching"
                  className="shrink-0 w-8 h-8 rounded-full bg-red/10 flex items-center justify-center text-red hover:bg-red/20 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

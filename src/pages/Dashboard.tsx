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
      <div className="max-w-[430px] mx-auto px-4 py-5">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <p className="text-warmgray text-xs mb-0.5">Welcome back,</p>
          <h1 className="font-heading text-[1.75rem] leading-tight font-bold text-charcoal">
            to the hearth.
          </h1>
        </motion.div>

        {/* Family Care */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
          className="mb-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-sm font-semibold text-charcoal">
              Family Care
            </h2>
            <Link
              to="/home-link"
              className="text-red text-[10px] font-medium flex items-center gap-0.5"
            >
              View All <ChevronRight className="w-2.5 h-2.5" />
            </Link>
          </div>
          <div className="flex gap-4">
            {familyMembers.map((member) => (
              <Link
                to="/home-link"
                key={member.name}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-sm ring-2 ring-white shadow-sm`}
                >
                  {member.initials}
                </div>
                <span className="text-[10px] text-warmgray font-medium">
                  {member.name}
                </span>
              </Link>
            ))}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-sand flex items-center justify-center text-warmgray-light">
                <span className="text-xl leading-none">+</span>
              </div>
              <span className="text-[10px] text-warmgray-light">Add</span>
            </div>
          </div>
        </motion.div>

        {/* Travel Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mb-5"
        >
          <div className="bg-red rounded-2xl p-4 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="relative">
              <p className="text-white/60 text-[9px] font-semibold uppercase tracking-widest mb-2">
                Next Trip Home
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-center">
                  <p className="text-xl font-bold font-heading leading-none">ORD</p>
                  <p className="text-[8px] text-white/50 mt-0.5">Campus</p>
                </div>
                <div className="flex items-center gap-1 text-white/30">
                  <div className="w-6 h-px bg-white/25" />
                  <Plane className="w-3.5 h-3.5" />
                  <div className="w-6 h-px bg-white/25" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold font-heading leading-none">JFK</p>
                  <p className="text-[8px] text-white/50 mt-0.5">Home</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-white/60 text-[10px]">Dec 15</p>
                  <p className="text-white/80 text-[10px]">Winter Break</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/matching"
                  className="bg-white text-red text-[10px] font-bold px-3.5 py-1.5 rounded-full"
                >
                  Find Ride
                </Link>
                <span className="text-white/40 text-[10px] flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" /> 3 students nearby
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Nearby Community */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mb-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-sm font-semibold text-charcoal">
              Nearby Community
            </h2>
            <Link
              to="/matching"
              className="text-red text-[10px] font-medium flex items-center gap-0.5"
            >
              Show All <ChevronRight className="w-2.5 h-2.5" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-3">
            {nearbyStudents.map((student) => (
              <Link
                to="/matching"
                key={student.id}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sand to-cream-dark flex items-center justify-center text-charcoal font-bold text-xs ring-2 ring-white shadow-sm group-hover:ring-red/30 transition-all">
                  {student.avatar}
                </div>
                <span className="text-[10px] text-warmgray font-medium text-center leading-tight">
                  {student.name.split(" ")[0]}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Threads */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mb-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-sm font-semibold text-charcoal">
              Recent Threads
            </h2>
            <Link
              to="/messages"
              className="text-red text-[10px] font-medium flex items-center gap-0.5"
            >
              View All <ChevronRight className="w-2.5 h-2.5" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl border border-sand/60 divide-y divide-sand/30">
            {conversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              return (
                <Link
                  key={conv.id}
                  to="/messages"
                  className="flex items-center gap-3 px-3.5 py-3 hover:bg-cream/30 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sand to-cream-dark flex items-center justify-center text-charcoal text-[10px] font-bold shrink-0">
                    {conv.participantAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs text-charcoal">
                      {conv.participantName}
                    </p>
                    <p className="text-[10px] text-warmgray truncate">
                      {lastMsg.text}
                    </p>
                  </div>
                  <span className="text-[9px] text-warmgray-light shrink-0">
                    {conv.lastActive}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Kinship Mentors */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-heading text-sm font-semibold text-charcoal mb-3">
            Kinship Mentors
          </h2>
          <div className="space-y-2.5">
            {mentors.slice(0, 2).map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-2xl border border-sand/60 p-3.5 flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red/15 to-sand flex items-center justify-center text-charcoal font-bold text-xs shrink-0 ring-2 ring-white shadow-sm">
                  {mentor.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="font-semibold text-xs text-charcoal">
                      {mentor.name}
                    </p>
                    <span className="text-[8px] bg-red/10 text-red px-1.5 py-0.5 rounded-full font-semibold">
                      Mentor
                    </span>
                  </div>
                  <p className="text-[10px] text-warmgray">
                    {mentor.year} · {mentor.homeState}
                  </p>
                </div>
                <Link
                  to="/matching"
                  className="shrink-0 w-7 h-7 rounded-full bg-red/10 flex items-center justify-center text-red"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}

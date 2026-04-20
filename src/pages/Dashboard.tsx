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
      <div className="px-8 py-10">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-warmgray text-base mb-1">Welcome back,</p>
          <h1 className="font-heading text-5xl leading-tight font-bold text-charcoal">
            to the hearth.
          </h1>
        </motion.div>

        {/* Top Row: Family Care + Travel Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Family Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-xl font-semibold text-charcoal">
                Family Care
              </h2>
              <Link
                to="/home-link"
                className="text-red text-sm font-medium flex items-center gap-1 hover:underline"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex gap-6">
              {familyMembers.map((member) => (
                <Link
                  to="/home-link"
                  key={member.name}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl ring-3 ring-white shadow-md hover:scale-105 transition-transform`}
                  >
                    {member.initials}
                  </div>
                  <span className="text-sm text-warmgray font-medium">
                    {member.name}
                  </span>
                </Link>
              ))}
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-sand flex items-center justify-center text-warmgray-light hover:border-red/30 transition-colors cursor-pointer">
                  <span className="text-3xl leading-none">+</span>
                </div>
                <span className="text-sm text-warmgray-light">Add</span>
              </div>
            </div>
          </motion.div>

          {/* Travel Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-red rounded-3xl p-8 text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="relative">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
                  Next Trip Home
                </p>
                <div className="flex items-center gap-6 mb-5">
                  <div className="text-center">
                    <p className="text-4xl font-bold font-heading leading-none">ORD</p>
                    <p className="text-xs text-white/50 mt-1">Campus</p>
                  </div>
                  <div className="flex items-center gap-2 text-white/30">
                    <div className="w-12 h-px bg-white/25" />
                    <Plane className="w-5 h-5" />
                    <div className="w-12 h-px bg-white/25" />
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold font-heading leading-none">JFK</p>
                    <p className="text-xs text-white/50 mt-1">Home</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-white/60 text-sm">Dec 15</p>
                    <p className="text-white/80 text-sm">Winter Break</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    to="/matching"
                    className="bg-white text-red text-sm font-bold px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors"
                  >
                    Find Ride
                  </Link>
                  <span className="text-white/40 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> 3 students heading your way
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Nearby Community */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-xl font-semibold text-charcoal">
              Nearby Community
            </h2>
            <Link
              to="/matching"
              className="text-red text-sm font-medium flex items-center gap-1 hover:underline"
            >
              Show All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
            {nearbyStudents.map((student) => (
              <Link
                to="/matching"
                key={student.id}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sand to-cream-dark flex items-center justify-center text-charcoal font-bold text-base ring-3 ring-white shadow-md group-hover:ring-red/30 transition-all">
                  {student.avatar}
                </div>
                <span className="text-sm text-warmgray font-medium text-center">
                  {student.name.split(" ")[0]}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Bottom Row: Recent Threads + Kinship Mentors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Threads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-xl font-semibold text-charcoal">
                Recent Threads
              </h2>
              <Link
                to="/messages"
                className="text-red text-sm font-medium flex items-center gap-1 hover:underline"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-sand/60 divide-y divide-sand/30">
              {conversations.map((conv) => {
                const lastMsg = conv.messages[conv.messages.length - 1];
                return (
                  <Link
                    key={conv.id}
                    to="/messages"
                    className="flex items-center gap-4 px-5 py-4 hover:bg-cream/30 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sand to-cream-dark flex items-center justify-center text-charcoal text-sm font-bold shrink-0">
                      {conv.participantAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-charcoal">
                        {conv.participantName}
                      </p>
                      <p className="text-sm text-warmgray truncate">
                        {lastMsg.text}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs text-warmgray-light">
                        {conv.lastActive}
                      </span>
                      <MessageCircle className="w-4 h-4 text-warmgray-light" />
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
            <h2 className="font-heading text-xl font-semibold text-charcoal mb-5">
              Kinship Mentors
            </h2>
            <div className="space-y-4">
              {mentors.slice(0, 2).map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-white rounded-2xl border border-sand/60 p-5 flex items-center gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red/15 to-sand flex items-center justify-center text-charcoal font-bold text-base shrink-0 ring-3 ring-white shadow-sm">
                    {mentor.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-base text-charcoal">
                        {mentor.name}
                      </p>
                      <span className="text-xs bg-red/10 text-red px-2.5 py-0.5 rounded-full font-semibold">
                        Mentor
                      </span>
                    </div>
                    <p className="text-sm text-warmgray">
                      {mentor.year} · {mentor.homeState}
                    </p>
                    <p className="text-sm text-warmgray mt-1 line-clamp-1">
                      {mentor.bio}
                    </p>
                  </div>
                  <Link
                    to="/matching"
                    className="shrink-0 w-10 h-10 rounded-full bg-red/10 flex items-center justify-center text-red hover:bg-red/20 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

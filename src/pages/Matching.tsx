import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { EmptyState } from "@/components/EmptyState";
import { students, type Student } from "@/data/students";
import { useUserStore } from "@/store/userStore";
import { useMessageStore } from "@/store/messageStore";
import { useToastStore } from "@/store/toastStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Car,
  Award,
  X,
  Send,
  UserPlus,
  Users,
  ArrowRight,
} from "lucide-react";

const icebreakerPrompts = [
  "If you could teleport home for just one hour, what would you do first?",
  "What's the one thing about your home state that surprises people?",
  "What comfort food from home do you wish you could find here?",
];

export default function Matching() {
  const user = useUserStore((s) => s.user);
  const { connectedStudents, connectStudent } = useMessageStore();
  const addToast = useToastStore((s) => s.addToast);

  const [tab, setTab] = useState<"all" | "mentors" | "travel">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [homeStateOnly, setHomeStateOnly] = useState(false);
  const [icebreakerModal, setIcebreakerModal] = useState<Student | null>(null);

  let filtered = students.filter((s) => {
    if (tab === "mentors") return s.isMentor;
    if (tab === "travel") return !!s.travelDates;
    return true;
  });

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.homeState.toLowerCase().includes(q)
    );
  }

  if (homeStateOnly && user.homeState)
    filtered = filtered.filter((s) => s.homeState === user.homeState);

  const mentors = students.filter((s) => s.isMentor);
  const regularStudents = filtered.filter((s) => !s.isMentor || tab !== "all");

  const sharedInterests = (student: Student) =>
    student.interests.filter((i) => user.interests.includes(i));

  return (
    <PageTransition>
      <div className="px-8 py-10">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            Community
          </h1>
          <p className="text-warmgray text-base mt-1">
            Find your people, build your circle
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warmgray-light" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or state..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-sand bg-white text-base focus:outline-none focus:ring-2 focus:ring-red/20 focus:border-red/40"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-8">
          {[
            { id: "all" as const, label: "All" },
            { id: "mentors" as const, label: "Mentors" },
            { id: "travel" as const, label: "Travel" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-red text-white"
                  : "bg-white border border-sand text-warmgray hover:text-charcoal"
              }`}
            >
              {t.label}
            </button>
          ))}
          <label className="flex items-center gap-2 ml-auto px-4 py-2 text-sm text-warmgray cursor-pointer">
            <input
              type="checkbox"
              checked={homeStateOnly}
              onChange={(e) => setHomeStateOnly(e.target.checked)}
              className="accent-red w-4 h-4"
            />
            <MapPin className="w-4 h-4 text-red" />
            My State Only
          </label>
        </div>

        {/* Student Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users className="w-10 h-10" />}
            title="No matches found"
            description="Try adjusting your filters to find more students."
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {(tab === "all" ? regularStudents : filtered).map((student, i) => {
              const shared = sharedInterests(student);
              const isConnected = connectedStudents.includes(student.id);
              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-3">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sand to-cream-dark flex items-center justify-center text-charcoal font-bold text-lg ring-3 ring-white shadow-lg group-hover:ring-red/30 transition-all">
                      {student.avatar}
                    </div>
                    {student.isMentor && (
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-red rounded-full flex items-center justify-center ring-2 ring-white">
                        <Award className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>

                  <p className="font-semibold text-base text-charcoal mb-0.5">
                    {student.name}
                  </p>
                  <p className="text-sm text-warmgray mb-2">
                    {student.homeState} · {student.year}
                  </p>

                  {shared.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1 mb-2">
                      {shared.slice(0, 2).map((interest) => (
                        <span
                          key={interest}
                          className="text-xs bg-red/10 text-red px-2 py-0.5 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}

                  {tab === "travel" && student.travelDates && (
                    <p className="text-xs text-warmgray mb-2">
                      {student.travelDates.departure} → {student.travelDates.destination}
                    </p>
                  )}

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => setIcebreakerModal(student)}
                      className="w-9 h-9 rounded-full bg-red/10 flex items-center justify-center text-red hover:bg-red/20 transition-colors"
                      title="Send Icebreaker"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                    {tab === "travel" && student.travelDates ? (
                      <button
                        onClick={() => addToast("Rideshare request sent!")}
                        className="w-9 h-9 rounded-full bg-charcoal flex items-center justify-center text-white hover:bg-charcoal/80 transition-colors"
                      >
                        <Car className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (!isConnected) {
                            connectStudent(student.id);
                            addToast(`Connected with ${student.name}!`);
                          }
                        }}
                        disabled={isConnected}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          isConnected
                            ? "bg-sage/20 text-forest"
                            : "bg-charcoal text-white hover:bg-charcoal/80"
                        }`}
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Kinship Mentors */}
        {tab === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-heading text-xl font-semibold text-charcoal mb-5">
              Kinship Mentors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mentors.map((mentor) => {
                const isConnected = connectedStudents.includes(mentor.id);
                return (
                  <div
                    key={mentor.id}
                    className="bg-white rounded-2xl border border-sand/60 p-5 flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red/15 to-sand flex items-center justify-center text-charcoal font-bold text-sm shrink-0 ring-2 ring-white shadow-sm">
                      {mentor.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-sm text-charcoal">
                          {mentor.name}
                        </p>
                        <span className="text-xs bg-red/10 text-red px-2 py-0.5 rounded-full font-semibold">
                          Mentor
                        </span>
                      </div>
                      <p className="text-sm text-warmgray">
                        {mentor.year} · {mentor.homeState}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setIcebreakerModal(mentor)}
                        className="w-9 h-9 rounded-full bg-red/10 flex items-center justify-center text-red hover:bg-red/20 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (!isConnected) {
                            connectStudent(mentor.id);
                            addToast(`Connected with ${mentor.name}!`);
                          }
                        }}
                        disabled={isConnected}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          isConnected
                            ? "bg-sage/20 text-forest"
                            : "bg-red text-white hover:bg-red-dark"
                        }`}
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Icebreaker Modal */}
      <AnimatePresence>
        {icebreakerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
            onClick={() => setIcebreakerModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading text-xl font-semibold text-charcoal">
                  Send an Icebreaker
                </h3>
                <button
                  onClick={() => setIcebreakerModal(null)}
                  className="text-warmgray hover:text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-warmgray text-sm mb-5">
                Choose a prompt for <strong>{icebreakerModal.name}</strong>:
              </p>
              <div className="space-y-3">
                {icebreakerPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      addToast(`Icebreaker sent to ${icebreakerModal.name}!`);
                      setIcebreakerModal(null);
                    }}
                    className="w-full text-left p-4 rounded-xl border border-sand hover:border-red/40 hover:bg-red/5 text-sm text-charcoal transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

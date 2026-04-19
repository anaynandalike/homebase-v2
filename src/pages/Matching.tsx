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
      <div className="max-w-[430px] mx-auto px-4 py-5">
        {/* Header */}
        <div className="mb-4">
          <h1 className="font-heading text-xl font-bold text-charcoal">
            Community
          </h1>
          <p className="text-warmgray text-[11px] mt-0.5">
            Find your people, build your circle
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warmgray-light" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or state..."
            className="w-full pl-9 pr-3 py-2 rounded-full border border-sand bg-white text-xs focus:outline-none focus:ring-2 focus:ring-red/20 focus:border-red/40"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 mb-5">
          {[
            { id: "all" as const, label: "All" },
            { id: "mentors" as const, label: "Mentors" },
            { id: "travel" as const, label: "Travel" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                tab === t.id
                  ? "bg-red text-white"
                  : "bg-white border border-sand text-warmgray"
              }`}
            >
              {t.label}
            </button>
          ))}
          <label className="flex items-center gap-1 ml-auto text-[10px] text-warmgray cursor-pointer">
            <input
              type="checkbox"
              checked={homeStateOnly}
              onChange={(e) => setHomeStateOnly(e.target.checked)}
              className="accent-red w-3 h-3"
            />
            <MapPin className="w-2.5 h-2.5 text-red" />
            My State
          </label>
        </div>

        {/* Student Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users className="w-7 h-7" />}
            title="No matches found"
            description="Try adjusting your filters."
          />
        ) : (
          <div className="grid grid-cols-3 gap-x-4 gap-y-5 mb-8">
            {(tab === "all" ? regularStudents : filtered).map((student, i) => {
              const shared = sharedInterests(student);
              const isConnected = connectedStudents.includes(student.id);
              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-1.5">
                    <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-br from-sand to-cream-dark flex items-center justify-center text-charcoal font-bold text-sm ring-2 ring-white shadow-md group-hover:ring-red/30 transition-all">
                      {student.avatar}
                    </div>
                    {student.isMentor && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-red rounded-full flex items-center justify-center ring-2 ring-white">
                        <Award className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>

                  <p className="font-semibold text-[11px] text-charcoal leading-tight">
                    {student.name}
                  </p>
                  <p className="text-[9px] text-warmgray mb-1.5">
                    {student.homeState}
                  </p>

                  {shared.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-0.5 mb-1.5">
                      {shared.slice(0, 2).map((interest) => (
                        <span
                          key={interest}
                          className="text-[8px] bg-red/8 text-red px-1.5 py-0.5 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}

                  {tab === "travel" && student.travelDates && (
                    <p className="text-[8px] text-warmgray mb-1.5 leading-tight">
                      {student.travelDates.departure}
                    </p>
                  )}

                  <div className="flex gap-1">
                    <button
                      onClick={() => setIcebreakerModal(student)}
                      className="w-6 h-6 rounded-full bg-red/10 flex items-center justify-center text-red hover:bg-red/20 transition-colors"
                    >
                      <Send className="w-2.5 h-2.5" />
                    </button>
                    {tab === "travel" && student.travelDates ? (
                      <button
                        onClick={() => addToast("Rideshare request sent!")}
                        className="w-6 h-6 rounded-full bg-charcoal flex items-center justify-center text-white"
                      >
                        <Car className="w-2.5 h-2.5" />
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
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          isConnected
                            ? "bg-sage/20 text-forest"
                            : "bg-charcoal text-white hover:bg-charcoal/80"
                        }`}
                      >
                        <UserPlus className="w-2.5 h-2.5" />
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-heading text-sm font-semibold text-charcoal mb-3">
              Kinship Mentors
            </h2>
            <div className="space-y-2.5">
              {mentors.map((mentor) => {
                const isConnected = connectedStudents.includes(mentor.id);
                return (
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
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => setIcebreakerModal(mentor)}
                        className="w-7 h-7 rounded-full bg-red/10 flex items-center justify-center text-red"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          if (!isConnected) {
                            connectStudent(mentor.id);
                            addToast(`Connected with ${mentor.name}!`);
                          }
                        }}
                        disabled={isConnected}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                          isConnected
                            ? "bg-sage/20 text-forest"
                            : "bg-red text-white hover:bg-red-dark"
                        }`}
                      >
                        <UserPlus className="w-3 h-3" />
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
            className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4"
            onClick={() => setIcebreakerModal(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-5 max-w-[400px] w-full shadow-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-base font-semibold text-charcoal">
                  Send an Icebreaker
                </h3>
                <button
                  onClick={() => setIcebreakerModal(null)}
                  className="text-warmgray hover:text-charcoal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-warmgray text-xs mb-3">
                Choose a prompt for <strong>{icebreakerModal.name}</strong>:
              </p>
              <div className="space-y-2">
                {icebreakerPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      addToast(`Icebreaker sent to ${icebreakerModal.name}!`);
                      setIcebreakerModal(null);
                    }}
                    className="w-full text-left p-3 rounded-xl border border-sand hover:border-red/40 hover:bg-red/5 text-xs text-charcoal transition-colors"
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

import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useMoodStore } from "@/store/moodStore";
import { useToastStore } from "@/store/toastStore";
import { moodHistory } from "@/data/moodHistory";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Heart,
  TrendingDown,
  Users,
  Phone,
  ChevronDown,
  ChevronUp,
  PenLine,
  Flame,
} from "lucide-react";

const moodEmojis = [
  { value: 1, emoji: "\uD83D\uDE22", label: "Rough" },
  { value: 2, emoji: "\uD83D\uDE15", label: "Low" },
  { value: 3, emoji: "\uD83D\uDE10", label: "Okay" },
  { value: 4, emoji: "\uD83D\uDE0A", label: "Good" },
  { value: 5, emoji: "\uD83D\uDE04", label: "Great" },
];

const moodLabels: Record<number, { label: string; desc: string }> = {
  1: { label: "Stormy", desc: "It's okay to not be okay" },
  2: { label: "Overcast", desc: "Hang in there, brighter days ahead" },
  3: { label: "Mild & Steady", desc: "Keeping it together" },
  4: { label: "Radiant & Warm", desc: "You're doing great" },
  5: { label: "Golden", desc: "On top of the world" },
};

const journalPrompts = [
  "What would set today apart from yesterday?",
  "What made you smile today?",
  "What felt hard?",
  "What are you grateful for right now?",
];

export default function Tracker() {
  const { todayMood, setTodayMood, journalEntries, addJournalEntry } =
    useMoodStore();
  const addToast = useToastStore((s) => s.addToast);

  const [selectedMood, setSelectedMood] = useState<number | null>(todayMood);
  const [moodNote, setMoodNote] = useState("");
  const [journalText, setJournalText] = useState("");
  const [journalPrompt, setJournalPrompt] = useState(journalPrompts[0]);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  const chartData = moodHistory.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    mood: entry.mood,
  }));

  const recent = moodHistory.slice(-3);
  const isDowntrend =
    recent.length === 3 &&
    recent[0].mood > recent[1].mood &&
    recent[1].mood >= recent[2].mood;

  const currentMoodData = moodLabels[selectedMood || 4];
  const streakDays = 12;

  const saveMood = () => {
    if (selectedMood) {
      setTodayMood(selectedMood, moodNote || undefined);
      addToast("Mood saved!");
      setMoodNote("");
    }
  };

  const saveJournal = () => {
    if (journalText.trim()) {
      addJournalEntry({
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
        prompt: journalPrompt,
        text: journalText,
      });
      setJournalText("");
      setJournalPrompt(
        journalPrompts[Math.floor(Math.random() * journalPrompts.length)]
      );
      addToast("Journal entry saved!");
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            Resilience Tracker
          </h1>
          <p className="text-warmgray text-base mt-1">
            Check in with yourself and track your well-being
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Mood Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-gradient-to-br from-red to-red-dark rounded-3xl p-10 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                <div className="relative">
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                    Current Mood
                  </p>
                  <h2 className="font-heading text-4xl font-bold mb-1">
                    {currentMoodData.label}
                  </h2>
                  <p className="text-white/60 text-base">{currentMoodData.desc}</p>
                </div>
              </div>
            </motion.div>

            {/* Mood Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl p-6 border border-sand/60"
            >
              <div className="flex justify-between mb-5">
                {moodEmojis.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setSelectedMood(m.value)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                      selectedMood === m.value
                        ? "bg-red/10 scale-110"
                        : "hover:bg-cream"
                    }`}
                  >
                    <span className="text-3xl">{m.emoji}</span>
                    <span className="text-xs text-warmgray">{m.label}</span>
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="Add a note (optional)..."
                className="w-full px-4 py-3 rounded-xl border border-sand bg-cream/30 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-red/20"
              />

              <button
                onClick={saveMood}
                disabled={!selectedMood}
                className="w-full py-3 bg-red text-white rounded-xl text-sm font-semibold hover:bg-red-dark transition-colors disabled:opacity-40"
              >
                Save Check-in
              </button>
            </motion.div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-charcoal rounded-2xl p-8 relative overflow-hidden"
            >
              <blockquote className="font-heading text-2xl text-white/90 leading-snug mb-3 italic">
                "The day I finally moved in."
              </blockquote>
              <p className="text-white/30 text-sm">A HomeBase Memory</p>
            </motion.div>

            {/* Streak Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-red rounded-2xl px-6 py-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Flame className="w-7 h-7 text-white" />
                <div>
                  <p className="text-white font-heading text-xl font-bold">
                    Streak: {streakDays} Days
                  </p>
                  <p className="text-white/50 text-sm">Keep the fire going!</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i < 4 ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Today's Reflect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl p-6 border border-sand/60"
            >
              <div className="flex items-center gap-2 mb-4">
                <PenLine className="w-5 h-5 text-red" />
                <h3 className="font-heading text-lg font-semibold text-charcoal">
                  Today's Reflect
                </h3>
              </div>

              <div className="bg-cream/60 rounded-xl p-4 mb-4">
                <p className="text-sm text-warmgray italic">"{journalPrompt}"</p>
              </div>

              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="Write your thoughts..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-sand bg-cream/20 text-sm resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-red/20"
              />

              <button
                onClick={saveJournal}
                disabled={!journalText.trim()}
                className="px-6 py-2.5 bg-red text-white rounded-full text-sm font-semibold hover:bg-red-dark transition-colors disabled:opacity-40"
              >
                Save Entry
              </button>

              {journalEntries.length > 0 && (
                <div className="mt-6 pt-4 border-t border-sand/30 space-y-2">
                  <h4 className="text-sm font-medium text-charcoal mb-2">Past Entries</h4>
                  {journalEntries.slice(0, 5).map((entry) => (
                    <div key={entry.id} className="rounded-xl border border-sand/40">
                      <button
                        onClick={() =>
                          setExpandedEntry(expandedEntry === entry.id ? null : entry.id)
                        }
                        className="w-full flex items-center justify-between p-3 text-left"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-warmgray-light">
                            {new Date(entry.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <p className="text-sm text-charcoal truncate">{entry.text}</p>
                        </div>
                        {expandedEntry === entry.id ? (
                          <ChevronUp className="w-4 h-4 text-warmgray shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-warmgray shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedEntry === entry.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 pb-3">
                              <p className="text-xs text-warmgray italic mb-1">"{entry.prompt}"</p>
                              <p className="text-sm text-charcoal">{entry.text}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Mood Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-sand/60"
            >
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-5">
                Mood Over 30 Days
              </h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "#B5B0AB" }}
                      interval={4}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[1, 5]}
                      ticks={[1, 2, 3, 4, 5]}
                      tick={{ fontSize: 11, fill: "#B5B0AB" }}
                      axisLine={false}
                      tickLine={false}
                      width={24}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #E8E2DB",
                        fontSize: 13,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="#C4404E"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5, fill: "#C4404E" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Smart Nudge */}
            {isDowntrend && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cream rounded-2xl p-5 border border-sand/60"
              >
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-red shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-charcoal mb-1">
                      We noticed things have been tough
                    </p>
                    <p className="text-sm text-warmgray mb-2">
                      A social activity might help:
                    </p>
                    <div className="bg-white rounded-lg px-3 py-2 border border-sand/40 text-sm text-charcoal flex items-center gap-2">
                      <Users className="w-4 h-4 text-red" />
                      Game Night at the Union — Friday 8 PM
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Crisis Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-bg rounded-2xl p-5 border border-red/10"
            >
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-charcoal mb-1">
                    Feeling overwhelmed?
                  </p>
                  <p className="text-sm text-warmgray mb-3">
                    You're not alone. Reach out anytime.
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="tel:988"
                      className="px-4 py-2 bg-red text-white text-sm font-medium rounded-full"
                    >
                      988 Crisis Lifeline
                    </a>
                    <a
                      href="#"
                      className="px-4 py-2 bg-white text-red text-sm font-medium rounded-full border border-red/20"
                    >
                      Campus CAPS
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

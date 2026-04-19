import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useMoodStore } from "@/store/moodStore";
import { useUserStore } from "@/store/userStore";
import { useToastStore } from "@/store/toastStore";
import { familyNotes } from "@/data/familyNotes";
import { moodHistory } from "@/data/moodHistory";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Gift,
  Heart,
  Eye,
  EyeOff,
  Send,
  X,
  Mail,
  Users,
  Smile,
  UtensilsCrossed,
} from "lucide-react";

const stickerOptions = [
  { id: "heart", emoji: "\u2764\uFE0F", label: "Love" },
  { id: "hug", emoji: "\uD83E\uDD17", label: "Hug" },
  { id: "star", emoji: "\u2B50", label: "Star" },
  { id: "sun", emoji: "\u2600\uFE0F", label: "Sun" },
  { id: "flower", emoji: "\uD83C\uDF3B", label: "Flower" },
  { id: "rainbow", emoji: "\uD83C\uDF08", label: "Rainbow" },
];

const stickerEmoji: Record<string, string> = {
  heart: "\u2764\uFE0F",
  hug: "\uD83E\uDD17",
  star: "\u2B50",
};

export default function HomeLink() {
  const user = useUserStore((s) => s.user);
  const { shareMoodWithFamily, setShareMoodWithFamily } = useMoodStore();
  const addToast = useToastStore((s) => s.addToast);

  const [view, setView] = useState<"student" | "family">("student");
  const [message, setMessage] = useState("");
  const [hugModal, setHugModal] = useState(false);
  const [hugMessage, setHugMessage] = useState("");
  const [selectedSticker, setSelectedSticker] = useState("heart");

  const chartData = moodHistory.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    mood: entry.mood,
  }));

  const recentAvg = (
    moodHistory.slice(-7).reduce((a, b) => a + b.mood, 0) / 7
  ).toFixed(1);

  const moodSummary =
    Number(recentAvg) >= 4
      ? "doing well — mood has been positive this week"
      : Number(recentAvg) >= 3
      ? "hanging in there — some ups and downs this week"
      : "going through a tough stretch — extra support may help";

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-5 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-2xl font-bold text-charcoal">
              Care Package
            </h1>
            <p className="text-warmgray text-sm mt-0.5">
              Stay connected with home
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex bg-white border border-sand/60 rounded-full p-0.5">
            <button
              onClick={() => setView("student")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                view === "student" ? "bg-red text-white" : "text-warmgray"
              }`}
            >
              <Smile className="w-3 h-3" />
              Student
            </button>
            <button
              onClick={() => setView("family")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                view === "family" ? "bg-charcoal text-white" : "text-warmgray"
              }`}
            >
              <Users className="w-3 h-3" />
              Family
            </button>
          </div>
        </div>

        {view === "student" ? (
          <>
            {/* Compose Update */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 border border-sand/60 mb-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Send className="w-4 h-4 text-red" />
                <h2 className="font-heading text-base font-semibold text-charcoal">
                  Send a Mood Update
                </h2>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message to your family..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-sand bg-cream/20 text-sm resize-none mb-3 focus:outline-none focus:ring-2 focus:ring-red/20"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareMoodWithFamily}
                    onChange={(e) => setShareMoodWithFamily(e.target.checked)}
                    className="accent-red w-3.5 h-3.5"
                  />
                  <span className="text-xs text-warmgray flex items-center gap-1">
                    {shareMoodWithFamily ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <EyeOff className="w-3 h-3" />
                    )}
                    Share mood graph
                  </span>
                </label>
                <button
                  onClick={() => {
                    addToast("Update sent to family!");
                    setMessage("");
                  }}
                  disabled={!message.trim()}
                  className="px-5 py-2 bg-red text-white rounded-full text-xs font-semibold hover:bg-red-dark transition-colors disabled:opacity-40"
                >
                  Send
                </button>
              </div>
            </motion.div>

            {/* Digital Hug + Sponsor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="grid grid-cols-2 gap-3 mb-5"
            >
              <button
                onClick={() => setHugModal(true)}
                className="bg-red rounded-2xl p-4 text-white text-left hover:bg-red-dark transition-colors"
              >
                <Heart className="w-5 h-5 mb-2" />
                <p className="font-semibold text-sm">Send a Digital Hug</p>
                <p className="text-white/60 text-[10px] mt-0.5">
                  With stickers & a message
                </p>
              </button>
              <button
                onClick={() =>
                  addToast("Meal sponsorship sent! Your student will love it.")
                }
                className="bg-charcoal rounded-2xl p-4 text-white text-left hover:bg-charcoal/90 transition-colors"
              >
                <UtensilsCrossed className="w-5 h-5 mb-2" />
                <p className="font-semibold text-sm">Sponsor a Meal</p>
                <p className="text-white/40 text-[10px] mt-0.5">
                  Treat them to campus dining
                </p>
              </button>
            </motion.div>

            {/* Motivational Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 border border-sand/60"
            >
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-4 h-4 text-red" />
                <h2 className="font-heading text-base font-semibold text-charcoal">
                  Notes from Home
                </h2>
              </div>
              <div className="space-y-3">
                {familyNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-4 rounded-xl border ${
                      note.read
                        ? "border-sand/40 bg-cream/20"
                        : "border-red/15 bg-red-bg"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">
                          {stickerEmoji[note.sticker] || "\u2764\uFE0F"}
                        </span>
                        <span className="font-medium text-sm text-charcoal">
                          {note.from}
                        </span>
                        {!note.read && (
                          <span className="w-1.5 h-1.5 bg-red rounded-full" />
                        )}
                      </div>
                      <span className="text-[10px] text-warmgray-light">
                        {note.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-warmgray leading-relaxed">
                      {note.message}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          /* Family View */
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 border border-sand/60 mb-5"
            >
              <h2 className="font-heading text-base font-semibold text-charcoal mb-1">
                {user.name || "Your Student"}'s Well-Being
              </h2>
              <p className="text-xs text-warmgray mb-4">
                {user.name || "Your student"} is{" "}
                <strong className="text-charcoal">{moodSummary}</strong>.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-cream/60 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-red">{recentAvg}</p>
                  <p className="text-[10px] text-warmgray">This Week Avg</p>
                </div>
                <div className="bg-cream/60 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-charcoal">
                    {(
                      moodHistory.reduce((a, b) => a + b.mood, 0) /
                      moodHistory.length
                    ).toFixed(1)}
                  </p>
                  <p className="text-[10px] text-warmgray">30-Day Avg</p>
                </div>
              </div>

              {shareMoodWithFamily ? (
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fill: "#B5B0AB" }}
                        interval={5}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[1, 5]}
                        ticks={[1, 2, 3, 4, 5]}
                        tick={{ fontSize: 10, fill: "#B5B0AB" }}
                        axisLine={false}
                        tickLine={false}
                        width={24}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#C4404E"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="bg-cream/50 rounded-xl p-6 text-center">
                  <EyeOff className="w-6 h-6 text-warmgray-light mx-auto mb-2" />
                  <p className="text-xs text-warmgray">
                    Mood sharing is turned off by your student.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Family Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="grid grid-cols-2 gap-3"
            >
              <button
                onClick={() => setHugModal(true)}
                className="bg-red rounded-2xl p-4 text-white text-left hover:bg-red-dark transition-colors"
              >
                <Heart className="w-5 h-5 mb-2" />
                <p className="font-semibold text-sm">Send a Digital Hug</p>
              </button>
              <button
                onClick={() =>
                  addToast("Meal sponsorship sent!")
                }
                className="bg-charcoal rounded-2xl p-4 text-white text-left hover:bg-charcoal/90 transition-colors"
              >
                <Gift className="w-5 h-5 mb-2" />
                <p className="font-semibold text-sm">Sponsor a Meal</p>
              </button>
            </motion.div>
          </>
        )}
      </div>

      {/* Hug Modal */}
      <AnimatePresence>
        {hugModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
            onClick={() => setHugModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-semibold text-charcoal">
                  Send a Digital Hug
                </h3>
                <button
                  onClick={() => setHugModal(false)}
                  className="text-warmgray hover:text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-warmgray mb-3">Choose a sticker:</p>
              <div className="flex gap-2 mb-4">
                {stickerOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSticker(s.id)}
                    className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                      selectedSticker === s.id
                        ? "bg-red/10 scale-110"
                        : "bg-cream hover:bg-cream-dark"
                    }`}
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <span className="text-[9px] text-warmgray mt-0.5">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>

              <textarea
                value={hugMessage}
                onChange={(e) => setHugMessage(e.target.value)}
                placeholder="Add a message..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-sand bg-cream/20 text-sm resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-red/20"
              />

              <button
                onClick={() => {
                  addToast("Digital hug sent!");
                  setHugModal(false);
                  setHugMessage("");
                }}
                className="w-full py-2.5 bg-red text-white rounded-full text-sm font-semibold hover:bg-red-dark transition-colors"
              >
                Send Hug
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

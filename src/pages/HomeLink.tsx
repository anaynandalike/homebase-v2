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
      ? "doing well this week"
      : Number(recentAvg) >= 3
      ? "hanging in there"
      : "going through a tough stretch";

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-charcoal">
              Care Package
            </h1>
            <p className="text-warmgray text-base mt-1">
              Stay connected with home
            </p>
          </div>

          <div className="flex bg-white border border-sand/60 rounded-full p-1">
            <button
              onClick={() => setView("student")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                view === "student" ? "bg-red text-white" : "text-warmgray"
              }`}
            >
              <Smile className="w-4 h-4" />
              Student
            </button>
            <button
              onClick={() => setView("family")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                view === "family" ? "bg-charcoal text-white" : "text-warmgray"
              }`}
            >
              <Users className="w-4 h-4" />
              Family
            </button>
          </div>
        </div>

        {view === "student" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Compose */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 border border-sand/60"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Send className="w-5 h-5 text-red" />
                  <h2 className="font-heading text-lg font-semibold text-charcoal">
                    Send a Mood Update
                  </h2>
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a message to your family..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-sand bg-cream/20 text-sm resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-red/20"
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shareMoodWithFamily}
                      onChange={(e) => setShareMoodWithFamily(e.target.checked)}
                      className="accent-red w-4 h-4"
                    />
                    <span className="text-sm text-warmgray flex items-center gap-1">
                      {shareMoodWithFamily ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                      Share mood graph
                    </span>
                  </label>
                  <button
                    onClick={() => {
                      addToast("Update sent!");
                      setMessage("");
                    }}
                    disabled={!message.trim()}
                    className="px-6 py-2.5 bg-red text-white rounded-full text-sm font-semibold hover:bg-red-dark transition-colors disabled:opacity-40"
                  >
                    Send
                  </button>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 }}
                className="grid grid-cols-2 gap-5"
              >
                <button
                  onClick={() => setHugModal(true)}
                  className="bg-red rounded-2xl p-6 text-white text-left hover:bg-red-dark transition-colors"
                >
                  <Heart className="w-6 h-6 mb-3" />
                  <p className="font-semibold text-base">Digital Hug</p>
                  <p className="text-white/50 text-sm mt-1">
                    Stickers & message
                  </p>
                </button>
                <button
                  onClick={() => addToast("Meal sponsorship sent!")}
                  className="bg-charcoal rounded-2xl p-6 text-white text-left hover:bg-charcoal/90 transition-colors"
                >
                  <UtensilsCrossed className="w-6 h-6 mb-3" />
                  <p className="font-semibold text-base">Sponsor a Meal</p>
                  <p className="text-white/40 text-sm mt-1">
                    Campus dining
                  </p>
                </button>
              </motion.div>
            </div>

            {/* Right Column - Notes */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-white rounded-2xl p-6 border border-sand/60"
            >
              <div className="flex items-center gap-2 mb-5">
                <Mail className="w-5 h-5 text-red" />
                <h2 className="font-heading text-lg font-semibold text-charcoal">
                  Notes from Home
                </h2>
              </div>
              <div className="space-y-4">
                {familyNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-5 rounded-xl border ${
                      note.read
                        ? "border-sand/30 bg-cream/20"
                        : "border-red/15 bg-red-bg"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {stickerEmoji[note.sticker] || "\u2764\uFE0F"}
                        </span>
                        <span className="font-medium text-sm text-charcoal">
                          {note.from}
                        </span>
                        {!note.read && (
                          <span className="w-2 h-2 bg-red rounded-full" />
                        )}
                      </div>
                      <span className="text-xs text-warmgray-light">
                        {note.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-warmgray leading-relaxed">
                      {note.message}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Family View */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border border-sand/60"
            >
              <h2 className="font-heading text-lg font-semibold text-charcoal mb-1">
                {user.name || "Your Student"}'s Well-Being
              </h2>
              <p className="text-sm text-warmgray mb-5">
                Currently <strong className="text-charcoal">{moodSummary}</strong>
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-cream/60 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-red">{recentAvg}</p>
                  <p className="text-sm text-warmgray">This Week</p>
                </div>
                <div className="bg-cream/60 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-charcoal">
                    {(
                      moodHistory.reduce((a, b) => a + b.mood, 0) /
                      moodHistory.length
                    ).toFixed(1)}
                  </p>
                  <p className="text-sm text-warmgray">30-Day</p>
                </div>
              </div>

              {shareMoodWithFamily ? (
                <div className="h-48">
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
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#C4404E"
                        strokeWidth={2.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="bg-cream/50 rounded-xl p-8 text-center">
                  <EyeOff className="w-6 h-6 text-warmgray-light mx-auto mb-2" />
                  <p className="text-sm text-warmgray">
                    Mood sharing is turned off.
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 }}
              className="grid grid-cols-2 gap-5"
            >
              <button
                onClick={() => setHugModal(true)}
                className="bg-red rounded-2xl p-6 text-white text-left hover:bg-red-dark transition-colors"
              >
                <Heart className="w-6 h-6 mb-3" />
                <p className="font-semibold text-base">Send a Hug</p>
              </button>
              <button
                onClick={() => addToast("Meal sponsorship sent!")}
                className="bg-charcoal rounded-2xl p-6 text-white text-left hover:bg-charcoal/90 transition-colors"
              >
                <Gift className="w-6 h-6 mb-3" />
                <p className="font-semibold text-base">Sponsor Meal</p>
              </button>
            </motion.div>
          </div>
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading text-xl font-semibold text-charcoal">
                  Send a Digital Hug
                </h3>
                <button
                  onClick={() => setHugModal(false)}
                  className="text-warmgray hover:text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-warmgray mb-4">Choose a sticker:</p>
              <div className="flex gap-3 mb-5">
                {stickerOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSticker(s.id)}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                      selectedSticker === s.id
                        ? "bg-red/10 scale-110"
                        : "bg-cream"
                    }`}
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <span className="text-xs text-warmgray mt-1">{s.label}</span>
                  </button>
                ))}
              </div>

              <textarea
                value={hugMessage}
                onChange={(e) => setHugMessage(e.target.value)}
                placeholder="Add a message..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-sand bg-cream/20 text-sm resize-none mb-5 focus:outline-none focus:ring-2 focus:ring-red/20"
              />

              <button
                onClick={() => {
                  addToast("Digital hug sent!");
                  setHugModal(false);
                  setHugMessage("");
                }}
                className="w-full py-3 bg-red text-white rounded-full text-sm font-semibold hover:bg-red-dark transition-colors"
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

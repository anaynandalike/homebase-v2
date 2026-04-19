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
      <div className="max-w-[430px] mx-auto px-4 py-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="font-heading text-xl font-bold text-charcoal">
              Care Package
            </h1>
            <p className="text-warmgray text-[11px] mt-0.5">
              Stay connected with home
            </p>
          </div>

          <div className="flex bg-white border border-sand/60 rounded-full p-0.5">
            <button
              onClick={() => setView("student")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                view === "student" ? "bg-red text-white" : "text-warmgray"
              }`}
            >
              <Smile className="w-2.5 h-2.5" />
              Student
            </button>
            <button
              onClick={() => setView("family")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                view === "family" ? "bg-charcoal text-white" : "text-warmgray"
              }`}
            >
              <Users className="w-2.5 h-2.5" />
              Family
            </button>
          </div>
        </div>

        {view === "student" ? (
          <>
            {/* Compose */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 border border-sand/60 mb-4"
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <Send className="w-3.5 h-3.5 text-red" />
                <h2 className="font-heading text-sm font-semibold text-charcoal">
                  Send a Mood Update
                </h2>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message to your family..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-sand bg-cream/20 text-xs resize-none mb-2.5 focus:outline-none focus:ring-2 focus:ring-red/20"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareMoodWithFamily}
                    onChange={(e) => setShareMoodWithFamily(e.target.checked)}
                    className="accent-red w-3 h-3"
                  />
                  <span className="text-[10px] text-warmgray flex items-center gap-0.5">
                    {shareMoodWithFamily ? (
                      <Eye className="w-2.5 h-2.5" />
                    ) : (
                      <EyeOff className="w-2.5 h-2.5" />
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
                  className="px-4 py-1.5 bg-red text-white rounded-full text-[10px] font-semibold hover:bg-red-dark transition-colors disabled:opacity-40"
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
              className="grid grid-cols-2 gap-2.5 mb-4"
            >
              <button
                onClick={() => setHugModal(true)}
                className="bg-red rounded-2xl p-3.5 text-white text-left hover:bg-red-dark transition-colors"
              >
                <Heart className="w-4 h-4 mb-1.5" />
                <p className="font-semibold text-xs">Digital Hug</p>
                <p className="text-white/50 text-[9px] mt-0.5">
                  Stickers & message
                </p>
              </button>
              <button
                onClick={() => addToast("Meal sponsorship sent!")}
                className="bg-charcoal rounded-2xl p-3.5 text-white text-left hover:bg-charcoal/90 transition-colors"
              >
                <UtensilsCrossed className="w-4 h-4 mb-1.5" />
                <p className="font-semibold text-xs">Sponsor a Meal</p>
                <p className="text-white/40 text-[9px] mt-0.5">
                  Campus dining
                </p>
              </button>
            </motion.div>

            {/* Notes */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-white rounded-2xl p-4 border border-sand/60"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <Mail className="w-3.5 h-3.5 text-red" />
                <h2 className="font-heading text-sm font-semibold text-charcoal">
                  Notes from Home
                </h2>
              </div>
              <div className="space-y-2.5">
                {familyNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-xl border ${
                      note.read
                        ? "border-sand/30 bg-cream/20"
                        : "border-red/15 bg-red-bg"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">
                          {stickerEmoji[note.sticker] || "\u2764\uFE0F"}
                        </span>
                        <span className="font-medium text-xs text-charcoal">
                          {note.from}
                        </span>
                        {!note.read && (
                          <span className="w-1.5 h-1.5 bg-red rounded-full" />
                        )}
                      </div>
                      <span className="text-[9px] text-warmgray-light">
                        {note.timestamp}
                      </span>
                    </div>
                    <p className="text-[10px] text-warmgray leading-relaxed">
                      {note.message}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          <>
            {/* Family View */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 border border-sand/60 mb-4"
            >
              <h2 className="font-heading text-sm font-semibold text-charcoal mb-0.5">
                {user.name || "Your Student"}'s Well-Being
              </h2>
              <p className="text-[10px] text-warmgray mb-3">
                Currently <strong className="text-charcoal">{moodSummary}</strong>
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-cream/60 rounded-xl p-2.5 text-center">
                  <p className="text-lg font-bold text-red">{recentAvg}</p>
                  <p className="text-[9px] text-warmgray">This Week</p>
                </div>
                <div className="bg-cream/60 rounded-xl p-2.5 text-center">
                  <p className="text-lg font-bold text-charcoal">
                    {(
                      moodHistory.reduce((a, b) => a + b.mood, 0) /
                      moodHistory.length
                    ).toFixed(1)}
                  </p>
                  <p className="text-[9px] text-warmgray">30-Day</p>
                </div>
              </div>

              {shareMoodWithFamily ? (
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 8, fill: "#B5B0AB" }}
                        interval={6}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[1, 5]}
                        ticks={[1, 2, 3, 4, 5]}
                        tick={{ fontSize: 8, fill: "#B5B0AB" }}
                        axisLine={false}
                        tickLine={false}
                        width={18}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#C4404E"
                        strokeWidth={1.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="bg-cream/50 rounded-xl p-5 text-center">
                  <EyeOff className="w-5 h-5 text-warmgray-light mx-auto mb-1" />
                  <p className="text-[10px] text-warmgray">
                    Mood sharing is turned off.
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 }}
              className="grid grid-cols-2 gap-2.5"
            >
              <button
                onClick={() => setHugModal(true)}
                className="bg-red rounded-2xl p-3.5 text-white text-left hover:bg-red-dark transition-colors"
              >
                <Heart className="w-4 h-4 mb-1.5" />
                <p className="font-semibold text-xs">Send a Hug</p>
              </button>
              <button
                onClick={() => addToast("Meal sponsorship sent!")}
                className="bg-charcoal rounded-2xl p-3.5 text-white text-left hover:bg-charcoal/90 transition-colors"
              >
                <Gift className="w-4 h-4 mb-1.5" />
                <p className="font-semibold text-xs">Sponsor Meal</p>
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
            className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4"
            onClick={() => setHugModal(false)}
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
                  Send a Digital Hug
                </h3>
                <button
                  onClick={() => setHugModal(false)}
                  className="text-warmgray hover:text-charcoal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-warmgray mb-2">Choose a sticker:</p>
              <div className="flex gap-1.5 mb-3">
                {stickerOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSticker(s.id)}
                    className={`flex flex-col items-center p-1.5 rounded-lg transition-all ${
                      selectedSticker === s.id
                        ? "bg-red/10 scale-110"
                        : "bg-cream"
                    }`}
                  >
                    <span className="text-lg">{s.emoji}</span>
                    <span className="text-[7px] text-warmgray">{s.label}</span>
                  </button>
                ))}
              </div>

              <textarea
                value={hugMessage}
                onChange={(e) => setHugMessage(e.target.value)}
                placeholder="Add a message..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-sand bg-cream/20 text-xs resize-none mb-3 focus:outline-none focus:ring-2 focus:ring-red/20"
              />

              <button
                onClick={() => {
                  addToast("Digital hug sent!");
                  setHugModal(false);
                  setHugMessage("");
                }}
                className="w-full py-2 bg-red text-white rounded-full text-xs font-semibold hover:bg-red-dark transition-colors"
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

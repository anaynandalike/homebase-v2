import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  text: string;
}

interface MoodStore {
  todayMood: number | null;
  todayNote: string;
  moodLog: { date: string; mood: number; note?: string }[];
  journalEntries: JournalEntry[];
  shareMoodWithFamily: boolean;
  setTodayMood: (mood: number, note?: string) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  setShareMoodWithFamily: (share: boolean) => void;
}

export const useMoodStore = create<MoodStore>()(
  persist(
    (set) => ({
      todayMood: null,
      todayNote: "",
      moodLog: [],
      journalEntries: [],
      shareMoodWithFamily: true,
      setTodayMood: (mood, note) =>
        set((state) => {
          const today = new Date().toISOString().split("T")[0];
          const existing = state.moodLog.filter((m) => m.date !== today);
          return {
            todayMood: mood,
            todayNote: note || "",
            moodLog: [...existing, { date: today, mood, note }],
          };
        }),
      addJournalEntry: (entry) =>
        set((state) => ({
          journalEntries: [entry, ...state.journalEntries],
        })),
      setShareMoodWithFamily: (share) => set({ shareMoodWithFamily: share }),
    }),
    { name: "homebase-mood" }
  )
);

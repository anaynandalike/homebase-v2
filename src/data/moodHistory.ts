export interface MoodEntry {
  date: string;
  mood: number;
  note?: string;
}

const today = new Date();
const generateDate = (daysAgo: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
};

export const moodHistory: MoodEntry[] = [
  { date: generateDate(29), mood: 3, note: "First week jitters" },
  { date: generateDate(28), mood: 3 },
  { date: generateDate(27), mood: 4, note: "Made a friend in class!" },
  { date: generateDate(26), mood: 4 },
  { date: generateDate(25), mood: 2, note: "Missing home a lot today" },
  { date: generateDate(24), mood: 3 },
  { date: generateDate(23), mood: 4, note: "Great study group session" },
  { date: generateDate(22), mood: 5, note: "Best day so far!" },
  { date: generateDate(21), mood: 4 },
  { date: generateDate(20), mood: 3 },
  { date: generateDate(19), mood: 3, note: "Quiet weekend" },
  { date: generateDate(18), mood: 4 },
  { date: generateDate(17), mood: 4 },
  { date: generateDate(16), mood: 5, note: "Concert was amazing" },
  { date: generateDate(15), mood: 4 },
  { date: generateDate(14), mood: 3, note: "Midterms stress" },
  { date: generateDate(13), mood: 2 },
  { date: generateDate(12), mood: 2, note: "Rough day, called mom" },
  { date: generateDate(11), mood: 3 },
  { date: generateDate(10), mood: 4, note: "Joined cooking club!" },
  { date: generateDate(9), mood: 4 },
  { date: generateDate(8), mood: 5, note: "Found my favorite café" },
  { date: generateDate(7), mood: 4 },
  { date: generateDate(6), mood: 3 },
  { date: generateDate(5), mood: 3, note: "Homesick but managing" },
  { date: generateDate(4), mood: 4 },
  { date: generateDate(3), mood: 3 },
  { date: generateDate(2), mood: 2, note: "Feeling low" },
  { date: generateDate(1), mood: 2 },
  { date: generateDate(0), mood: 3 },
];

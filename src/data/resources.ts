export interface Resource {
  id: string;
  title: string;
  category: "Counseling" | "Clubs" | "Events" | "Dining" | "Essential Services";
  description: string;
  location: string;
  dateTime?: string;
  vibeTags?: string[];
  isEssential?: boolean;
}

export const resources: Resource[] = [
  {
    id: "r1",
    title: "Counseling & Psychological Services (CAPS)",
    category: "Counseling",
    description: "Free confidential counseling for all enrolled students. Walk-ins welcome.",
    location: "Student Health Center, 3rd Floor",
  },
  {
    id: "r2",
    title: "Out-of-State Student Alliance",
    category: "Clubs",
    description: "Weekly meetups for students far from home. Game nights, potlucks, and support circles.",
    location: "Michigan Union, Room 2104",
    dateTime: "Every Thursday, 7:00 PM",
    vibeTags: ["Great for Freshmen", "Free Food"],
  },
  {
    id: "r3",
    title: "International & Domestic Cultural Night",
    category: "Events",
    description: "Celebrate diverse cultures through food, music, and performances from around the country and world.",
    location: "Rackham Auditorium",
    dateTime: "Nov 15, 6:00 PM",
    vibeTags: ["Free Food", "Great for Freshmen"],
  },
  {
    id: "r4",
    title: "Late Night Study Café",
    category: "Dining",
    description: "Open until 2 AM during finals. Coffee, snacks, and quiet study spaces.",
    location: "Shapiro Library, Lower Level",
    dateTime: "Open daily 8 PM - 2 AM",
  },
  {
    id: "r5",
    title: "Campus Storage Solutions",
    category: "Essential Services",
    description: "Affordable storage units for students who can't bring everything home. Reserve early for summer!",
    location: "2100 S. Industrial Hwy",
    isEssential: true,
  },
  {
    id: "r6",
    title: "Mindfulness & Meditation Drop-In",
    category: "Counseling",
    description: "No experience needed. Guided meditation sessions to manage stress and homesickness.",
    location: "Wellness Center, Room 110",
    dateTime: "Mon & Wed, 12:00 PM",
    vibeTags: ["Low Sensory"],
  },
  {
    id: "r7",
    title: "Cooking Club: Taste of Home",
    category: "Clubs",
    description: "Cook recipes from your home state/country. All skill levels welcome, ingredients provided.",
    location: "South Quad Kitchen",
    dateTime: "Every Saturday, 3:00 PM",
    vibeTags: ["Free Food", "Great for Freshmen"],
  },
  {
    id: "r8",
    title: "Dorm Break Housing Program",
    category: "Essential Services",
    description: "Can't go home for breaks? Apply for break housing to stay on campus during university closures.",
    location: "Housing Office, 1011 Student Activities Bldg",
    isEssential: true,
  },
  {
    id: "r9",
    title: "Campus Car Repair & Towing",
    category: "Essential Services",
    description: "Discounted auto repair for students. Free towing within 5 miles of campus.",
    location: "University Auto Center, 405 E. Liberty",
    isEssential: true,
  },
  {
    id: "r10",
    title: "Outdoor Adventure Club Hike",
    category: "Events",
    description: "Weekend hikes at local parks and nature preserves. Transportation provided.",
    location: "Meet at Michigan Union Front Steps",
    dateTime: "Nov 10, 9:00 AM",
    vibeTags: ["Great for Freshmen"],
  },
  {
    id: "r11",
    title: "Emergency Financial Aid Office",
    category: "Essential Services",
    description: "Emergency grants and loans for unexpected expenses. Confidential and fast turnaround.",
    location: "Financial Aid Office, 2500 SAB",
    isEssential: true,
  },
  {
    id: "r12",
    title: "Game Night at the Union",
    category: "Events",
    description: "Board games, video games, and snacks. A chill Friday night with new friends.",
    location: "Michigan Union, Kuenzel Room",
    dateTime: "Nov 8, 8:00 PM",
    vibeTags: ["Free Food", "Low Sensory", "Great for Freshmen"],
  },
];

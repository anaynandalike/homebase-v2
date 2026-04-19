export interface FamilyNote {
  id: string;
  from: string;
  message: string;
  sticker: string;
  timestamp: string;
  read: boolean;
}

export const familyNotes: FamilyNote[] = [
  {
    id: "fn1",
    from: "Mom",
    message: "So proud of you for pushing through midterms! Dad and I are cheering you on. The dog misses you too! Come home soon for some real food. Love you always.",
    sticker: "heart",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "fn2",
    from: "Dad",
    message: "Hey kiddo — saw your university's football team won this weekend. Hope you caught the game! Remember, tough times don't last, but tough people do. Sending a virtual hug your way.",
    sticker: "hug",
    timestamp: "5 days ago",
    read: true,
  },
  {
    id: "fn3",
    from: "Sister",
    message: "Your room is still exactly how you left it (I haven't stolen anything... yet 😈). Miss having you around to watch movies with. FaceTime me this weekend??",
    sticker: "star",
    timestamp: "1 week ago",
    read: false,
  },
];

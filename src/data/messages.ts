export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isIcebreaker?: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  messages: Message[];
  lastActive: string;
}

export const conversations: Conversation[] = [
  {
    id: "conv1",
    participantId: "1",
    participantName: "Maya Chen",
    participantAvatar: "MC",
    lastActive: "2 min ago",
    messages: [
      {
        id: "m1",
        senderId: "1",
        text: "If you could teleport home for just one hour, what would you do first?",
        timestamp: "10:30 AM",
        isIcebreaker: true,
      },
      {
        id: "m2",
        senderId: "self",
        text: "Oh that's easy — raid my mom's kitchen 😂 She makes the best tamales",
        timestamp: "10:32 AM",
      },
      {
        id: "m3",
        senderId: "1",
        text: "Omg yes!! Food from home hits different. I'd go straight for my grandma's dumplings",
        timestamp: "10:33 AM",
      },
      {
        id: "m4",
        senderId: "self",
        text: "We should try to make them here! The cooking club has a kitchen we can use",
        timestamp: "10:35 AM",
      },
      {
        id: "m5",
        senderId: "1",
        text: "Yes!! I'm so down. Saturday afternoon?",
        timestamp: "10:36 AM",
      },
    ],
  },
  {
    id: "conv2",
    participantId: "4",
    participantName: "Marcus Thompson",
    participantAvatar: "MT",
    lastActive: "1 hr ago",
    messages: [
      {
        id: "m6",
        senderId: "self",
        text: "What's the one thing about your home state that surprises people?",
        timestamp: "9:00 AM",
        isIcebreaker: true,
      },
      {
        id: "m7",
        senderId: "4",
        text: "That Atlanta has mountains nearby! Everyone thinks it's just city and peaches lol",
        timestamp: "9:15 AM",
      },
      {
        id: "m8",
        senderId: "self",
        text: "Wait really?? That's cool. Are you driving back for winter break?",
        timestamp: "9:20 AM",
      },
      {
        id: "m9",
        senderId: "4",
        text: "Yeah! 10 hour drive but I like the road trip vibes. Want to split gas?",
        timestamp: "9:25 AM",
      },
    ],
  },
  {
    id: "conv3",
    participantId: "7",
    participantName: "Zara Okafor",
    participantAvatar: "ZO",
    lastActive: "Yesterday",
    messages: [
      {
        id: "m10",
        senderId: "7",
        text: "What comfort food from home do you wish you could find here?",
        timestamp: "Yesterday 8:00 PM",
        isIcebreaker: true,
      },
      {
        id: "m11",
        senderId: "self",
        text: "Honestly? A good bodega sandwich. Nothing here compares 😭",
        timestamp: "Yesterday 8:05 PM",
      },
      {
        id: "m12",
        senderId: "7",
        text: "THE ACCURACY. I found one deli that's close-ish though, I'll send you the location!",
        timestamp: "Yesterday 8:10 PM",
      },
    ],
  },
];

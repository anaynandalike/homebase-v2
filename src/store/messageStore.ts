import { create } from "zustand";
import { conversations, type Conversation, type Message } from "@/data/messages";

interface MessageStore {
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversation: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  connectedStudents: string[];
  connectStudent: (studentId: string) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  conversations: conversations,
  activeConversationId: null,
  setActiveConversation: (id) => set({ activeConversationId: id }),
  sendMessage: (conversationId, text) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              lastActive: "Just now",
              messages: [
                ...conv.messages,
                {
                  id: `m${Date.now()}`,
                  senderId: "self",
                  text,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  }),
                },
              ],
            }
          : conv
      ),
    })),
  connectedStudents: ["1", "4", "7"],
  connectStudent: (studentId) =>
    set((state) => ({
      connectedStudents: [...state.connectedStudents, studentId],
    })),
}));

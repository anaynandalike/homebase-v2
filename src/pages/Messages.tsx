import { useState, useRef, useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { EmptyState } from "@/components/EmptyState";
import { useMessageStore } from "@/store/messageStore";
import { motion } from "framer-motion";
import { Send, MessageCircle, Snowflake, ArrowLeft } from "lucide-react";

export default function Messages() {
  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    sendMessage,
  } = useMessageStore();

  const [input, setInput] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages.length]);

  const handleSend = () => {
    if (input.trim() && activeConversationId) {
      sendMessage(activeConversationId, input.trim());
      setInput("");
    }
  };

  const selectConversation = (id: string) => {
    setActiveConversation(id);
    setMobileShowChat(true);
  };

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-5 py-6">
        <div className="mb-5">
          <h1 className="font-heading text-2xl font-bold text-charcoal">
            Messages
          </h1>
          <p className="text-warmgray text-sm mt-0.5">
            Chat with your connections
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-sand/60 overflow-hidden h-[calc(100vh-200px)] min-h-[500px] flex">
          {/* Sidebar */}
          <div
            className={`w-full md:w-72 border-r border-sand/40 flex flex-col ${
              mobileShowChat ? "hidden md:flex" : "flex"
            }`}
          >
            <div className="px-4 py-3 border-b border-sand/40">
              <p className="text-xs font-semibold text-warmgray uppercase tracking-wider">
                Conversations
              </p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => {
                const lastMsg = conv.messages[conv.messages.length - 1];
                const isActive = activeConversationId === conv.id;
                return (
                  <button
                    key={conv.id}
                    onClick={() => selectConversation(conv.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors border-b border-sand/20 ${
                      isActive ? "bg-red/5" : "hover:bg-cream/40"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isActive
                          ? "bg-red text-white"
                          : "bg-gradient-to-br from-sand to-cream-dark text-charcoal"
                      }`}
                    >
                      {conv.participantAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-charcoal">
                          {conv.participantName}
                        </span>
                        <span className="text-[10px] text-warmgray-light">
                          {conv.lastActive}
                        </span>
                      </div>
                      <p className="text-[11px] text-warmgray truncate mt-0.5">
                        {lastMsg.text}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat */}
          <div
            className={`flex-1 flex flex-col ${
              !mobileShowChat ? "hidden md:flex" : "flex"
            }`}
          >
            {activeConversation ? (
              <>
                <div className="px-4 py-3 border-b border-sand/40 flex items-center gap-3">
                  <button
                    onClick={() => setMobileShowChat(false)}
                    className="md:hidden text-warmgray"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-8 h-8 bg-red rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    {activeConversation.participantAvatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-charcoal">
                      {activeConversation.participantName}
                    </p>
                    <p className="text-[10px] text-warmgray-light">
                      {activeConversation.lastActive}
                    </p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {activeConversation.messages.map((msg) => {
                    const isSelf = msg.senderId === "self";
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          isSelf ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                            msg.isIcebreaker
                              ? "bg-red-bg border border-red/10"
                              : isSelf
                              ? "bg-red text-white"
                              : "bg-cream"
                          }`}
                        >
                          {msg.isIcebreaker && (
                            <div className="flex items-center gap-1 mb-1">
                              <Snowflake className="w-3 h-3 text-red" />
                              <span className="text-[10px] text-red font-semibold">
                                Icebreaker
                              </span>
                            </div>
                          )}
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-[10px] mt-1 ${
                              isSelf && !msg.isIcebreaker
                                ? "text-white/50"
                                : "text-warmgray-light"
                            }`}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t border-sand/40">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2.5 rounded-full border border-sand bg-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-red/20"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="w-10 h-10 bg-red text-white rounded-full flex items-center justify-center hover:bg-red-dark transition-colors disabled:opacity-40"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <EmptyState
                  icon={<MessageCircle className="w-8 h-8" />}
                  title="Select a conversation"
                  description="Choose a chat from the sidebar."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

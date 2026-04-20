import { useState, useRef, useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { EmptyState } from "@/components/EmptyState";
import { useMessageStore } from "@/store/messageStore";
import { motion } from "framer-motion";
import { Send, MessageCircle, Snowflake } from "lucide-react";

export default function Messages() {
  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    sendMessage,
  } = useMessageStore();

  const [input, setInput] = useState("");
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

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            Messages
          </h1>
          <p className="text-warmgray text-base mt-1">
            Chat with your connections
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-sand/60 overflow-hidden h-[calc(100vh-220px)] min-h-[500px] flex">
          {/* Sidebar - Conversation List */}
          <div className="w-80 border-r border-sand/30 flex flex-col shrink-0">
            <div className="px-5 py-4 border-b border-sand/30">
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
                    onClick={() => setActiveConversation(conv.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors border-b border-sand/20 ${
                      isActive ? "bg-red/5" : "hover:bg-cream/30"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
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
                        <span className="text-xs text-warmgray-light">
                          {conv.lastActive}
                        </span>
                      </div>
                      <p className="text-sm text-warmgray truncate mt-0.5">
                        {lastMsg.text}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          {activeConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-sand/30 flex items-center gap-4">
                <div className="w-10 h-10 bg-red rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {activeConversation.participantAvatar}
                </div>
                <div>
                  <p className="font-medium text-base text-charcoal">
                    {activeConversation.participantName}
                  </p>
                  <p className="text-xs text-warmgray-light">
                    {activeConversation.lastActive}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                        className={`max-w-[60%] rounded-2xl px-5 py-3 ${
                          msg.isIcebreaker
                            ? "bg-red-bg border border-red/10"
                            : isSelf
                            ? "bg-red text-white"
                            : "bg-cream"
                        }`}
                      >
                        {msg.isIcebreaker && (
                          <div className="flex items-center gap-1 mb-1">
                            <Snowflake className="w-3.5 h-3.5 text-red" />
                            <span className="text-xs text-red font-semibold">
                              Icebreaker
                            </span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isSelf && !msg.isIcebreaker
                              ? "text-white/40"
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

              {/* Input */}
              <div className="p-4 border-t border-sand/30">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-5 py-3 rounded-full border border-sand bg-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-red/20"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-11 h-11 bg-red text-white rounded-full flex items-center justify-center hover:bg-red-dark transition-colors disabled:opacity-40"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon={<MessageCircle className="w-10 h-10" />}
                title="Select a conversation"
                description="Choose a conversation from the sidebar to start chatting."
              />
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

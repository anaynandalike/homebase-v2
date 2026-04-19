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
      <div className="max-w-[430px] mx-auto px-4 py-5">
        <div className="mb-4">
          <h1 className="font-heading text-xl font-bold text-charcoal">
            Messages
          </h1>
          <p className="text-warmgray text-[11px] mt-0.5">
            Chat with your connections
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-sand/60 overflow-hidden h-[calc(100vh-160px)] min-h-[420px] flex flex-col">
          {/* List or Chat */}
          {!mobileShowChat || !activeConversation ? (
            /* Conversation List */
            <div className="flex-1 overflow-y-auto">
              <div className="px-3.5 py-2.5 border-b border-sand/30">
                <p className="text-[10px] font-semibold text-warmgray uppercase tracking-wider">
                  Conversations
                </p>
              </div>
              {conversations.map((conv) => {
                const lastMsg = conv.messages[conv.messages.length - 1];
                const isActive = activeConversationId === conv.id;
                return (
                  <button
                    key={conv.id}
                    onClick={() => selectConversation(conv.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 text-left transition-colors border-b border-sand/20 ${
                      isActive ? "bg-red/5" : "hover:bg-cream/30"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isActive
                          ? "bg-red text-white"
                          : "bg-gradient-to-br from-sand to-cream-dark text-charcoal"
                      }`}
                    >
                      {conv.participantAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs text-charcoal">
                          {conv.participantName}
                        </span>
                        <span className="text-[9px] text-warmgray-light">
                          {conv.lastActive}
                        </span>
                      </div>
                      <p className="text-[10px] text-warmgray truncate mt-0.5">
                        {lastMsg.text}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Chat View */
            <>
              <div className="px-3.5 py-2.5 border-b border-sand/30 flex items-center gap-2.5">
                <button
                  onClick={() => setMobileShowChat(false)}
                  className="text-warmgray"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="w-7 h-7 bg-red rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                  {activeConversation.participantAvatar}
                </div>
                <div>
                  <p className="font-medium text-xs text-charcoal">
                    {activeConversation.participantName}
                  </p>
                  <p className="text-[9px] text-warmgray-light">
                    {activeConversation.lastActive}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                {activeConversation.messages.map((msg) => {
                  const isSelf = msg.senderId === "self";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        isSelf ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                          msg.isIcebreaker
                            ? "bg-red-bg border border-red/10"
                            : isSelf
                            ? "bg-red text-white"
                            : "bg-cream"
                        }`}
                      >
                        {msg.isIcebreaker && (
                          <div className="flex items-center gap-0.5 mb-0.5">
                            <Snowflake className="w-2.5 h-2.5 text-red" />
                            <span className="text-[8px] text-red font-semibold">
                              Icebreaker
                            </span>
                          </div>
                        )}
                        <p className="text-xs leading-relaxed">{msg.text}</p>
                        <p
                          className={`text-[9px] mt-0.5 ${
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

              <div className="p-2.5 border-t border-sand/30">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 rounded-full border border-sand bg-cream/30 text-xs focus:outline-none focus:ring-2 focus:ring-red/20"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-8 h-8 bg-red text-white rounded-full flex items-center justify-center hover:bg-red-dark transition-colors disabled:opacity-40"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Terminal, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "assistant" | "user" | "system";
  content: string;
}

const WELCOME_MESSAGE =
  "Hey! I'm the ChabadLabs assistant. Ask me about AI tools, Nanoclaw, or how to get started. I'm still in beta — for complex questions, our WhatsApp community is the best resource.";

const mockResponses = [
  {
    keywords: ["nanoclaw"],
    response:
      "Nanoclaw is a secure AI agent framework built for shluchim. Check out nanoclaw.dev or our Get Started page to deploy your own.",
  },
  {
    keywords: ["tool", "resource"],
    response:
      "We have 60+ curated AI tools on our Tools page — from ChatGPT to design tools to Jewish-specific resources.",
  },
  {
    keywords: ["webinar", "watch", "learn"],
    response:
      "Check out our Webinar Archive for recorded sessions on AI basics, tools deep dives, and Nanoclaw deployment.",
  },
  {
    keywords: ["grant", "fund", "money", "support"],
    response:
      "Visit our Fund page to learn about grants for builders, or tip the team to keep ChabadLabs free.",
  },
  {
    keywords: ["start", "begin", "new", "how"],
    response:
      "Head to our Get Started page for a step-by-step guide — from choosing your first AI tool to deploying your own agent.",
  },
  {
    keywords: ["project", "built", "showcase"],
    response:
      "Check out Live Projects to see what shluchim are building — and submit your own project!",
  },
  {
    keywords: ["skill", "marketplace"],
    response:
      "The Skills Marketplace is coming soon! You'll be able to browse, install, and share community-built AI skills.",
  },
];

const FALLBACK_RESPONSE =
  "Great question! I'm still learning. For now, check our Tools page or join the WhatsApp community for help from fellow shluchim.";

const SUGGESTED_PROMPTS = [
  "What is Nanoclaw?",
  "Show me AI tools",
  "How do I get started?",
  "What grants are available?",
];

const STORAGE_KEY = "chabadlabs_chat_messages";

function getMatchedResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of mockResponses) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }
  return FALLBACK_RESPONSE;
}

function loadMessages(): Message[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: Message[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch {}
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = loadMessages();
    if (stored.length > 0) return stored;
    return [{ id: "welcome", role: "assistant", content: WELCOME_MESSAGE }];
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getMatchedResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
        },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendMessage(inputValue);
  };

  const handleClear = () => {
    const fresh = [{ id: "welcome", role: "assistant" as const, content: WELCOME_MESSAGE }];
    setMessages(fresh);
    saveMessages(fresh);
  };

  const showPrompts = messages.length <= 1;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-[0_0_30px_rgba(196,154,42,0.5)] flex items-center justify-center hover:shadow-[0_0_50px_rgba(196,154,42,0.8)] transition-shadow duration-300 group"
          >
            <div className="absolute -top-1 -right-1 bg-background text-primary text-[10px] font-bold px-1.5 py-0.5 rounded border border-primary z-10 shadow-[0_0_10px_var(--primary)]">
              BETA
            </div>
            <div
              className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30"
              style={{ animationDuration: "2s" }}
            />
            <div
              className="absolute inset-[-10px] rounded-full border border-primary animate-ping opacity-10"
              style={{ animationDuration: "2s", animationDelay: "1s" }}
            />
            <MessageSquare className="w-7 h-7" fill="currentColor" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] h-[550px] max-h-[calc(100vh-100px)] bg-card/95 backdrop-blur-xl border border-primary/30 shadow-[0_0_40px_rgba(196,154,42,0.15)] rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="h-16 border-b border-primary/20 bg-primary/5 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(196,154,42,0.3)] animate-glow-pulse">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm flex items-center gap-1.5 text-foreground">
                    ChabadLabs Assistant
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_var(--primary)]" />
                  </h3>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    NANOCLAW_SECURE_ENV
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  title="Clear chat"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth relative">
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_51%)] bg-[length:100%_4px] opacity-20 z-0" />

              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={cn(
                    "relative z-10 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "max-w-[85%] ml-auto bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 shadow-[0_0_15px_rgba(196,154,42,0.2)]"
                      : "max-w-[85%] mr-auto bg-secondary/80 border border-primary/20 text-secondary-foreground rounded-2xl rounded-bl-sm px-4 py-3"
                  )}
                >
                  <p>{msg.content}</p>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="max-w-[85%] mr-auto bg-secondary/80 border border-primary/20 rounded-2xl rounded-bl-sm px-4 py-3 relative z-10">
                  <div className="flex gap-1.5 items-center h-5">
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* Suggested prompts */}
              {showPrompts && !isTyping && (
                <div className="relative z-10 flex flex-wrap gap-2 mt-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary/80 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-primary/10 shrink-0">
              <p className="text-[10px] text-muted-foreground/50 text-center font-mono">
                Powered by ChabadLabs AI
              </p>
            </div>

            {/* Input Area */}
            <div className="p-4 pt-2 bg-background/80 shrink-0">
              <form onSubmit={handleSend} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything..."
                  disabled={isTyping}
                  className="w-full bg-secondary/50 border border-border rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_15px_var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

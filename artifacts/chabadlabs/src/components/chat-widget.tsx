import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  isHtml?: boolean;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "✨ Shalom! I'm the ChabadLabs assistant. I can help you find resources, understand AI concepts, or get started with Nanoclaw. What would you like to know?",
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newMessages = [
      ...messages,
      { id: Date.now().toString(), role: "user" as const, content: inputValue }
    ];
    setMessages(newMessages);
    setInputValue("");

    // Simulate typing delay then add hardcoded response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          isHtml: true,
          content: `I'm being set up and will be fully powered soon! In the meantime, here's what I'd suggest:
          <br/><br/>
          &rarr; <strong>New to AI?</strong> Check out our <a href="/resources" class="text-primary hover:underline">Resources</a> page<br/>
          &rarr; <strong>Ready to build?</strong> Head to <a href="/get-started" class="text-primary hover:underline">Get Started</a><br/>
          &rarr; <strong>Want to learn?</strong> Browse our <a href="/webinars" class="text-primary hover:underline">Webinars</a><br/><br/>
          You can also join the community chat for live help from fellow shluchim.`
        }
      ]);
    }, 800);
  };

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
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-[0_0_30px_rgba(196,154,42,0.3)] flex items-center justify-center hover:shadow-[0_0_40px_rgba(196,154,42,0.5)] transition-shadow duration-300 group"
          >
            <div className="absolute -top-1 -right-1 bg-background text-primary text-[9px] font-bold px-1.5 py-0.5 rounded border border-primary z-10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              BETA
            </div>
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20"></div>
            <MessageSquare className="w-6 h-6" fill="currentColor" />
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
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[400px] h-[550px] max-h-[calc(100vh-100px)] bg-card border-t-2 border-t-primary border-l border-r border-b border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="h-16 border-b border-border bg-secondary/50 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm flex items-center gap-1.5">
                    ChabadLabs Assistant
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-background rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "ml-auto bg-primary text-primary-foreground rounded-br-sm" 
                      : "mr-auto bg-secondary text-secondary-foreground rounded-bl-sm"
                  )}
                >
                  {msg.isHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background/50 border-t border-border shrink-0">
              <form onSubmit={handleSend} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full bg-secondary border border-border rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

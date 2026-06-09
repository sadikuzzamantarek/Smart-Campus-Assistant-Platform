import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { sendChatMessage } from "../../api/chat";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! I'm your Smart Campus AI assistant. Ask me about courses, teachers, deadlines, or campus events.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);

    try {
      const answer = await sendChatMessage(question);
      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
    } catch (err) {
      const apiAnswer =
        err.response?.data?.answer ||
        err.response?.data?.message ||
        err.response?.data?.detail;

      if (apiAnswer) {
        setMessages((prev) => [...prev, { role: "bot", text: String(apiAnswer) }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        {open && (
          <div className="animate-slide-up flex h-[70vh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:h-[520px] sm:w-[380px]">
            <div className="flex items-center justify-between bg-campus-primary px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Campus AI Assistant</p>
                  <p className="text-xs text-blue-200">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      msg.role === "user"
                        ? "bg-campus-secondary text-white"
                        : "bg-slate-100 text-campus-primary"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-sm bg-campus-secondary text-white"
                        : "rounded-tl-sm bg-slate-100 text-slate-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-slate-100 p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-campus-secondary focus:ring-2 focus:ring-blue-100"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-campus-secondary text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-campus-secondary text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700 active:scale-95"
          aria-label={open ? "Close chatbot" : "Open chatbot"}
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}

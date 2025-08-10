import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useMemo, useRef, useState, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import SignalStrengthBar from "@/components/SignalStrengthBar";
import { useSimulatedProximity } from "@/hooks/useSimulatedProximity";
import { validateMessage, sanitizeMessage, messageRateLimiter } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

interface Message { id: string; text: string; sender: "me" | "them"; createdAt: number }

export default function ChatPage() {
  const { id } = useParams();
  const { users } = useSimulatedProximity();
  const user = useMemo(() => users.find((u) => u.id === id) ?? users[0], [id, users]);

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hey, I can hear you over the airwaves!", sender: "them", createdAt: Date.now() - 60000 },
    { id: "2", text: "Loud and clear. What's up?", sender: "me", createdAt: Date.now() - 30000 },
  ]);
  const [draft, setDraft] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const send = async () => {
    if (isSubmitting) return;
    
    const text = draft.trim();
    if (!text) return;

    // Validate message
    const validation = validateMessage(text);
    if (!validation.isValid) {
      toast({
        title: "Invalid message",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    // Check rate limiting
    if (!messageRateLimiter.canSendMessage()) {
      const remainingTime = Math.ceil(messageRateLimiter.getRemainingTime() / 1000);
      toast({
        title: "Too many messages",
        description: `Please wait ${remainingTime} seconds before sending another message.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const sanitizedText = sanitizeMessage(text);
    const now = Date.now();
    
    try {
      setMessages((prev) => [
        ...prev,
        { id: String(now), text: sanitizedText, sender: "me", createdAt: now },
      ]);
      setDraft("");
      
      // Auto-scroll to bottom
      setTimeout(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
      
      // Simulate reply
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: String(now + 1), text: "Copy that. Over.", sender: "them", createdAt: now + 1000 },
        ]);
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      }, 1000);
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Helmet>
        <title>{user ? `${user.name} – Airwave Chat` : "Chat – Airwave Chatter"}</title>
        <meta name="description" content="Radio-style chat conversation with live signal indicator." />
        <link rel="canonical" href={`/chat/${id ?? ""}`} />
      </Helmet>

      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center gap-3 p-3">
          <Link to="/" aria-label="Back to welcome" className="hover-scale">
            <Button variant="ghost" size="icon"><ArrowLeft /></Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-semibold leading-tight">{user?.name ?? "Contact"}</h1>
            <p className="text-xs text-muted-foreground">{user?.handle}</p>
          </div>
          {user && <SignalStrengthBar signal={user.signal} />}
        </div>
      </header>

      <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[75%] ${m.sender === "me" ? "ml-auto" : ""}`}>
            <div className={`rounded-2xl px-4 py-2 shadow-elegant ${m.sender === "me" ? "bg-primary text-primary-foreground" : "glass"}`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="p-3 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Transmit a message…"
              maxLength={500}
              disabled={isSubmitting}
              className="w-full h-11 rounded-lg border bg-background px-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            />
            {draft.length > 0 && (
              <span className={`absolute right-3 top-3 text-xs ${
                draft.length > 450 ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                {draft.length}/500
              </span>
            )}
          </div>
          <Button 
            type="submit" 
            variant="hero" 
            size="icon" 
            aria-label="Send"
            disabled={isSubmitting || !draft.trim()}
          >
            <Send className={isSubmitting ? 'animate-pulse' : ''} />
          </Button>
        </div>
      </form>
    </main>
  );
}

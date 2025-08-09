import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import SignalStrengthBar from "@/components/SignalStrengthBar";
import { useSimulatedProximity } from "@/hooks/useSimulatedProximity";

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
  const listRef = useRef<HTMLDivElement>(null);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: String(now), text, sender: "me", createdAt: now },
    ]);
    setDraft("");
    // Simulate reply
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: String(now + 1), text: "Copy that. Over.", sender: "them", createdAt: now + 1000 },
      ]);
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, 1000);
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
          <Link to="/scan" aria-label="Back to scan" className="hover-scale">
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
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Transmit a message…"
            className="flex-1 h-11 rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" variant="hero" size="icon" aria-label="Send">
            <Send />
          </Button>
        </div>
      </form>
    </main>
  );
}

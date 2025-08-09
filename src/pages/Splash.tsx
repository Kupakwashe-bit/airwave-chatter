import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Splash() {
  // Signature moment: interactive light field reacting to pointer/touch
  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    target.style.setProperty("--mx", `${x}%`);
    target.style.setProperty("--my", `${y}%`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Helmet>
        <title>Airwave Chatter – Proximity Radio Chat</title>
        <meta name="description" content="Chat with people nearby over simulated radio waves. Scan, connect, and talk on Airwave Chatter." />
        <link rel="canonical" href="/" />
      </Helmet>

      <div
        className="absolute inset-0 -z-10"
        onMouseMove={onMove}
        onTouchMove={onMove}
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,30%), hsl(var(--brand) / 0.25), transparent 60%), radial-gradient(1000px circle at 50% -10%, hsl(var(--brand-2) / 0.20), transparent 50%)",
        }}
      />

      <section className="px-6 py-16 text-center w-full max-w-md animate-enter">
        <div className="mx-auto mb-6 w-14 h-14 rounded-xl bg-gradient-primary shadow-glow" />
        <h1 className="text-3xl font-bold tracking-tight mb-2">Airwave Chatter</h1>
        <p className="text-muted-foreground mb-8">A social, radio-inspired chat for people in range. Scan and start talking instantly.</p>

        <Link to="/scan">
          <Button size="lg" variant="hero" className="w-full hover-scale">Start Scanning</Button>
        </Link>

        <p className="mt-6 text-xs text-muted-foreground">By continuing you agree to our <span className="story-link">fair use policy</span>.</p>
      </section>
    </main>
  );
}

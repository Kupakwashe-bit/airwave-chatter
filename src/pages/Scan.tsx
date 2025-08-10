import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SignalStrengthBar from "@/components/SignalStrengthBar";
import { useSimulatedProximity } from "@/hooks/useSimulatedProximity";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Scan } from "lucide-react";

export default function ScanPage() {
  const { users } = useSimulatedProximity();

  return (
    <main className="min-h-screen p-4">
      <Helmet>
        <title>Scan Nearby – Airwave Chatter</title>
        <meta name="description" content="Discover people in range and connect over Airwave Chatter. See signal strength and distance." />
        <link rel="canonical" href="/scan" />
      </Helmet>

      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">People in Range</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="secondary" size="sm" className="hover-scale" aria-label="Rescan">
            <Scan className="mr-2" /> Rescan
          </Button>
        </div>
      </header>

      <section className="space-y-3 animate-fade-in">
        {users.map((u) => (
          <Link key={u.id} to={`/chat/${u.id}`} className="block">
            <article className="glass rounded-lg p-4 flex items-center justify-between hover-scale">
              <div>
                <h2 className="text-base font-medium">{u.name}</h2>
                <p className="text-sm text-muted-foreground">{u.handle} • ~{u.distanceMeters} m</p>
              </div>
              <SignalStrengthBar signal={u.signal} />
            </article>
          </Link>
        ))}
      </section>

      <footer className="mt-6 text-center text-xs text-muted-foreground">
        Scanning uses simulated radio strength for demo purposes.
      </footer>
    </main>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";

export type NearbyUser = {
  id: string;
  name: string;
  handle: string;
  distanceMeters: number; // simulated distance
  signal: number; // 0..1
};

const NAMES = [
  { name: "Alex Rivera", handle: "@alex" },
  { name: "Sam Lee", handle: "@sam" },
  { name: "Jordan Kim", handle: "@jordan" },
  { name: "Taylor Brooks", handle: "@taylor" },
  { name: "Casey Morgan", handle: "@casey" },
];

function clamp(n: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, n));
}

export function barsFromSignal(signal: number, bars = 5) {
  const level = Math.round(clamp(signal) * bars);
  return Math.min(Math.max(level, 0), bars);
}

export function useSimulatedProximity() {
  const [users, setUsers] = useState<NearbyUser[]>(() =>
    NAMES.map((p, i) => ({
      id: String(i + 1),
      name: p.name,
      handle: p.handle,
      distanceMeters: Math.round(5 + Math.random() * 95),
      signal: Math.random(),
    }))
  );

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setUsers((prev) =>
        prev.map((u) => {
          // small random walk for signal and distance
          const nextSignal = clamp(u.signal + (Math.random() - 0.5) * 0.15);
          const nextDistance = Math.max(
            1,
            Math.round(u.distanceMeters + (Math.random() - 0.5) * 6)
          );
          return { ...u, signal: nextSignal, distanceMeters: nextDistance };
        })
      );
    }, 1500);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const sorted = useMemo(
    () => [...users].sort((a, b) => b.signal - a.signal),
    [users]
  );

  return { users: sorted };
}

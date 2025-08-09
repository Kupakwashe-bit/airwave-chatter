import { barsFromSignal } from "@/hooks/useSimulatedProximity";

interface Props {
  signal: number; // 0..1
  className?: string;
  ariaLabel?: string;
}

export default function SignalStrengthBar({ signal, className = "", ariaLabel = "Signal strength" }: Props) {
  const bars = 5;
  const active = barsFromSignal(signal, bars);
  const heights = [10, 14, 18, 22, 26];

  return (
    <div className={`flex items-end gap-1 ${className}`} aria-label={ariaLabel} role="meter" aria-valuemin={0} aria-valuemax={bars} aria-valuenow={active}>
      {Array.from({ length: bars }).map((_, i) => {
        const filled = i < active;
        return (
          <div
            key={i}
            className={`w-1.5 rounded-sm transition-colors duration-200 ${filled ? "bg-primary" : "bg-border"}`}
            style={{ height: heights[i] }}
          />
        );
      })}
    </div>
  );
}

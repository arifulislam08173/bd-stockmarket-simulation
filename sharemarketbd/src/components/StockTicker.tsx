"use client";

import { stocks } from "@/data/stocks";
import { cn } from "@/lib/utils";

export function StockTicker() {
  // Duplicate for seamless loop
  const items = [...stocks, ...stocks];

  return (
    <div className="w-full border-b border-border bg-card">
      <div className="overflow-hidden">
        <div className="ticker-scroll flex w-max">
          {items.map((s, idx) => {
            const up = s.change > 0;
            const down = s.change < 0;

            return (
              <div
                key={`${s.symbol}-${idx}`}
                className="flex items-center gap-3 px-6 py-2 border-r border-border whitespace-nowrap"
              >
                <span className="font-semibold text-foreground">{s.symbol}</span>
                <span className="font-mono text-muted-foreground">
                  ৳{s.ltp.toFixed(2)}
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    up && "text-stock-up",
                    down && "text-stock-down",
                    !up && !down && "text-stock-neutral"
                  )}
                >
                  {s.changePercent >= 0 ? "+" : ""}
                  {s.changePercent.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

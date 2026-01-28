import { stocks } from '@/data/stocks';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StockTicker() {
  const tickerStocks = stocks.slice(0, 15);

  return (
    <div className="bg-card border-b border-border overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap py-2">
        {[...tickerStocks, ...tickerStocks].map((stock, index) => {
          const isPositive = stock.change > 0;
          const isNegative = stock.change < 0;

          return (
            <div
              key={`${stock.symbol}-${index}`}
              className="inline-flex items-center gap-2 px-4 border-r border-border last:border-r-0"
            >
              <span className="font-semibold text-foreground text-sm">{stock.symbol}</span>
              <span className="text-muted-foreground text-sm font-mono">৳{stock.ltp.toFixed(2)}</span>
              <span className={cn(
                "inline-flex items-center gap-1 text-xs font-medium",
                isPositive && "text-stock-up",
                isNegative && "text-stock-down",
                !isPositive && !isNegative && "text-stock-neutral"
              )}>
                {isPositive && <TrendingUp className="w-3 h-3" />}
                {isNegative && <TrendingDown className="w-3 h-3" />}
                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

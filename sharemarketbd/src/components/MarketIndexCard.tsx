import { MarketIndex } from '@/types/stock';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketIndexCardProps {
  index: MarketIndex;
}

export function MarketIndexCard({ index }: MarketIndexCardProps) {
  const isPositive = index.change > 0;
  const isNegative = index.change < 0;
  
  return (
    <div className="bg-card rounded-lg p-4 shadow-md card-hover border border-border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display font-bold text-lg text-foreground">{index.name}</h3>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
          isPositive && "bg-stock-up-bg text-stock-up",
          isNegative && "bg-stock-down-bg text-stock-down",
          !isPositive && !isNegative && "bg-stock-neutral-bg text-stock-neutral"
        )}>
          {isPositive && <TrendingUp className="w-3 h-3" />}
          {isNegative && <TrendingDown className="w-3 h-3" />}
          {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
          <span>{index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground font-display">
          {index.value.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className={cn(
          "text-sm font-medium",
          isPositive && "text-stock-up",
          isNegative && "text-stock-down",
          !isPositive && !isNegative && "text-stock-neutral"
        )}>
          {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

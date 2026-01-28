import { Stock, getStockPerformance } from '@/types/stock';
import { TrendingUp, TrendingDown, Minus, Star, StarOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/store/useStore';

interface StockTableProps {
  stocks: Stock[];
  onTradeClick?: (stock: Stock) => void;
  showActions?: boolean;
}

export function StockTable({ stocks, onTradeClick, showActions = true }: StockTableProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = usePortfolioStore();

  const toggleWatchlist = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (watchlist.includes(symbol)) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist(symbol);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Symbol</th>
            <th className="text-right py-3 px-4 font-semibold text-muted-foreground">LTP</th>
            <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Change</th>
            <th className="text-right py-3 px-4 font-semibold text-muted-foreground hidden sm:table-cell">Volume</th>
            <th className="text-right py-3 px-4 font-semibold text-muted-foreground hidden md:table-cell">High</th>
            <th className="text-right py-3 px-4 font-semibold text-muted-foreground hidden md:table-cell">Low</th>
            <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Status</th>
            {showActions && (
              <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            const performance = getStockPerformance(stock.changePercent);
            const isPositive = stock.change > 0;
            const isNegative = stock.change < 0;
            const isInWatchlist = watchlist.includes(stock.symbol);

            return (
              <tr 
                key={stock.symbol} 
                className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onTradeClick?.(stock)}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleWatchlist(stock.symbol, e)}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      {isInWatchlist ? (
                        <Star className="w-4 h-4 fill-accent text-accent" />
                      ) : (
                        <StarOff className="w-4 h-4" />
                      )}
                    </button>
                    <div>
                      <span className="font-semibold text-foreground">{stock.symbol}</span>
                      <p className="text-xs text-muted-foreground truncate max-w-[120px]">{stock.name}</p>
                    </div>
                  </div>
                </td>
                <td className="text-right py-3 px-4 font-mono font-medium text-foreground">
                  ৳{stock.ltp.toFixed(2)}
                </td>
                <td className="text-right py-3 px-4">
                  <div className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
                    isPositive && "bg-stock-up-bg text-stock-up",
                    isNegative && "bg-stock-down-bg text-stock-down",
                    !isPositive && !isNegative && "bg-stock-neutral-bg text-stock-neutral"
                  )}>
                    {isPositive && <TrendingUp className="w-3 h-3" />}
                    {isNegative && <TrendingDown className="w-3 h-3" />}
                    {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
                    <span>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
                  </div>
                </td>
                <td className="text-right py-3 px-4 font-mono text-muted-foreground hidden sm:table-cell">
                  {stock.volume.toLocaleString()}
                </td>
                <td className="text-right py-3 px-4 font-mono text-muted-foreground hidden md:table-cell">
                  ৳{stock.high.toFixed(2)}
                </td>
                <td className="text-right py-3 px-4 font-mono text-muted-foreground hidden md:table-cell">
                  ৳{stock.low.toFixed(2)}
                </td>
                <td className="text-center py-3 px-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-semibold",
                    performance === 'good' && "bg-stock-up-bg text-stock-up",
                    performance === 'bad' && "bg-stock-down-bg text-stock-down",
                    performance === 'normal' && "bg-stock-neutral-bg text-stock-neutral"
                  )}>
                    {performance === 'good' ? 'Good' : performance === 'bad' ? 'Bad' : 'Normal'}
                  </span>
                </td>
                {showActions && (
                  <td className="text-center py-3 px-4">
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTradeClick?.(stock);
                      }}
                    >
                      Trade
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

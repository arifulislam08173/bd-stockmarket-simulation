import { useState } from 'react';
import { Stock } from '@/types/stock';
import { useAuthStore, usePortfolioStore } from '@/store/useStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface TradeDialogProps {
  stock: Stock | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TradeDialog({ stock, open, onOpenChange }: TradeDialogProps) {
  const [quantity, setQuantity] = useState('1');
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const { user } = useAuthStore();
  const { buyStock, sellStock, portfolio } = usePortfolioStore();

  if (!stock) return null;

  const portfolioItem = portfolio.find(p => p.symbol === stock.symbol);
  const quantityNum = parseInt(quantity) || 0;
  const total = quantityNum * stock.ltp;
  const canBuy = user && user.balance >= total && quantityNum > 0;
  const canSell = portfolioItem && portfolioItem.quantity >= quantityNum && quantityNum > 0;

  const handleTrade = () => {
    if (activeTab === 'buy') {
      if (!canBuy) {
        toast.error('Insufficient balance or invalid quantity');
        return;
      }
      const success = buyStock(stock.symbol, quantityNum, stock.ltp);
      if (success) {
        toast.success(`Successfully bought ${quantityNum} shares of ${stock.symbol}`);
        onOpenChange(false);
        setQuantity('1');
      } else {
        toast.error('Failed to complete purchase');
      }
    } else {
      if (!canSell) {
        toast.error('Insufficient shares or invalid quantity');
        return;
      }
      const success = sellStock(stock.symbol, quantityNum, stock.ltp);
      if (success) {
        toast.success(`Successfully sold ${quantityNum} shares of ${stock.symbol}`);
        onOpenChange(false);
        setQuantity('1');
      } else {
        toast.error('Failed to complete sale');
      }
    }
  };

  const isPositive = stock.change > 0;
  const isNegative = stock.change < 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            Trade {stock.symbol}
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
              isPositive && "bg-stock-up-bg text-stock-up",
              isNegative && "bg-stock-down-bg text-stock-down",
              !isPositive && !isNegative && "bg-stock-neutral-bg text-stock-neutral"
            )}>
              {isPositive && <TrendingUp className="w-3 h-3" />}
              {isNegative && <TrendingDown className="w-3 h-3" />}
              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </span>
          </DialogTitle>
          <DialogDescription>{stock.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground">Current Price</p>
              <p className="text-xl font-bold font-mono text-foreground">৳{stock.ltp.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Your Balance</p>
              <p className="text-xl font-bold font-mono text-foreground">
                ৳{(user?.balance || 0).toLocaleString('en-BD', { minimumFractionDigits: 2 })}
              </p>
            </div>
            {portfolioItem && (
              <>
                <div>
                  <p className="text-xs text-muted-foreground">Shares Owned</p>
                  <p className="text-lg font-semibold text-foreground">{portfolioItem.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg. Price</p>
                  <p className="text-lg font-semibold font-mono text-foreground">৳{portfolioItem.avgPrice.toFixed(2)}</p>
                </div>
              </>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'buy' | 'sell')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
  value="buy"
  className="data-[state=active]:bg-stock-up data-[state=active]:text-white"
>
  Buy
</TabsTrigger>

<TabsTrigger
  value="sell"
  className="data-[state=active]:bg-stock-down data-[state=active]:text-white"
>
  Sell
</TabsTrigger>

            </TabsList>

            <TabsContent value="buy" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="buy-quantity">Quantity</Label>
                <Input
                  id="buy-quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Total Cost</span>
                <span className="font-bold font-mono text-foreground">
                  ৳{total.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
                </span>
              </div>
              {!canBuy && quantityNum > 0 && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Insufficient balance</span>
                </div>
              )}
              <Button 
                onClick={handleTrade} 
                disabled={!canBuy}
                className="w-full bg-stock-up text-white hover:bg-stock-up/90"
              >
                Buy {quantityNum > 0 && `${quantityNum} Shares`}
              </Button>
            </TabsContent>

            <TabsContent value="sell" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="sell-quantity">Quantity</Label>
                <Input
                  id="sell-quantity"
                  type="number"
                  min="1"
                  max={portfolioItem?.quantity || 0}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
                {portfolioItem && (
                  <p className="text-xs text-muted-foreground">
                    Max: {portfolioItem.quantity} shares
                  </p>
                )}
              </div>
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Total Value</span>
                <span className="font-bold font-mono text-foreground">
                  ৳{total.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
                </span>
              </div>
              {!portfolioItem && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>You don't own any shares of this stock</span>
                </div>
              )}
              {portfolioItem && !canSell && quantityNum > 0 && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Insufficient shares</span>
                </div>
              )}
              <Button 
                onClick={handleTrade} 
                disabled={!canSell}
                className="w-full bg-stock-down text-white hover:bg-stock-down/90"
              >
                Sell {quantityNum > 0 && `${quantityNum} Shares`}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

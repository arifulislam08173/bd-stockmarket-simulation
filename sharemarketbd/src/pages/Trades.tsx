import { Navigate } from 'react-router-dom';
import { useAuthStore, usePortfolioStore } from '@/store/useStore';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function Trades() {
  const { isAuthenticated } = useAuthStore();
  const { trades } = usePortfolioStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 space-y-6 animate-fade-in">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Trade History</h2>
          <p className="text-muted-foreground text-sm">View all your past transactions</p>
        </div>

        <Card className="shadow-md border-border">
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {trades.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date & Time</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Stock</th>
                      <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Type</th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Qty</th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Price</th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trades.map((trade) => {
                      const isBuy = trade.type === 'buy';
                      return (
                        <tr key={trade.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4 text-muted-foreground">
                            <div>
                              <span className="block">{format(new Date(trade.date), 'MMM dd, yyyy')}</span>
                              <span className="text-xs">{format(new Date(trade.date), 'hh:mm a')}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <span className="font-semibold text-foreground">{trade.symbol}</span>
                              <p className="text-xs text-muted-foreground truncate max-w-[150px]">{trade.name}</p>
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className={cn(
                              "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
                              isBuy ? "bg-stock-up-bg text-stock-up" : "bg-stock-down-bg text-stock-down"
                            )}>
                              {isBuy ? (
                                <ArrowUpRight className="w-3 h-3" />
                              ) : (
                                <ArrowDownRight className="w-3 h-3" />
                              )}
                              {isBuy ? 'BUY' : 'SELL'}
                            </span>
                          </td>
                          <td className="text-right py-4 px-4 font-mono text-foreground">
                            {trade.quantity}
                          </td>
                          <td className="text-right py-4 px-4 font-mono text-muted-foreground">
                            ৳{trade.price.toFixed(2)}
                          </td>
                          <td className="text-right py-4 px-4 font-mono font-medium text-foreground">
                            ৳{trade.total.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <History className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">No trades yet</p>
                <p className="text-sm">Your transaction history will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

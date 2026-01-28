"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore, usePortfolioStore } from "@/store/useStore";
import { Header } from "@/components/Header";
import { TradeDialog } from "@/components/TradeDialog";
import { PortfolioSummary } from "@/components/PortfolioSummary";
import { getStockBySymbol } from "@/data/stocks";
import type { Stock } from "@/types/stock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PortfolioPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { portfolio } = usePortfolioStore();

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);

  // Prevent hydration mismatch due to Zustand persist
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) return null;
  if (!isAuthenticated) return null;

  const handleTradeClick = (symbol: string) => {
    const stock = getStockBySymbol(symbol);
    if (stock) {
      setSelectedStock(stock);
      setTradeDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6 space-y-6 animate-fade-in">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            My Portfolio
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage your stock holdings
          </p>
        </div>

        <PortfolioSummary />

        <Card className="shadow-md border border-border">
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Holdings
            </CardTitle>
          </CardHeader>

          <CardContent>
            {portfolio.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Stock
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                        Qty
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                        Avg Price
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                        Current
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                        Value
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                        P&amp;L
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-muted-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {portfolio.map((item) => {
                      const isPositive = item.profit >= 0;

                      return (
                        <tr
                          key={item.symbol}
                          className="border-b border-border hover:bg-muted/30 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div>
                              <span className="font-semibold text-foreground">
                                {item.symbol}
                              </span>
                              <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                                {item.name}
                              </p>
                            </div>
                          </td>

                          <td className="text-right py-4 px-4 font-mono text-foreground">
                            {item.quantity}
                          </td>

                          <td className="text-right py-4 px-4 font-mono text-muted-foreground">
                            ৳{item.avgPrice.toFixed(2)}
                          </td>

                          <td className="text-right py-4 px-4 font-mono text-foreground">
                            ৳{item.currentPrice.toFixed(2)}
                          </td>

                          <td className="text-right py-4 px-4 font-mono font-medium text-foreground">
                            ৳
                            {item.totalValue.toLocaleString("en-BD", {
                              minimumFractionDigits: 2,
                            })}
                          </td>

                          <td className="text-right py-4 px-4">
                            <div
                              className={cn(
                                "inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium",
                                isPositive
                                  ? "bg-stock-up-bg text-stock-up"
                                  : "bg-stock-down-bg text-stock-down"
                              )}
                            >
                              {isPositive ? (
                                <ArrowUpRight className="w-3 h-3" />
                              ) : (
                                <ArrowDownRight className="w-3 h-3" />
                              )}
                              <span>
                                {isPositive ? "+" : ""}৳{item.profit.toFixed(2)}
                              </span>
                              <span className="opacity-70">
                                ({isPositive ? "+" : ""}
                                {item.profitPercent.toFixed(2)}%)
                              </span>
                            </div>
                          </td>

                          <td className="text-center py-4 px-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleTradeClick(item.symbol)}
                            >
                              Trade
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">No holdings yet</p>
                <p className="text-sm">Start trading to build your portfolio!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <TradeDialog
        stock={selectedStock}
        open={tradeDialogOpen}
        onOpenChange={setTradeDialogOpen}
      />
    </div>
  );
}

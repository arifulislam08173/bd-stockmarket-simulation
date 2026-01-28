import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore, usePortfolioStore } from '@/store/useStore';
import { Header } from '@/components/Header';
import { StockTicker } from '@/components/StockTicker';
import { MarketIndexCard } from '@/components/MarketIndexCard';
import { PortfolioSummary } from '@/components/PortfolioSummary';
import { StockTable } from '@/components/StockTable';
import { TradeDialog } from '@/components/TradeDialog';
import { marketIndices, stocks, getTopGainers, getTopLosers, getMostActive, searchStocks } from '@/data/stocks';
import { Stock } from '@/types/stock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, TrendingUp, TrendingDown, Activity, Clock, Star } from 'lucide-react';

export default function Dashboard() {
  const { isAuthenticated } = useAuthStore();
  const { watchlist } = usePortfolioStore();
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const handleTradeClick = (stock: Stock) => {
    setSelectedStock(stock);
    setTradeDialogOpen(true);
  };

  const filteredStocks = searchQuery ? searchStocks(searchQuery) : stocks;
  const watchlistStocks = stocks.filter(s => watchlist.includes(s.symbol));

  const currentDate = new Date().toLocaleDateString('en-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StockTicker />
      
      <main className="container py-6 space-y-6 animate-fade-in">
        {/* Market Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Market Overview</h2>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {currentDate}
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-stock-down-bg text-stock-down">
                Market Closed
              </span>
            </p>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Market Indices */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {marketIndices.map((index) => (
            <MarketIndexCard key={index.name} index={index} />
          ))}
        </div>

        {/* Portfolio Summary */}
        <PortfolioSummary />

        {/* Stock Lists */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="all" className="gap-1">
              <Activity className="w-4 h-4" />
              All Stocks
            </TabsTrigger>
            <TabsTrigger value="gainers" className="gap-1">
              <TrendingUp className="w-4 h-4" />
              Top Gainers
            </TabsTrigger>
            <TabsTrigger value="losers" className="gap-1">
              <TrendingDown className="w-4 h-4" />
              Top Losers
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-1">
              <Activity className="w-4 h-4" />
              Most Active
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="gap-1">
              <Star className="w-4 h-4" />
              Watchlist ({watchlistStocks.length})
            </TabsTrigger>
          </TabsList>

          <Card className="shadow-md border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-display">Stocks</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <TabsContent value="all" className="mt-0">
                <StockTable stocks={filteredStocks} onTradeClick={handleTradeClick} />
              </TabsContent>
              <TabsContent value="gainers" className="mt-0">
                <StockTable stocks={getTopGainers()} onTradeClick={handleTradeClick} />
              </TabsContent>
              <TabsContent value="losers" className="mt-0">
                <StockTable stocks={getTopLosers()} onTradeClick={handleTradeClick} />
              </TabsContent>
              <TabsContent value="active" className="mt-0">
                <StockTable stocks={getMostActive()} onTradeClick={handleTradeClick} />
              </TabsContent>
              <TabsContent value="watchlist" className="mt-0">
                {watchlistStocks.length > 0 ? (
                  <StockTable stocks={watchlistStocks} onTradeClick={handleTradeClick} />
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Star className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>No stocks in your watchlist yet.</p>
                    <p className="text-sm">Click the star icon on any stock to add it.</p>
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </main>

      <TradeDialog
        stock={selectedStock}
        open={tradeDialogOpen}
        onOpenChange={setTradeDialogOpen}
      />

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>BD Stock Sim - Bangladesh Stock Trading Simulator</p>
          <p className="text-xs mt-1">This is a simulation for educational purposes. No real money is involved.</p>
        </div>
      </footer>
    </div>
  );
}

import { usePortfolioStore, useAuthStore } from '@/store/useStore';
import { TrendingUp, TrendingDown, Wallet, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PortfolioSummary() {
  const { portfolio } = usePortfolioStore();
  const { user } = useAuthStore();

  const totalInvested = portfolio.reduce((sum, item) => sum + (item.avgPrice * item.quantity), 0);
  const totalValue = portfolio.reduce((sum, item) => sum + item.totalValue, 0);
  const totalProfit = totalValue - totalInvested;
  const totalProfitPercent = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
  const isPositive = totalProfit >= 0;

  const stats = [
    {
      label: 'Cash Balance',
      value: user?.balance || 0,
      icon: Wallet,
      format: 'currency',
    },
    {
      label: 'Portfolio Value',
      value: totalValue,
      icon: PieChart,
      format: 'currency',
    },
    {
      label: 'Total P&L',
      value: totalProfit,
      percent: totalProfitPercent,
      icon: isPositive ? TrendingUp : TrendingDown,
      format: 'profit',
      isPositive,
    },
    {
      label: 'Net Worth',
      value: (user?.balance || 0) + totalValue,
      icon: TrendingUp,
      format: 'currency',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-card rounded-lg p-4 shadow-md border border-border card-hover"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <Icon className={cn(
                "w-5 h-5",
                stat.format === 'profit' 
                  ? (stat.isPositive ? "text-stock-up" : "text-stock-down")
                  : "text-primary"
              )} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "text-xl font-bold font-mono",
                stat.format === 'profit' 
                  ? (stat.isPositive ? "text-stock-up" : "text-stock-down")
                  : "text-foreground"
              )}>
                {stat.format === 'profit' && stat.value >= 0 && '+'}
                ৳{stat.value.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {stat.percent !== undefined && (
                <span className={cn(
                  "text-xs font-medium",
                  stat.isPositive ? "text-stock-up" : "text-stock-down"
                )}>
                  ({stat.percent >= 0 ? '+' : ''}{stat.percent.toFixed(2)}%)
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

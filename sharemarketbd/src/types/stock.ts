export interface Stock {
  symbol: string;
  name: string;
  ltp: number; // Last Traded Price
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  ycp: number; // Yesterday's Closing Price
  category: 'A' | 'B' | 'N' | 'Z';
  sector: string;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface PortfolioItem {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  profit: number;
  profitPercent: number;
}

export interface Trade {
  id: string;
  symbol: string;
  name: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  date: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  portfolioValue: number;
}

export type StockPerformance = 'good' | 'normal' | 'bad';

export const getStockPerformance = (changePercent: number): StockPerformance => {
  if (changePercent >= 2) return 'good';
  if (changePercent <= -2) return 'bad';
  return 'normal';
};

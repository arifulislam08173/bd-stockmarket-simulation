import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PortfolioItem, Trade, User } from '@/types/stock';
import { getStockBySymbol } from '@/data/stocks';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface PortfolioState {
  portfolio: PortfolioItem[];
  trades: Trade[];
  watchlist: string[];
  buyStock: (symbol: string, quantity: number, price: number) => boolean;
  sellStock: (symbol: string, quantity: number, price: number) => boolean;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  updatePortfolioPrices: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate login - in production, this would hit an API
        if (email && password.length >= 6) {
          const user: User = {
            id: crypto.randomUUID(),
            name: email.split('@')[0],
            email,
            balance: 1000000, // 10 Lakh starting balance
            portfolioValue: 0,
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      signup: async (name: string, email: string, password: string) => {
        if (name && email && password.length >= 6) {
          const user: User = {
            id: crypto.randomUUID(),
            name,
            email,
            balance: 1000000,
            portfolioValue: 0,
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      portfolio: [],
      trades: [],
      watchlist: [],
      buyStock: (symbol: string, quantity: number, price: number) => {
        const stock = getStockBySymbol(symbol);
        if (!stock) return false;
        
        const total = quantity * price;
        const authStore = useAuthStore.getState();
        
        if (!authStore.user || authStore.user.balance < total) {
          return false;
        }

        const newTrade: Trade = {
          id: crypto.randomUUID(),
          symbol,
          name: stock.name,
          type: 'buy',
          quantity,
          price,
          total,
          date: new Date(),
        };

        set((state) => {
          const existingItem = state.portfolio.find(p => p.symbol === symbol);
          let newPortfolio: PortfolioItem[];

          if (existingItem) {
            const totalQuantity = existingItem.quantity + quantity;
            const totalCost = (existingItem.avgPrice * existingItem.quantity) + total;
            const newAvgPrice = totalCost / totalQuantity;
            
            newPortfolio = state.portfolio.map(p => 
              p.symbol === symbol
                ? {
                    ...p,
                    quantity: totalQuantity,
                    avgPrice: newAvgPrice,
                    currentPrice: price,
                    totalValue: totalQuantity * price,
                    profit: (price - newAvgPrice) * totalQuantity,
                    profitPercent: ((price - newAvgPrice) / newAvgPrice) * 100,
                  }
                : p
            );
          } else {
            newPortfolio = [
              ...state.portfolio,
              {
                symbol,
                name: stock.name,
                quantity,
                avgPrice: price,
                currentPrice: price,
                totalValue: total,
                profit: 0,
                profitPercent: 0,
              },
            ];
          }

          return {
            portfolio: newPortfolio,
            trades: [newTrade, ...state.trades],
          };
        });

        useAuthStore.setState((state) => ({
          user: state.user ? { ...state.user, balance: state.user.balance - total } : null,
        }));

        return true;
      },
      sellStock: (symbol: string, quantity: number, price: number) => {
        const state = get();
        const existingItem = state.portfolio.find(p => p.symbol === symbol);
        
        if (!existingItem || existingItem.quantity < quantity) {
          return false;
        }

        const stock = getStockBySymbol(symbol);
        if (!stock) return false;

        const total = quantity * price;

        const newTrade: Trade = {
          id: crypto.randomUUID(),
          symbol,
          name: stock.name,
          type: 'sell',
          quantity,
          price,
          total,
          date: new Date(),
        };

        set((state) => {
          let newPortfolio: PortfolioItem[];
          const item = state.portfolio.find(p => p.symbol === symbol)!;
          
          if (item.quantity === quantity) {
            newPortfolio = state.portfolio.filter(p => p.symbol !== symbol);
          } else {
            const newQuantity = item.quantity - quantity;
            newPortfolio = state.portfolio.map(p =>
              p.symbol === symbol
                ? {
                    ...p,
                    quantity: newQuantity,
                    totalValue: newQuantity * price,
                    currentPrice: price,
                    profit: (price - p.avgPrice) * newQuantity,
                    profitPercent: ((price - p.avgPrice) / p.avgPrice) * 100,
                  }
                : p
            );
          }

          return {
            portfolio: newPortfolio,
            trades: [newTrade, ...state.trades],
          };
        });

        useAuthStore.setState((state) => ({
          user: state.user ? { ...state.user, balance: state.user.balance + total } : null,
        }));

        return true;
      },
      addToWatchlist: (symbol: string) => {
        set((state) => ({
          watchlist: state.watchlist.includes(symbol)
            ? state.watchlist
            : [...state.watchlist, symbol],
        }));
      },
      removeFromWatchlist: (symbol: string) => {
        set((state) => ({
          watchlist: state.watchlist.filter(s => s !== symbol),
        }));
      },
      updatePortfolioPrices: () => {
        set((state) => ({
          portfolio: state.portfolio.map(item => {
            const stock = getStockBySymbol(item.symbol);
            if (!stock) return item;
            
            const currentPrice = stock.ltp;
            return {
              ...item,
              currentPrice,
              totalValue: item.quantity * currentPrice,
              profit: (currentPrice - item.avgPrice) * item.quantity,
              profitPercent: ((currentPrice - item.avgPrice) / item.avgPrice) * 100,
            };
          }),
        }));
      },
    }),
    {
      name: 'portfolio-storage',
    }
  )
);

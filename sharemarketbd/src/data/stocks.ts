import { Stock, MarketIndex } from '@/types/stock';

export const marketIndices: MarketIndex[] = [
  { name: 'DSEX', value: 4869.00, change: -14.56, changePercent: -0.30 },
  { name: 'DSES', value: 1002.90, change: -5.77, changePercent: -0.57 },
  { name: 'DS30', value: 1867.14, change: -15.41, changePercent: -0.82 },
];

export const stocks: Stock[] = [
  { symbol: 'BEXIMCO', name: 'Beximco Limited', ltp: 134.50, change: 4.20, changePercent: 3.22, volume: 2847562, high: 136.00, low: 129.50, open: 130.30, ycp: 130.30, category: 'A', sector: 'Pharmaceuticals' },
  { symbol: 'SQURPHARMA', name: 'Square Pharmaceuticals Ltd', ltp: 199.00, change: -1.90, changePercent: -0.95, volume: 156840, high: 202.00, low: 198.00, open: 200.90, ycp: 200.90, category: 'A', sector: 'Pharmaceuticals' },
  { symbol: 'GP', name: 'Grameenphone Ltd', ltp: 352.60, change: 7.80, changePercent: 2.26, volume: 89450, high: 355.00, low: 344.80, open: 344.80, ycp: 344.80, category: 'A', sector: 'Telecommunication' },
  { symbol: 'BATBC', name: 'British American Tobacco Bangladesh', ltp: 456.20, change: -12.40, changePercent: -2.65, volume: 45620, high: 470.00, low: 454.00, open: 468.60, ycp: 468.60, category: 'A', sector: 'Food & Allied' },
  { symbol: 'RENATA', name: 'Renata Limited', ltp: 1250.00, change: 25.00, changePercent: 2.04, volume: 12340, high: 1260.00, low: 1220.00, open: 1225.00, ycp: 1225.00, category: 'A', sector: 'Pharmaceuticals' },
  { symbol: 'BRACBANK', name: 'BRAC Bank Limited', ltp: 38.50, change: 0.80, changePercent: 2.12, volume: 1542800, high: 39.00, low: 37.50, open: 37.70, ycp: 37.70, category: 'A', sector: 'Bank' },
  { symbol: 'CITYBANK', name: 'City Bank Limited', ltp: 24.70, change: 0.10, changePercent: 0.41, volume: 6384997, high: 25.00, low: 24.50, open: 24.60, ycp: 24.60, category: 'A', sector: 'Bank' },
  { symbol: 'PUBALIBANK', name: 'Pubali Bank Limited', ltp: 30.70, change: 0.30, changePercent: 0.99, volume: 845620, high: 31.00, low: 30.20, open: 30.40, ycp: 30.40, category: 'A', sector: 'Bank' },
  { symbol: 'NATLIFEINS', name: 'National Life Insurance', ltp: 96.10, change: 8.70, changePercent: 9.95, volume: 818368, high: 96.10, low: 87.40, open: 87.40, ycp: 87.40, category: 'A', sector: 'Insurance' },
  { symbol: 'DELTALIFE', name: 'Delta Life Insurance', ltp: 68.40, change: 1.70, changePercent: 2.55, volume: 425680, high: 69.00, low: 66.00, open: 66.70, ycp: 66.70, category: 'A', sector: 'Insurance' },
  { symbol: 'WALTONHIL', name: 'Walton Hi-Tech Industries', ltp: 374.40, change: 1.40, changePercent: 0.38, volume: 78450, high: 378.00, low: 370.00, open: 373.00, ycp: 373.00, category: 'A', sector: 'Engineering' },
  { symbol: 'OLYMPIC', name: 'Olympic Industries Ltd', ltp: 158.90, change: -5.30, changePercent: -3.23, volume: 145680, high: 165.00, low: 157.00, open: 164.20, ycp: 164.20, category: 'A', sector: 'Food & Allied' },
  { symbol: 'ARAMIT', name: 'Aramit Limited', ltp: 196.70, change: 9.20, changePercent: 4.91, volume: 32744, high: 198.00, low: 186.00, open: 187.50, ycp: 187.50, category: 'A', sector: 'Engineering' },
  { symbol: 'UTTARABANK', name: 'Uttara Bank Limited', ltp: 22.50, change: 0.20, changePercent: 0.90, volume: 4074596, high: 22.80, low: 22.20, open: 22.30, ycp: 22.30, category: 'A', sector: 'Bank' },
  { symbol: 'PREMIERBANK', name: 'Premier Bank Ltd', ltp: 4.10, change: 0.10, changePercent: 2.50, volume: 1562450, high: 4.20, low: 4.00, open: 4.00, ycp: 4.00, category: 'B', sector: 'Bank' },
  { symbol: 'TALLUSPIN', name: 'Tallu Spinning Mills', ltp: 5.90, change: 0.00, changePercent: 0.00, volume: 430417, high: 6.00, low: 5.80, open: 5.90, ycp: 5.90, category: 'B', sector: 'Textile' },
  { symbol: 'BDFINANCE', name: 'Bangladesh Finance', ltp: 12.70, change: 0.00, changePercent: 0.00, volume: 254680, high: 12.90, low: 12.50, open: 12.70, ycp: 12.70, category: 'B', sector: 'NBFI' },
  { symbol: 'ORIONINFU', name: 'Orion Infusion Ltd', ltp: 342.10, change: -1.80, changePercent: -0.52, volume: 188914, high: 348.00, low: 340.00, open: 343.90, ycp: 343.90, category: 'A', sector: 'Pharmaceuticals' },
  { symbol: 'ROBI', name: 'Robi Axiata Ltd', ltp: 45.80, change: 0.90, changePercent: 2.00, volume: 956420, high: 46.50, low: 44.50, open: 44.90, ycp: 44.90, category: 'A', sector: 'Telecommunication' },
  { symbol: 'LHBL', name: 'LafargeHolcim Bangladesh', ltp: 52.30, change: -2.10, changePercent: -3.86, volume: 845620, high: 55.00, low: 51.80, open: 54.40, ycp: 54.40, category: 'A', sector: 'Cement' },
];

export const getTopGainers = () => {
  return [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 10);
};

export const getTopLosers = () => {
  return [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 10);
};

export const getMostActive = () => {
  return [...stocks].sort((a, b) => b.volume - a.volume).slice(0, 10);
};

export const getStockBySymbol = (symbol: string): Stock | undefined => {
  return stocks.find(s => s.symbol === symbol);
};

export const searchStocks = (query: string): Stock[] => {
  const lowerQuery = query.toLowerCase();
  return stocks.filter(s => 
    s.symbol.toLowerCase().includes(lowerQuery) || 
    s.name.toLowerCase().includes(lowerQuery)
  );
};

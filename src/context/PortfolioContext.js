import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create context
const PortfolioContext = createContext();

// Mock portfolio data
const mockPortfolio = {
  overview: {
    invested: 115000,
    current: 127689.45,
    returns: 12689.45,
    returnsPercent: 11.03,
  },
  history: [
    { date: '2025-01-01', value: 112000 },
    { date: '2025-02-01', value: 116000 },
    { date: '2025-03-01', value: 114000 },
    { date: '2025-04-01', value: 119000 },
    { date: '2025-05-01', value: 122000 },
    { date: '2025-06-01', value: 125000 },
    { date: '2025-07-01', value: 127600 }
  ],
  allocation: [
    { type: 'Stocks', value: 62.5, color: '#5367FF' },
    { type: 'Mutual Funds', value: 25.3, color: '#00C087' },
    { type: 'Crypto', value: 8.7, color: '#FF9800' },
    { type: 'Cash', value: 3.5, color: '#E0E0E0' }
  ],
  holdings: [
    {
      name: 'Apple Inc.',
      symbol: 'AAPL',
      quantity: 15,
      avgPrice: 145.23,
      currentPrice: 182.63,
      value: 2739.45,
      gain: 561.00,
      gainPercent: 25.76,
      allocation: 15.8,
      icon: '🍏',
      type: 'stocks'
    },
    {
      name: 'Microsoft Corp.',
      symbol: 'MSFT',
      quantity: 10,
      avgPrice: 290.45,
      currentPrice: 337.18,
      value: 3371.80,
      gain: 467.30,
      gainPercent: 16.08,
      allocation: 19.5,
      icon: '🪟',
      type: 'stocks'
    },
    {
      name: 'Amazon.com Inc.',
      symbol: 'AMZN',
      quantity: 8,
      avgPrice: 129.15,
      currentPrice: 145.22,
      value: 1161.76,
      gain: 128.56,
      gainPercent: 12.44,
      allocation: 6.7,
      icon: '📦',
      type: 'stocks'
    },
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      quantity: 0.12,
      avgPrice: 48500.00,
      currentPrice: 59325.45,
      value: 7119.05,
      gain: 1299.05,
      gainPercent: 22.32,
      allocation: 41.1,
      icon: '₿',
      type: 'crypto'
    },
    {
      name: 'Axis Bluechip Fund',
      symbol: 'AXIS_BC',
      quantity: 450,
      avgPrice: 42.15,
      currentPrice: 46.32,
      value: 20844.00,
      gain: 1876.50,
      gainPercent: 9.89,
      allocation: 16.9,
      icon: '📈',
      type: 'mutual_funds'
    }
  ]
};

export const PortfolioProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch portfolio data
  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!isAuthenticated) {
        setPortfolio(null);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setPortfolio(mockPortfolio);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch portfolio data');
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [isAuthenticated]);

  // Add a new investment
  const addInvestment = async (investment) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Calculate new values
      const newValue = investment.quantity * investment.price;
      const newHolding = {
        name: investment.name,
        symbol: investment.symbol,
        quantity: investment.quantity,
        avgPrice: investment.price,
        currentPrice: investment.price,
        value: newValue,
        gain: 0,
        gainPercent: 0,
        allocation: (newValue / (portfolio.overview.current + newValue)) * 100,
        icon: investment.icon || '📊',
        type: investment.type
      };
      
      // Update portfolio
      const newPortfolio = {
        ...portfolio,
        overview: {
          ...portfolio.overview,
          invested: portfolio.overview.invested + newValue,
          current: portfolio.overview.current + newValue,
          // Recalculate returns
          returns: portfolio.overview.current + newValue - portfolio.overview.invested - newValue,
          returnsPercent: ((portfolio.overview.current + newValue) / (portfolio.overview.invested + newValue) - 1) * 100
        },
        holdings: [...portfolio.holdings, newHolding]
      };
      
      setPortfolio(newPortfolio);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Update investment quantity
  const updateInvestment = async (symbol, updates) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find the investment
      const holdingIndex = portfolio.holdings.findIndex(h => h.symbol === symbol);
      if (holdingIndex === -1) throw new Error('Investment not found');
      
      const holding = portfolio.holdings[holdingIndex];
      const oldValue = holding.value;
      
      // Calculate new values
      const updatedHolding = {
        ...holding,
        quantity: updates.quantity || holding.quantity,
        avgPrice: updates.avgPrice || holding.avgPrice
      };
      
      updatedHolding.value = updatedHolding.quantity * updatedHolding.currentPrice;
      updatedHolding.gain = updatedHolding.value - (updatedHolding.avgPrice * updatedHolding.quantity);
      updatedHolding.gainPercent = (updatedHolding.value / (updatedHolding.avgPrice * updatedHolding.quantity) - 1) * 100;
      
      // Update holdings
      const newHoldings = [...portfolio.holdings];
      newHoldings[holdingIndex] = updatedHolding;
      
      // Recalculate portfolio values
      const totalValue = newHoldings.reduce((sum, h) => sum + h.value, 0);
      const totalInvested = newHoldings.reduce((sum, h) => sum + (h.avgPrice * h.quantity), 0);
      
      // Update allocation percentages
      const updatedHoldings = newHoldings.map(h => ({
        ...h,
        allocation: (h.value / totalValue) * 100
      }));
      
      const newPortfolio = {
        ...portfolio,
        overview: {
          invested: totalInvested,
          current: totalValue,
          returns: totalValue - totalInvested,
          returnsPercent: ((totalValue / totalInvested) - 1) * 100
        },
        holdings: updatedHoldings
      };
      
      setPortfolio(newPortfolio);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Remove an investment
  const removeInvestment = async (symbol) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find the investment
      const holdingIndex = portfolio.holdings.findIndex(h => h.symbol === symbol);
      if (holdingIndex === -1) throw new Error('Investment not found');
      
      const holding = portfolio.holdings[holdingIndex];
      
      // Remove holding
      const newHoldings = portfolio.holdings.filter(h => h.symbol !== symbol);
      
      // Recalculate portfolio values
      const totalValue = newHoldings.reduce((sum, h) => sum + h.value, 0);
      const totalInvested = newHoldings.reduce((sum, h) => sum + (h.avgPrice * h.quantity), 0);
      
      // Update allocation percentages
      const updatedHoldings = newHoldings.map(h => ({
        ...h,
        allocation: (h.value / totalValue) * 100
      }));
      
      const newPortfolio = {
        ...portfolio,
        overview: {
          invested: totalInvested,
          current: totalValue,
          returns: totalValue - totalInvested,
          returnsPercent: ((totalValue / totalInvested) - 1) * 100
        },
        holdings: updatedHoldings
      };
      
      setPortfolio(newPortfolio);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        loading,
        error,
        addInvestment,
        updateInvestment,
        removeInvestment
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook to use portfolio context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
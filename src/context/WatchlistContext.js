import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create context
const WatchlistContext = createContext();

// Mock watchlist data
const mockWatchlist = [
  {
    id: 1,
    name: 'Apple Inc.',
    symbol: 'AAPL',
    price: 182.63,
    change: 1.25,
    icon: '🍏',
    notification: true,
    type: 'stocks'
  },
  {
    id: 2,
    name: 'Microsoft Corp.',
    symbol: 'MSFT',
    price: 337.18,
    change: -0.78,
    icon: '🪟',
    notification: true,
    type: 'stocks'
  },
  {
    id: 3,
    name: 'Amazon.com Inc.',
    symbol: 'AMZN',
    price: 145.22,
    change: 2.10,
    icon: '📦',
    notification: false,
    type: 'stocks'
  },
  {
    id: 4,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 59325.45,
    change: 5.32,
    icon: '₿',
    notification: true,
    type: 'crypto'
  },
  {
    id: 5,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3545.78,
    change: 3.87,
    icon: '⧫',
    notification: false,
    type: 'crypto'
  },
  {
    id: 6,
    name: 'Reliance Industries',
    symbol: 'RELIANCE.NS',
    price: 2930.15,
    change: -0.45,
    icon: '🏭',
    notification: true,
    type: 'stocks'
  },
  {
    id: 7,
    name: 'HDFC Bank',
    symbol: 'HDFCBANK.NS',
    price: 1678.90,
    change: 1.15,
    icon: '🏦',
    notification: false,
    type: 'stocks'
  }
];

export const WatchlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch watchlist data
  useEffect(() => {
    const fetchWatchlistData = async () => {
      if (!isAuthenticated) {
        setWatchlist([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setWatchlist(mockWatchlist);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch watchlist data');
        setLoading(false);
      }
    };

    fetchWatchlistData();
  }, [isAuthenticated]);

  // Add an item to watchlist
  const addToWatchlist = async (item) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if already in watchlist
      const exists = watchlist.some(w => w.symbol === item.symbol);
      if (exists) throw new Error('Asset already in watchlist');
      
      // Generate new ID
      const newId = Math.max(...watchlist.map(w => w.id)) + 1;
      
      const newItem = {
        id: newId,
        name: item.name,
        symbol: item.symbol,
        price: item.price,
        change: item.change,
        icon: item.icon || '📊',
        notification: true,
        type: item.type
      };
      
      setWatchlist([...watchlist, newItem]);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Remove an item from watchlist
  const removeFromWatchlist = async (id) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setWatchlist(watchlist.filter(item => item.id !== id));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Toggle notification for watchlist item
  const toggleNotification = async (id) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setWatchlist(
        watchlist.map(item => 
          item.id === id 
            ? { ...item, notification: !item.notification } 
            : item
        )
      );
      
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Update prices (simulates real-time updates)
  const updatePrices = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setWatchlist(
        watchlist.map(item => {
          // Generate random price change between -3% and +3%
          const changePercent = (Math.random() * 6 - 3) / 100;
          const newPrice = item.price * (1 + changePercent);
          return {
            ...item,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat((changePercent * 100).toFixed(2))
          };
        })
      );
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        loading,
        error,
        addToWatchlist,
        removeFromWatchlist,
        toggleNotification,
        updatePrices
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

// Custom hook to use watchlist context
export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
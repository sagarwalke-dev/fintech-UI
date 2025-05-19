/**
 * API utility functions for financial data
 * Currently using mock data, but structured for future real API integration
 */

// Mock delay to simulate network requests
const MOCK_DELAY = 800;

/**
 * Create a delayed promise to simulate API calls
 * @param {any} data - The data to return
 * @param {number} delay - The delay in milliseconds
 * @param {boolean} shouldFail - Whether the request should fail (for testing error handling)
 * @returns {Promise} - A promise that resolves or rejects after the delay
 */
const mockApiCall = (data, delay = MOCK_DELAY, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('API request failed'));
      } else {
        resolve(data);
      }
    }, delay);
  });
};

/**
 * Mock market data for popular assets
 */
const marketData = {
  stocks: [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corp.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.' },
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries' },
    { symbol: 'TCS.NS', name: 'Tata Consultancy Services' },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Ltd.' },
    { symbol: 'INFY.NS', name: 'Infosys Ltd.' }
  ],
  crypto: [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'XRP', name: 'Ripple' },
    { symbol: 'DOT', name: 'Polkadot' },
    { symbol: 'AVAX', name: 'Avalanche' }
  ],
  mutualFunds: [
    { symbol: 'AXIS_BC', name: 'Axis Bluechip Fund' },
    { symbol: 'HDFC_TOP100', name: 'HDFC Top 100 Fund' },
    { symbol: 'SBI_SMALL', name: 'SBI Small Cap Fund' },
    { symbol: 'ICICI_TECH', name: 'ICICI Prudential Technology Fund' },
    { symbol: 'MIRAE_EMERG', name: 'Mirae Asset Emerging Bluechip' },
    { symbol: 'PARAG_FLEXI', name: 'Parag Parikh Flexi Cap Fund' }
  ]
};

/**
 * API functions - structured like a real API service
 */
export const API = {
  /**
   * Get portfolio data
   * @returns {Promise} Portfolio data
   */
  getPortfolio: () => {
    return mockApiCall({
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
      ]
      // Additional data would come from a real API
    });
  },

  /**
   * Get user's holdings
   * @returns {Promise} Holdings data
   */
  getHoldings: () => {
    return mockApiCall([
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
      // Other holdings would be returned here
    ]);
  },

  /**
   * Get market data for specified asset type
   * @param {string} type - Asset type ('stocks', 'crypto', 'mutualFunds')
   * @returns {Promise} Market data for the specified type
   */
  getMarketData: (type) => {
    if (!marketData[type]) {
      return mockApiCall([], 300, true);
    }
    return mockApiCall(marketData[type], 300);
  },

  /**
   * Search for assets by query
   * @param {string} query - Search query
   * @returns {Promise} Search results
   */
  searchAssets: (query) => {
    const results = [];
    const lowercaseQuery = query.toLowerCase();
    
    // Search through all market data
    Object.keys(marketData).forEach((type) => {
      const matches = marketData[type].filter(
        (asset) => 
          asset.name.toLowerCase().includes(lowercaseQuery) || 
          asset.symbol.toLowerCase().includes(lowercaseQuery)
      );
      
      matches.forEach((match) => {
        results.push({
          ...match,
          type
        });
      });
    });
    
    return mockApiCall(results, 300);
  },

  /**
   * Get market news
   * @param {number} limit - Number of news items to retrieve
   * @returns {Promise} Market news data
   */
  getMarketNews: (limit = 5) => {
    const news = [
      {
        id: 1,
        title: 'Fed signals potential interest rate cut later this year',
        source: 'Financial Times',
        time: '2h ago',
        image: '📊',
        category: 'Economy',
        url: '#'
      },
      {
        id: 2,
        title: 'NVIDIA stock surges after AI chip demand forecast increases',
        source: 'Bloomberg',
        time: '4h ago',
        image: '🖥️',
        category: 'Technology',
        url: '#'
      },
      {
        id: 3,
        title: 'Bitcoin approaching all-time high as institutional investment grows',
        source: 'CoinDesk',
        time: '6h ago',
        image: '₿',
        category: 'Crypto',
        url: '#'
      },
      {
        id: 4,
        title: 'Indian equity markets continue bullish trend amid strong economic data',
        source: 'Economic Times',
        time: '8h ago',
        image: '📈',
        category: 'Markets',
        url: '#'
      },
      {
        id: 5,
        title: 'New IPO listings to watch this month: TechVision AI leads the pack',
        source: 'Reuters',
        time: '10h ago',
        image: '🚀',
        category: 'IPO',
        url: '#'
      }
    ];
    
    return mockApiCall(news.slice(0, limit), 500);
  },

  /**
   * Get user's watchlist
   * @returns {Promise} Watchlist data
   */
  getWatchlist: () => {
    return mockApiCall([
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
      // Other watchlist items would be returned here
    ]);
  },

  /**
   * Add item to watchlist
   * @param {object} item - Item to add to watchlist
   * @returns {Promise} Success status
   */
  addToWatchlist: (item) => {
    return mockApiCall({ success: true, message: 'Added to watchlist' }, 300);
  },

  /**
   * Remove item from watchlist
   * @param {number} id - ID of item to remove
   * @returns {Promise} Success status
   */
  removeFromWatchlist: (id) => {
    return mockApiCall({ success: true, message: 'Removed from watchlist' }, 300);
  }
};

export default API;
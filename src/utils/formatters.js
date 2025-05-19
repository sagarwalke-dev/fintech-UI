/**
 * Utility functions for formatting and calculations
 */

/**
 * Format a number as currency (INR)
 * @param {number} value - The value to format
 * @param {boolean} compact - Whether to use compact notation for large numbers
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, compact = false) => {
  if (value === undefined || value === null) return '₹0';
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: 2
  });
  
  return formatter.format(value);
};

/**
 * Format a number as a percentage
 * @param {number} value - The value to format
 * @param {boolean} showPlus - Whether to show + sign for positive values
 * @returns {string} Formatted percentage string
 */
export const formatPercent = (value, showPlus = true) => {
  if (value === undefined || value === null) return '0%';
  
  const sign = value > 0 && showPlus ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

/**
 * Format a large number with K, M, B suffixes
 * @param {number} value - The value to format
 * @returns {string} Formatted number string
 */
export const formatCompactNumber = (value) => {
  if (value === undefined || value === null) return '0';
  
  const formatter = new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  });
  
  return formatter.format(value);
};

/**
 * Format a date in localized format
 * @param {string|Date} date - The date to format
 * @param {string} format - The format to use ('short', 'medium', 'long')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: format
  }).format(dateObj);
};

/**
 * Calculate the percentage change between two values
 * @param {number} currentValue - The current value
 * @param {number} previousValue - The previous value
 * @returns {number} The percentage change
 */
export const calculatePercentageChange = (currentValue, previousValue) => {
  if (!previousValue) return 0;
  return ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
};

/**
 * Truncate text with ellipsis if it exceeds max length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length before truncating
 * @returns {string} The truncated text
 */
export const truncateText = (text, maxLength = 30) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get appropriate color based on value change (positive/negative)
 * @param {number} value - The value to check 
 * @param {object} theme - The Material-UI theme object
 * @returns {string} Color code
 */
export const getChangeColor = (value, theme) => {
  if (!theme) {
    return value >= 0 ? '#00C087' : '#FF5757';
  }
  return value >= 0 ? theme.palette.success.main : theme.palette.error.main;
};

/**
 * Format number with appropriate decimal places
 * @param {number} value - The value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export const formatNumber = (value, decimals = 2) => {
  if (value === undefined || value === null) return '0';
  return Number(value).toFixed(decimals);
};
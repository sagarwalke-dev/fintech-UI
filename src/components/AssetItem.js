import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatCurrency, formatPercent } from '../utils/formatters';

const AssetContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: 'rgba(83, 103, 255, 0.1)',
  color: theme.palette.primary.main,
  width: 40,
  height: 40,
  marginRight: theme.spacing(2)
}));

const PerformanceIndicator = styled(Box)(({ gain, theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: gain ? '#00C087' : '#FF5757',
}));

/**
 * Reusable component for displaying asset/investment items
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Asset name
 * @param {string} props.symbol - Asset symbol/ticker
 * @param {number} props.price - Current price
 * @param {number} props.change - Price change percentage
 * @param {string} props.icon - Icon emoji
 * @param {string} props.secondaryText - Additional text to display (optional)
 * @param {string} props.secondaryValue - Additional value to display (optional)
 * @param {function} props.onMoreClick - Callback for more options button (optional)
 * @param {boolean} props.hideActions - Whether to hide action buttons (optional)
 * @param {ReactNode} props.endContent - Custom content to display at the end (optional)
 */
const AssetItem = ({
  name,
  symbol,
  price,
  change,
  icon,
  secondaryText,
  secondaryValue,
  onMoreClick,
  hideActions = false,
  endContent
}) => {
  return (
    <AssetContainer>
      <StyledAvatar>{icon || '📊'}</StyledAvatar>
      
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {symbol}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {name}
          </Typography>
        </Box>
        
        {secondaryText && (
          <Typography variant="caption" color="text.secondary">
            {secondaryText}
          </Typography>
        )}
      </Box>
      
      <Box sx={{ mr: hideActions ? 0 : 2, textAlign: 'right' }}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {formatCurrency(price)}
        </Typography>
        
        {change !== undefined && (
          <PerformanceIndicator gain={change > 0}>
            {change > 0 ? 
              <ArrowUpwardIcon fontSize="small" /> : 
              <ArrowDownwardIcon fontSize="small" />
            }
            <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
              {formatPercent(Math.abs(change))}
            </Typography>
          </PerformanceIndicator>
        )}
        
        {secondaryValue && (
          <Typography variant="caption" color="text.secondary" display="block">
            {secondaryValue}
          </Typography>
        )}
      </Box>
      
      {endContent}
      
      {!hideActions && onMoreClick && (
        <IconButton size="small" onClick={onMoreClick} edge="end">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      )}
    </AssetContainer>
  );
};

export default AssetItem;
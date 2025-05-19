import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Button,
  Divider,
  IconButton,
  Chip
} from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  minWidth: 'auto',
  padding: theme.spacing(1, 2),
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const PerformanceIndicator = styled(Box)(({ gain, theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: gain ? '#00C087' : '#FF5757',
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontWeight: 500,
  fontSize: '0.75rem',
}));

// Mock data
const trendingStocks = [
  {
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    price: 238.45,
    change: 2.73,
    marketCap: '750B',
    icon: '🚗',
  },
  {
    name: 'NVIDIA Corp.',
    symbol: 'NVDA',
    price: 863.25,
    change: 1.54,
    marketCap: '2.1T',
    icon: '🎮',
  },
  {
    name: 'Meta Platforms',
    symbol: 'META',
    price: 478.22,
    change: 3.12,
    marketCap: '1.2T',
    icon: '👓',
  },
  {
    name: 'Alphabet Inc.',
    symbol: 'GOOGL',
    price: 165.78,
    change: -0.54,
    marketCap: '2.3T',
    icon: '🔍',
  },
  {
    name: 'Reliance Industries',
    symbol: 'RELIANCE.NS',
    price: 2930.15,
    change: -0.45,
    marketCap: '19.8T',
    icon: '🏭',
  },
];

// Portfolio data
const portfolioData = [
  {
    name: 'Stocks',
    value: 185000,
    change: 3.2,
    color: '#5367FF',
    icon: '📈',
  },
  {
    name: 'Mutual Funds',
    value: 120000,
    change: 1.8,
    color: '#00C087',
    icon: '📊',
  },
  {
    name: 'Fixed Deposits',
    value: 75000,
    change: 0.5,
    color: '#FF5757',
    icon: '🏦',
  },
  {
    name: 'Cryptocurrency',
    value: 45000,
    change: -2.1,
    color: '#FFB800',
    icon: '₿',
  }
];

const trendingCrypto = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 59325.45,
    change: 5.32,
    marketCap: '1.15T',
    icon: '₿',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3545.78,
    change: 3.87,
    marketCap: '425B',
    icon: '⧫',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 145.78,
    change: 7.32,
    marketCap: '63B',
    icon: '💠',
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.57,
    change: -2.21,
    marketCap: '20B',
    icon: '⓪',
  },
];

const marketNews = [
  {
    title: 'Fed signals potential interest rate cut later this year',
    source: 'Financial Times',
    time: '2h ago',
    image: '📊',
    category: 'Economy',
  },
  {
    title: 'NVIDIA stock surges after AI chip demand forecast increases',
    source: 'Bloomberg',
    time: '4h ago',
    image: '🖥️',
    category: 'Technology',
  },
  {
    title: 'Bitcoin approaching all-time high as institutional investment grows',
    source: 'CoinDesk',
    time: '6h ago',
    image: '₿',
    category: 'Crypto',
  },
  {
    title: 'Indian equity markets continue bullish trend amid strong economic data',
    source: 'Economic Times',
    time: '8h ago',
    image: '📈',
    category: 'Markets',
  },
];

const categories = [
  { name: 'Stocks', icon: <ShowChartIcon /> },
  { name: 'Mutual Funds', icon: <TrendingUpIcon /> },
  { name: 'Cryptocurrencies', icon: <TrendingUpIcon /> },
  { name: 'IPOs', icon: <ShowChartIcon /> },
  { name: 'ETFs', icon: <TrendingUpIcon /> },
  { name: 'News', icon: <NewspaperIcon /> },
];

const Explore = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isAmountHidden, setIsAmountHidden] = useState(false);

  // Calculate total portfolio value
  const totalPortfolioValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate overall portfolio change
  const weightedChange = portfolioData.reduce((sum, item) => sum + (item.change * (item.value / totalPortfolioValue)), 0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const toggleAmountVisibility = () => {
    setIsAmountHidden(!isAmountHidden);
  };

  return (
    <Box>
      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search markets, news, assets..."
        variant="outlined"
        value={searchValue}
        onChange={handleSearchChange}
        sx={{ 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            bgcolor: 'background.paper',
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Categories */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Categories</Typography>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={4} sm={2} key={category.name}>
              <Card 
                variant="outlined"
                sx={{ 
                  textAlign: 'center', 
                  p: 2, 
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  },
                  cursor: 'pointer'
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 1 }}>{category.icon}</Box>
                <Typography variant="body2">{category.name}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Market Overview */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Market Overview</Typography>
          <IconButton 
            size="small" 
            onClick={toggleAmountVisibility} 
            sx={{ 
              bgcolor: 'rgba(83, 103, 255, 0.1)',
              color: 'primary.main',
            }}
          >
            {isAmountHidden ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
          </IconButton>
        </Box>
        
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            mb: 2,
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 1.5,
            }
          }}
        >
          <StyledTab label="Trending Stocks" />
          <StyledTab label="Trending Crypto" />
          <StyledTab label="Top Gainers" />
          <StyledTab label="Top Losers" />
        </Tabs>

        <Card>
          <List disablePadding>
            {(tabValue === 0 ? trendingStocks : trendingCrypto).map((item, index) => (
              <React.Fragment key={item.symbol}>
                {index > 0 && <Divider component="li" variant="inset" />}
                <StyledListItem>
                  <Avatar
                    sx={{
                      bgcolor: 'rgba(83, 103, 255, 0.1)',
                      color: 'primary.main',
                      mr: 2
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {item.symbol}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {item.name}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        Market Cap: {item.marketCap}
                      </Typography>
                    }
                  />
                  <Box sx={{ mr: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'right' }}>
                      {isAmountHidden ? '••••••' : `₹${item.price.toLocaleString('en-IN')}`}
                    </Typography>
                    <PerformanceIndicator gain={item.change > 0} sx={{ justifyContent: 'flex-end' }}>
                      {item.change > 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                      <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                        {Math.abs(item.change)}%
                      </Typography>
                    </PerformanceIndicator>
                  </Box>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" size="small">
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </StyledListItem>
              </React.Fragment>
            ))}
          </List>
        </Card>
      </Box>

      {/* Latest News */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Latest News</Typography>
          <Button color="primary" size="small">See All</Button>
        </Box>
        
        <Card>
          <List disablePadding>
            {marketNews.map((news, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Divider />}
                <StyledListItem button>
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: 'rgba(83, 103, 255, 0.1)',
                      color: 'primary.main',
                      mr: 2
                    }}
                  >
                    {news.image}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.4 }}>
                        {news.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                          {news.source} • {news.time}
                        </Typography>
                        <CategoryChip
                          label={news.category}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </StyledListItem>
              </React.Fragment>
            ))}
          </List>
        </Card>
      </Box>

      {/* New IPOs */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Upcoming IPOs</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{ 
                p: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3,
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: 'rgba(83, 103, 255, 0.1)',
                    color: 'primary.main',
                    width: 56,
                    height: 56
                  }}
                >
                  🚀
                </Avatar>
                <Chip label="Upcoming" color="primary" size="small" />
              </Box>
              
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                TechVision AI
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AI-powered computer vision solutions
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Issue Price</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {isAmountHidden ? '••••••' : '₹900-950'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Issue Size</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {isAmountHidden ? '••••••' : '₹1,200 Cr'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Open Date</Typography>
                    <Typography variant="body2" fontWeight={500}>May 25, 2025</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Close Date</Typography>
                    <Typography variant="body2" fontWeight={500}>May 28, 2025</Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                Set Reminder
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Portfolio Summary */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Portfolio Summary</Typography>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              {portfolioData.map((item) => (
                <Grid item xs={6} sm={3} key={item.name}>
                  <Card
                    sx={{ 
                      p: 2,
                      bgcolor: item.color,
                      color: '#fff',
                      textAlign: 'center',
                      borderRadius: 2,
                      position: 'relative',
                      overflow: 'visible',
                    }}
                  >
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
                      {isAmountHidden ? '••••••' : `₹${item.value.toLocaleString('en-IN')}`}
                    </Typography>
                    <PerformanceIndicator gain={item.change > 0} sx={{ justifyContent: 'center', mb: 1 }}>
                      {item.change > 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                      <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                        {Math.abs(item.change)}%
                      </Typography>
                    </PerformanceIndicator>
                    <Chip
                      label={item.change > 0 ? 'Gained' : 'Lost'}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: item.change > 0 ? 'rgba(0, 192, 135, 0.1)' : 'rgba(255, 87, 87, 0.1)',
                        color: item.change > 0 ? '#00C087' : '#FF5757',
                        borderColor: item.change > 0 ? '#00C087' : '#FF5757',
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Total Portfolio Value */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Total Portfolio Value</Typography>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {isAmountHidden ? '••••••' : `₹${totalPortfolioValue.toLocaleString('en-IN')}`}
            </Typography>
            <PerformanceIndicator gain={weightedChange > 0} sx={{ justifyContent: 'center', mt: 1 }}>
              {weightedChange > 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
              <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                {Math.abs(weightedChange.toFixed(2))}%
              </Typography>
            </PerformanceIndicator>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Explore;
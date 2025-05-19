import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Divider,
  Tabs,
  Tab,
  Button
} from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';

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

// Mock data
const watchlist = [
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

const trendings = [
  {
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    price: 238.45,
    change: 2.73,
    icon: '🚗'
  },
  {
    name: 'NVIDIA Corp.',
    symbol: 'NVDA',
    price: 863.25,
    change: 1.54,
    icon: '🎮'
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 145.78,
    change: 7.32,
    icon: '💠'
  }
];

const Watchlist = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Filter watchlist based on selected tab and search
  const filteredWatchlist = watchlist
    .filter(item => {
      if (tabValue === 0) return true;
      if (tabValue === 1) return item.type === 'stocks';
      if (tabValue === 2) return item.type === 'crypto';
      return true;
    })
    .filter(item => {
      if (!searchValue) return true;
      return (
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

  return (
    <Box>
      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search stocks, crypto..."
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

      {/* Watchlist */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">My Watchlist</Typography>
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />} 
            size="small"
            sx={{ borderRadius: 2 }}
          >
            Add
          </Button>
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
          <StyledTab label="All" />
          <StyledTab label="Stocks" />
          <StyledTab label="Crypto" />
        </Tabs>

        <Card>
          <List disablePadding>
            {filteredWatchlist.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No matching items found
                </Typography>
              </Box>
            ) : (
              filteredWatchlist.map((item, index) => (
                <React.Fragment key={item.id}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            ₹{item.price.toLocaleString('en-IN')}
                          </Typography>
                          <PerformanceIndicator gain={item.change > 0} sx={{ ml: 1.5 }}>
                            {item.change > 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                            <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                              {Math.abs(item.change)}%
                            </Typography>
                          </PerformanceIndicator>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" size="small">
                        {item.notification ? <NotificationsActiveIcon color="primary" /> : <NotificationsOffIcon color="disabled" />}
                      </IconButton>
                    </ListItemSecondaryAction>
                  </StyledListItem>
                </React.Fragment>
              ))
            )}
          </List>
        </Card>
      </Box>

      {/* Trending */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Trending</Typography>
        
        <Grid container spacing={2}>
          {trendings.map((item) => (
            <Grid item xs={12} sm={4} key={item.symbol}>
              <Card>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: 'rgba(83, 103, 255, 0.1)',
                        color: 'primary.main'
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ 
                        minWidth: 'auto', 
                        width: 32, 
                        height: 32, 
                        p: 0, 
                        borderRadius: '50%' 
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                  </Box>
                  
                  <Typography variant="subtitle1" sx={{ mt: 1.5, fontWeight: 500 }}>
                    {item.symbol}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </Typography>
                    <PerformanceIndicator gain={item.change > 0} sx={{ ml: 1 }}>
                      {item.change > 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                      <Typography variant="body2" component="span" sx={{ ml: 0.5 }}>
                        {Math.abs(item.change)}%
                      </Typography>
                    </PerformanceIndicator>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Watchlist;
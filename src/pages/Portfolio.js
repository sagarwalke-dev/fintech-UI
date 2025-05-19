import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent,
  Grid,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import AddInvestmentModal from '../components/AddInvestmentModal';
import InvestmentDetailsModal from '../components/InvestmentDetailsModal';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

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

const PerformanceIndicator = styled(Box)(({ gain, theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: gain ? '#00C087' : '#FF5757',
}));

// Mock data
const portfolioOverview = {
  invested: 115000,
  current: 127689.45,
  returns: 12689.45,
  returnsPercent: 11.03,
};

const holdings = [
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
];

const allocationData = {
  labels: ['Stocks', 'Crypto', 'Mutual Funds'],
  datasets: [
    {
      data: [42.0, 41.1, 16.9],
      backgroundColor: ['#5367FF', '#FF9800', '#00C087'],
      borderColor: ['#5367FF', '#FF9800', '#00C087'],
      borderWidth: 1,
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.label}: ${context.raw}%`;
        }
      }
    }
  },
  cutout: '70%'
};

const Portfolio = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isAmountHidden, setIsAmountHidden] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Check for the tab parameter in the URL query
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    
    if (tabParam !== null) {
      // Convert to number and set the tab value
      const tabIndex = parseInt(tabParam);
      if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex <= 3) {
        setTabValue(tabIndex);
        
        // Scroll to My Holdings section
        const holdingsSection = document.getElementById('my-holdings-section');
        if (holdingsSection) {
          holdingsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [location]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleAmountVisibility = () => {
    setIsAmountHidden(!isAmountHidden);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleViewInvestment = (investment) => {
    setSelectedInvestment(investment);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  // Filter holdings based on selected tab
  const filteredHoldings = tabValue === 0 
    ? holdings 
    : holdings.filter(holding => {
        if (tabValue === 1) return holding.type === 'stocks';
        if (tabValue === 2) return holding.type === 'mutual_funds';
        if (tabValue === 3) return holding.type === 'crypto';
        return true;
      });

  return (
    <Box>
      {/* Portfolio Summary Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Portfolio Summary</Typography>
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
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Invested</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {isAmountHidden ? '••••••' : `₹${portfolioOverview.invested.toLocaleString('en-IN')}`}
              </Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Current Value</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {isAmountHidden ? '••••••' : `₹${portfolioOverview.current.toLocaleString('en-IN')}`}
              </Typography>
            </Grid>
          </Grid>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Total Returns</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mr: 1 }}>
                  {isAmountHidden ? '••••••' : `₹${portfolioOverview.returns.toLocaleString('en-IN')}`}
                </Typography>
                <PerformanceIndicator gain={portfolioOverview.returns > 0}>
                  {portfolioOverview.returns > 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                  <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 500 }}>
                    {Math.abs(portfolioOverview.returnsPercent).toFixed(2)}%
                  </Typography>
                </PerformanceIndicator>
              </Box>
            </Grid>
            
            <Grid item xs={6}>
              <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={handleOpenAddModal}>
                Add Investment
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Portfolio Allocation */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Asset Allocation</Typography>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <Box sx={{ height: 180 }}>
                <Doughnut data={allocationData} options={doughnutOptions} />
              </Box>
            </Grid>
            
            <Grid item xs={7}>
              {allocationData.labels.map((label, index) => (
                <Box key={label} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <Box 
                    sx={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: '50%', 
                      bgcolor: allocationData.datasets[0].backgroundColor[index],
                      mr: 1 
                    }} 
                  />
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>{label}</Typography>
                  <Typography variant="body2" fontWeight="600">
                    {allocationData.datasets[0].data[index]}%
                  </Typography>
                </Box>
              ))}
              
              <Button variant="outlined" size="small" fullWidth sx={{ mt: 1 }}>
                Rebalance Portfolio
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Holdings */}
      <Box sx={{ mb: 3 }} id="my-holdings-section">
        <Typography variant="h6" sx={{ mb: 2 }}>My Holdings</Typography>
        
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
          <StyledTab label="Mutual Funds" />
          <StyledTab label="Crypto" />
        </Tabs>
        
        <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset</TableCell>
                <TableCell align="right">Holdings</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell align="right">Returns</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHoldings.map((holding) => (
                <TableRow key={holding.symbol} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'rgba(83, 103, 255, 0.1)', 
                          color: 'primary.main',
                          width: 36,
                          height: 36,
                          mr: 1.5
                        }}
                      >
                        {holding.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {holding.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {holding.symbol}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {holding.quantity} {holding.type === 'mutual_funds' ? 'units' : ''}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Avg: {isAmountHidden ? '••••••' : `₹${holding.avgPrice.toLocaleString('en-IN')}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {isAmountHidden ? '••••••' : `₹${holding.value.toLocaleString('en-IN')}`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      LTP: {isAmountHidden ? '••••••' : `₹${holding.currentPrice.toLocaleString('en-IN')}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <PerformanceIndicator gain={holding.gain > 0}>
                      {holding.gain > 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {Math.abs(holding.gainPercent).toFixed(2)}%
                      </Typography>
                    </PerformanceIndicator>
                    <Typography variant="caption" display="block" sx={{ color: holding.gain > 0 ? '#00C087' : '#FF5757' }}>
                      {isAmountHidden ? '••••••' : `₹${Math.abs(holding.gain).toLocaleString('en-IN')}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button 
                      variant="outlined" 
                      size="small" 
                      onClick={() => handleViewInvestment(holding)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      {/* Add Investment Modal */}
      <AddInvestmentModal 
        open={isAddModalOpen} 
        onClose={handleCloseAddModal} 
        // Pass any other props or handlers as needed
      />

      {/* Investment Details Modal */}
      <InvestmentDetailsModal
        open={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        investment={selectedInvestment}
        isAmountHidden={isAmountHidden}
      />
    </Box>
  );
};

export default Portfolio;
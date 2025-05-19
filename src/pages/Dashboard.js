import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Chip, 
  Avatar, 
  Stack, 
  LinearProgress,
  IconButton,
  Button
} from '@mui/material';
import { styled } from '@mui/system';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddInvestmentModal from '../components/AddInvestmentModal';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Styled components
const GradientCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
}));

const AssetCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const PerformanceChip = styled(Chip)(({ gain, theme }) => ({
  backgroundColor: gain ? 'rgba(0, 192, 135, 0.15)' : 'rgba(255, 87, 87, 0.15)',
  color: gain ? '#00C087' : '#FF5757',
}));

// Mock data
const portfolioValue = {
  current: 127689.45,
  change: 2458.23,
  changePercent: 1.96,
  history: [112000, 116000, 114000, 119000, 122000, 125000, 127600]
};

// Portfolio data matching the Explore page
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

const assetAllocation = [
  { type: 'Stocks', value: 62.5, color: '#5367FF' },
  { type: 'Mutual Funds', value: 25.3, color: '#00C087' },
  { type: 'Crypto', value: 8.7, color: '#FF9800' },
  { type: 'Cash', value: 3.5, color: '#E0E0E0' }
];

const topInvestments = [
  { name: 'Apple Inc.', symbol: 'AAPL', price: 182.63, change: 1.25, icon: '🍏' },
  { name: 'Microsoft Corp.', symbol: 'MSFT', price: 337.18, change: -0.78, icon: '🪟' },
  { name: 'Amazon.com Inc.', symbol: 'AMZN', price: 145.22, change: 2.10, icon: '📦' },
  { name: 'Bitcoin', symbol: 'BTC', price: 59325.45, change: 5.32, icon: '₿' }
];

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
    },
    point: {
      radius: 0,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      display: false,
    },
    y: {
      grid: {
        display: false,
      },
      display: false,
    },
  },
};

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      data: portfolioValue.history,
      borderColor: '#FFFFFF',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      fill: true,
    },
  ],
};

const Dashboard = () => {
  const [isAmountHidden, setIsAmountHidden] = useState(false);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleAmountVisibility = () => {
    setIsAmountHidden(!isAmountHidden);
  };
  
  const handleOpenInvestmentModal = () => {
    setIsInvestmentModalOpen(true);
  };
  
  const handleCloseInvestmentModal = () => {
    setIsInvestmentModalOpen(false);
  };

  const handlePortfolioSummaryClick = (asset) => {
    // Get the tab index based on asset type
    let tabIndex = 0; // Default to 'All'
    
    if (asset.name === 'Stocks') {
      tabIndex = 1; // Stocks tab
    } else if (asset.name === 'Mutual Funds') {
      tabIndex = 2; // Mutual Funds tab
    } else if (asset.name === 'Cryptocurrency') {
      tabIndex = 3; // Crypto tab
    }
    
    // Navigate to Portfolio page with the selected tab
    navigate(`/portfolio?tab=${tabIndex}`);
  };

  return (
    <Box>
      {/* Portfolio Value Card */}
      <GradientCard elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
              Total Portfolio Value
            </Typography>
            <IconButton 
              size="small" 
              onClick={toggleAmountVisibility}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.3)',
                }
              }}
            >
              {isAmountHidden ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
            </IconButton>
          </Box>
          
          <Typography variant="h4" sx={{ fontWeight: 700, my: 0.5 }}>
            {isAmountHidden ? '••••••' : `₹${portfolioValue.current.toLocaleString('en-IN')}`}
          </Typography>
          
          <Stack direction="row" alignItems="center" spacing={1}>
            <PerformanceChip
              gain={portfolioValue.change > 0}
              label={isAmountHidden ? '••••••' : `${portfolioValue.change > 0 ? '+' : ''}₹${portfolioValue.change.toLocaleString('en-IN')}`}
              icon={portfolioValue.change > 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
              size="small"
            />
            <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
              {portfolioValue.changePercent > 0 ? '+' : ''}{portfolioValue.changePercent}% today
            </Typography>
          </Stack>
          
          <Box sx={{ height: 100, mt: 3 }}>
            <Line data={chartData} options={chartOptions} />
          </Box>
        </CardContent>
      </GradientCard>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Quick Actions</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card 
              variant="outlined" 
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 2
                }
              }}
              onClick={handleOpenInvestmentModal}
            >
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <TrendingUpIcon color="primary" />
                <Typography variant="body2" sx={{ mt: 1 }}>Add Investments</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <TrendingDownIcon color="secondary" />
                <Typography variant="body2" sx={{ mt: 1 }}>Add Withdraw</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <AddIcon color="info" />
                <Typography variant="body2" sx={{ mt: 1 }}>Add Goal</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Asset Allocation */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Asset Allocation</Typography>
        <Card>
          <CardContent>
            {assetAllocation.map((asset) => (
              <Box key={asset.type} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{asset.type}</Typography>
                  <Typography variant="body2" fontWeight="500">{asset.value}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={asset.value} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: 'rgba(0,0,0,0.09)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: asset.color 
                    }
                  }} 
                />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>

      {/* Top Investments */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Top Investments</Typography>
          <Button color="primary" size="small">View All</Button>
        </Box>
        
        <Grid container spacing={2}>
          {topInvestments.map((investment) => (
            <Grid item xs={6} key={investment.symbol}>
              <AssetCard>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Avatar sx={{ bgcolor: 'rgba(83, 103, 255, 0.1)', color: 'primary.main', width: 40, height: 40 }}>
                      {investment.icon}
                    </Avatar>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>{investment.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{investment.symbol}</Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, alignItems: 'center' }}>
                    <Typography variant="subtitle2">
                      {isAmountHidden ? '••••••' : `₹${investment.price.toLocaleString('en-IN')}`}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: investment.change > 0 ? '#00C087' : '#FF5757',
                        display: 'flex',
                        alignItems: 'center' 
                      }}
                    >
                      {investment.change > 0 ? <ArrowUpwardIcon fontSize="inherit" sx={{ mr: 0.5 }}/> : <ArrowDownwardIcon fontSize="inherit" sx={{ mr: 0.5 }}/>
                      }
                      {Math.abs(investment.change)}%
                    </Typography>
                  </Box>
                </CardContent>
              </AssetCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Market Insights */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Market Insights</Typography>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="500">Market Update</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Sensex and Nifty rose by 1.2% and 1.3% respectively. Tech stocks showing strong momentum.
            </Typography>
            <Button color="primary" size="small" sx={{ mt: 2 }}>Read More</Button>
          </CardContent>
        </Card>
      </Box>

      {/* Portfolio Summary */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Portfolio Summary</Typography>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              {portfolioData.map((asset) => (
                <Grid item xs={6} sm={3} key={asset.name}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: asset.color, 
                        width: 56, 
                        height: 56, 
                        margin: '0 auto',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: 3
                        }
                      }}
                      onClick={() => handlePortfolioSummaryClick(asset)}
                    >
                      {asset.icon}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>{asset.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {isAmountHidden ? '••••••' : `₹${asset.value.toLocaleString('en-IN')}`}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 0.5 }}>
                      <Typography variant="body2" sx={{ mr: 0.5, color: asset.change > 0 ? '#00C087' : '#FF5757' }}>
                        {asset.change > 0 ? <ArrowUpwardIcon fontSize="inherit" /> : <ArrowDownwardIcon fontSize="inherit" />}
                        {Math.abs(asset.change)}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Add Investment Modal */}
      <AddInvestmentModal 
        open={isInvestmentModalOpen} 
        onClose={handleCloseInvestmentModal} 
      />
    </Box>
  );
};

export default Dashboard;
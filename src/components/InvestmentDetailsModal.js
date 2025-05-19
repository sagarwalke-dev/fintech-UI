import React, { useState } from 'react';
import { 
  Modal,
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Divider,
  Grid,
  Paper,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  maxHeight: '90vh',
  overflow: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(3),
}));

const PerformanceIndicator = styled(Box)(({ gain }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: gain ? '#00C087' : '#FF5757',
}));

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

const mockChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Price',
      data: [120, 115, 130, 125, 140, 160, 155, 170, 165, 180, 185, 195],
      borderColor: '#5367FF',
      backgroundColor: 'rgba(83, 103, 255, 0.1)',
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
    },
  },
};

const mockTransactions = [
  { type: 'Buy', date: 'Jan 15, 2023', quantity: 5, price: 143.50, value: 717.50 },
  { type: 'Buy', date: 'Mar 22, 2023', quantity: 3, price: 146.40, value: 439.20 },
  { type: 'Buy', date: 'Aug 07, 2023', quantity: 7, price: 145.80, value: 1020.60 },
];

/**
 * Modal to display detailed information about a specific investment
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the modal is open
 * @param {function} props.onClose - Function to close the modal
 * @param {Object} props.investment - Investment data object
 * @param {boolean} props.isAmountHidden - Whether amounts should be hidden
 */
const InvestmentDetailsModal = ({ open, onClose, investment, isAmountHidden }) => {
  const [tabValue, setTabValue] = useState(0);

  if (!investment) return null;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="investment-details-modal"
    >
      <ModalContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                bgcolor: 'rgba(83, 103, 255, 0.1)', 
                color: 'primary.main',
                width: 48,
                height: 48,
                mr: 2
              }}
            >
              {investment.icon}
            </Avatar>
            <Box>
              <Typography variant="h6">{investment.name}</Typography>
              <Typography variant="body2" color="text.secondary">{investment.symbol}</Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">Current Price</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {isAmountHidden ? '••••••' : `₹${investment.currentPrice.toLocaleString('en-IN')}`}
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">Total Quantity</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {investment.quantity} {investment.type === 'mutual_funds' ? 'units' : ''}
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">Average Price</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {isAmountHidden ? '••••••' : `₹${investment.avgPrice.toLocaleString('en-IN')}`}
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="body2" color="text.secondary">Total Value</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {isAmountHidden ? '••••••' : `₹${investment.value.toLocaleString('en-IN')}`}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">Total Returns</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mr: 1 }}>
                {isAmountHidden ? '••••••' : `₹${Math.abs(investment.gain).toLocaleString('en-IN')}`}
              </Typography>
              <PerformanceIndicator gain={investment.gain > 0}>
                {investment.gain > 0 ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 500 }}>
                  {Math.abs(investment.gainPercent).toFixed(2)}%
                </Typography>
              </PerformanceIndicator>
            </Box>
          </Box>

          {/* <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" startIcon={<AttachMoneyIcon />}>
              Buy
            </Button>
            <Button 
              variant="outlined" 
              size="small"
              color="error"
            >
              Sell
            </Button>
          </Box> */}
        </Box>

        <Divider sx={{ mb: 2 }} />

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
          <StyledTab icon={<TrendingUpIcon fontSize="small" />} iconPosition="start" label="Performance" />
          <StyledTab icon={<BarChartIcon fontSize="small" />} iconPosition="start" label="Statistics" />
          <StyledTab icon={<HistoryIcon fontSize="small" />} iconPosition="start" label="Transactions" />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Price History</Typography>
            <Box sx={{ height: 300, mb: 2 }}>
              <Line options={chartOptions} data={mockChartData} />
            </Box>
          </Box>
        )}

        {tabValue === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">52 Week High</Typography>
                <Typography variant="body1" fontWeight={500}>
                  {isAmountHidden ? '••••••' : `₹${(investment.currentPrice * 1.15).toFixed(2).toLocaleString('en-IN')}`}
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">52 Week Low</Typography>
                <Typography variant="body1" fontWeight={500}>
                  {isAmountHidden ? '••••••' : `₹${(investment.currentPrice * 0.85).toFixed(2).toLocaleString('en-IN')}`}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">Market Cap</Typography>
                <Typography variant="body1" fontWeight={500}>
                  {isAmountHidden ? '••••••' : `₹${(investment.type === 'stocks' ? '2.32T' : investment.type === 'crypto' ? '1.12T' : '12.5B')}`}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">Portfolio Allocation</Typography>
                <Typography variant="body1" fontWeight={500}>
                  {investment.allocation}%
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">Risk Level</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Chip 
                    label={investment.type === 'crypto' ? "High" : investment.type === 'stocks' ? "Medium" : "Low"} 
                    size="small"
                    color={investment.type === 'crypto' ? "error" : investment.type === 'stocks' ? "warning" : "success"}
                    variant="outlined"
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {tabValue === 2 && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Transaction History</Typography>
            <Paper variant="outlined" sx={{ borderRadius: 2 }}>
              {mockTransactions.map((transaction, index) => (
                <Box key={index}>
                  <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                          label={transaction.type} 
                          size="small" 
                          color={transaction.type === 'Buy' ? 'primary' : 'error'} 
                          sx={{ fontWeight: 500 }}
                        />
                        <Typography variant="body2">{transaction.quantity} {investment.type === 'mutual_funds' ? 'units' : ''}</Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {transaction.date}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" fontWeight={500}>
                        {isAmountHidden ? '••••••' : `₹${transaction.value.toLocaleString('en-IN')}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        @ {isAmountHidden ? '••••••' : `₹${transaction.price.toLocaleString('en-IN')}`}
                      </Typography>
                    </Box>
                  </Box>
                  {index < mockTransactions.length - 1 && <Divider />}
                </Box>
              ))}
            </Paper>
          </Box>
        )}
      </ModalContainer>
    </Modal>
  );
};

export default InvestmentDetailsModal;
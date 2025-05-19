import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  TextField,
  Tab,
  Tabs,
  IconButton,
  Paper
} from '@mui/material';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ShareIcon from '@mui/icons-material/Share';
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

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  minWidth: '120px',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

// Mock data
const userData = {
  name: 'Raj Sharma',
  email: 'raj.sharma@example.com',
  phone: '+91 9876543210',
  joinDate: 'January 2023',
  kycVerified: true,
  profilePicture: '👨‍💼',
};

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Returns',
      data: [2.3, 3.1, 1.2, -0.8, 2.5, 4.2, 5.3, 4.8, 7.2, 8.5, 9.1, 11.0],
      borderColor: '#5367FF',
      backgroundColor: 'rgba(83, 103, 255, 0.1)',
      fill: true,
    },
    {
      label: 'Market Benchmark',
      data: [1.8, 2.2, 0.9, -1.5, 1.7, 3.5, 4.0, 3.8, 5.5, 6.2, 7.0, 8.2],
      borderColor: '#00C087',
      backgroundColor: 'rgba(0, 192, 135, 0.1)',
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function(value) {
          return value + '%';
        }
      }
    }
  }
};

const referralHistory = [
  { name: 'Amit Kumar', date: 'May 15, 2025', status: 'Joined', reward: '₹200' },
  { name: 'Priya Verma', date: 'April 30, 2025', status: 'Joined', reward: '₹200' },
  { name: 'Kiran Shah', date: 'March 12, 2025', status: 'Pending', reward: '-' },
];

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    newsUpdates: true,
    marketReports: false,
    twoFactorAuth: true
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSwitchChange = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box>
      {/* User Profile Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 70, 
                height: 70, 
                bgcolor: 'primary.main', 
                fontSize: '2rem',
                mr: 2 
              }}
            >
              {userData.profilePicture}
            </Avatar>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {userData.name}
                </Typography>
                {userData.kycVerified && (
                  <CheckCircleIcon 
                    color="primary" 
                    sx={{ ml: 1, width: 20, height: 20 }} 
                  />
                )}
              </Box>
              <Typography variant="body2" color="text.secondary">
                Member since {userData.joinDate}
              </Typography>
            </Box>
            <IconButton sx={{ ml: 'auto' }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Email</Typography>
              <Typography variant="body1">{userData.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Phone</Typography>
              <Typography variant="body1">{userData.phone}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Tabs Navigation */}
      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            mb: 2,
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 1.5,
            }
          }}
        >
          <StyledTab label="Account" icon={<AccountCircleIcon />} iconPosition="start" />
          <StyledTab label="Performance" icon={<ShowChartIcon />} iconPosition="start" />
          <StyledTab label="Refer & Earn" icon={<ShareIcon />} iconPosition="start" />
        </Tabs>
        
        {/* Account Settings Tab */}
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Account Settings</Typography>
            <Paper elevation={0} variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
              <List disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Notifications" 
                    secondary="Manage your notification preferences"
                  />
                  <IconButton>
                    <SettingsIcon fontSize="small" />
                  </IconButton>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Security" 
                    secondary="Two-factor authentication, password"
                  />
                  <IconButton>
                    <SettingsIcon fontSize="small" />
                  </IconButton>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <HelpIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Help & Support" 
                    secondary="FAQs, contact support"
                  />
                  <IconButton>
                    <SettingsIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              </List>
            </Paper>
            
            <Typography variant="h6" sx={{ mb: 2 }}>Notification Settings</Typography>
            <Paper elevation={0} variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
              <List disablePadding>
                <ListItem>
                  <ListItemText 
                    primary="Price Alerts" 
                    secondary="Get notified about significant price changes"
                  />
                  <Switch 
                    edge="end"
                    checked={notifications.priceAlerts}
                    onChange={handleSwitchChange}
                    name="priceAlerts"
                    color="primary"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText 
                    primary="News Updates" 
                    secondary="Get latest news about your investments"
                  />
                  <Switch 
                    edge="end"
                    checked={notifications.newsUpdates}
                    onChange={handleSwitchChange}
                    name="newsUpdates"
                    color="primary"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText 
                    primary="Market Reports" 
                    secondary="Weekly summaries of market performance"
                  />
                  <Switch 
                    edge="end"
                    checked={notifications.marketReports}
                    onChange={handleSwitchChange}
                    name="marketReports"
                    color="primary"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText 
                    primary="Two-Factor Authentication" 
                    secondary="Enhanced security for your account"
                  />
                  <Switch 
                    edge="end"
                    checked={notifications.twoFactorAuth}
                    onChange={handleSwitchChange}
                    name="twoFactorAuth"
                    color="primary"
                  />
                </ListItem>
              </List>
            </Paper>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                variant="outlined" 
                color="error" 
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </Box>
          </Box>
        )}
        
        {/* Performance Tab */}
        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Investment Performance</Typography>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ height: 300, mb: 2 }}>
                  <Line options={chartOptions} data={performanceData} />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">YTD Return</Typography>
                    <Typography variant="h6" sx={{ color: '#00C087', fontWeight: 600 }}>+11.0%</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">Vs Market</Typography>
                    <Typography variant="h6" sx={{ color: '#00C087', fontWeight: 600 }}>+2.8%</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">Best Month</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Dec (+11.0%)</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">Worst Month</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Apr (-0.8%)</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            
            <Typography variant="h6" sx={{ mb: 2 }}>Performance Insights</Typography>
            <Card>
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Your portfolio has outperformed the market benchmark by 2.8% this year.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Your tech investments have contributed most to your returns, with an average gain of 15.4%.
                  Consider diversifying further into emerging sectors to potentially enhance your long-term performance.
                </Typography>
                <Button color="primary" size="small" sx={{ mt: 2 }}>Get Detailed Analysis</Button>
              </CardContent>
            </Card>
          </Box>
        )}
        
        {/* Refer & Earn Tab */}
        {tabValue === 2 && (
          <Box>
            <Card sx={{ mb: 3, textAlign: 'center', bgcolor: 'primary.dark', color: 'white', p: 3, borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom>
                Refer Friends & Earn ₹200
              </Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                For every friend you refer who signs up and invests, both of you will receive ₹200
              </Typography>
              
              <TextField
                fullWidth
                variant="outlined"
                value="https://fintech.app/refer/rajsharma123"
                InputProps={{
                  readOnly: true,
                  sx: { 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    }
                  }
                }}
                sx={{ mb: 2 }}
              />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)', 
                      '&:hover': { 
                        bgcolor: 'rgba(255,255,255,0.3)' 
                      }
                    }}
                  >
                    Copy Link
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      '&:hover': { 
                        bgcolor: 'rgba(255,255,255,0.3)' 
                      }
                    }}
                  >
                    Share
                  </Button>
                </Grid>
              </Grid>
            </Card>
            
            <Typography variant="h6" sx={{ mb: 2 }}>Referral History</Typography>
            <Card>
              <List disablePadding>
                {referralHistory.length === 0 ? (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      No referrals yet
                    </Typography>
                  </Box>
                ) : (
                  referralHistory.map((referral, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <Divider />}
                      <ListItem>
                        <ListItemText
                          primary={referral.name}
                          secondary={`Invited: ${referral.date}`}
                        />
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography 
                            variant="body2" 
                            color={referral.status === 'Joined' ? 'primary' : 'text.secondary'}
                            sx={{ fontWeight: 500 }}
                          >
                            {referral.status}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {referral.reward}
                          </Typography>
                        </Box>
                      </ListItem>
                    </React.Fragment>
                  ))
                )}
              </List>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
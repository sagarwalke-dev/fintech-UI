import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, Paper, BottomNavigation, BottomNavigationAction, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StarIcon from '@mui/icons-material/Star';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
}));

const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  paddingBottom: 70,
  position: 'relative',
}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(location.pathname);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  // Define page titles for different routes
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/portfolio':
        return 'My Portfolio';
      case '/watchlist':
        return 'Watchlist';
      case '/explore':
        return 'Explore';
      case '/profile':
        return 'Profile';
      default:
        return 'FinTrack Pro';
    }
  };

  return (
    <MainContainer>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {getPageTitle()}
          </Typography>
          <IconButton color="inherit" aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ padding: 2, paddingBottom: 10 }}>
        <Outlet />
      </Box>
      
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <StyledBottomNavigation value={value} onChange={handleChange}>
          <StyledBottomNavigationAction
            label="Home"
            value="/"
            icon={<DashboardIcon />}
          />
          <StyledBottomNavigationAction
            label="Portfolio"
            value="/portfolio"
            icon={<AccountBalanceWalletIcon />}
          />
          <StyledBottomNavigationAction
            label="Watchlist"
            value="/watchlist"
            icon={<StarIcon />}
          />
          <StyledBottomNavigationAction
            label="Explore"
            value="/explore"
            icon={<ExploreIcon />}
          />
          <StyledBottomNavigationAction
            label="Profile"
            value="/profile"
            icon={<PersonIcon />}
          />
        </StyledBottomNavigation>
      </Paper>
    </MainContainer>
  );
};

export default MainLayout;
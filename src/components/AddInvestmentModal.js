import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  InputAdornment,
  CircularProgress,
  Box,
  Autocomplete,
  Snackbar,
  Alert
} from '@mui/material';
import { usePortfolio } from '../context/PortfolioContext';
import { API } from '../utils/api';
import { formatCurrency } from '../utils/formatters';

/**
 * Modal component for adding new investments to portfolio
 * 
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {function} props.onClose - Function to call when closing the modal
 * @param {Object} [props.initialValues] - Initial values for the form
 */
const AddInvestmentModal = ({ open, onClose, initialValues = {} }) => {
  const { addInvestment } = usePortfolio();
  
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ open: false, type: 'success', message: '' });
  
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    name: initialValues.name || '',
    quantity: initialValues.quantity || '',
    price: initialValues.price || '',
    type: initialValues.type || 'stocks',
    icon: initialValues.icon || ''
  });
  
  // Search for assets when typing in the name field
  useEffect(() => {
    const searchAssets = async () => {
      if (!formData.name || formData.name.length < 2) {
        setSearchResults([]);
        return;
      }
      
      setSearchLoading(true);
      try {
        const results = await API.searchAssets(formData.name);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching assets:', error);
      } finally {
        setSearchLoading(false);
      }
    };
    
    const timeoutId = setTimeout(searchAssets, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.name]);
  
  // Calculate total value
  const totalValue = 
    formData.quantity && formData.price ? 
    Number(formData.quantity) * Number(formData.price) : 0;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleAssetSelect = (event, value) => {
    if (value) {
      setFormData({
        ...formData,
        name: value.name,
        name: value.name,
        type: value.type || formData.type,
        // Set a default price if we don't have it
        price: value.price || formData.price
      });
    }
  };
  
  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name || !formData.name || !formData.quantity || !formData.price) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (isNaN(formData.quantity) || Number(formData.quantity) <= 0) {
      setError('Please enter a valid quantity');
      return;
    }
    
    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      setError('Please enter a valid price');
      return;
    }
    
    setLoading(true);
    try {
      const result = await addInvestment({
        name: formData.name,
        name: formData.name,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        type: formData.type,
        icon: formData.icon
      });
      
      if (result.success) {
        // Show success notification
        setNotification({
          open: true,
          type: 'success',
          message: '🎉 Investment added successfully!'
        });
        
        // Reset form data
        setFormData({
          name: '',
          name: '',
          quantity: '',
          price: '',
          type: 'stocks',
          icon: ''
        });
        
        // Close modal after a short delay to show notification
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(result.error || 'Failed to add investment');
        // Show error notification
        setNotification({
          open: true,
          type: 'error',
          message: `❌ ${result.error || 'Failed to add investment'}`
        });
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      // Show error notification
      setNotification({
        open: true,
        type: 'error',
        message: `❌ ${err.message || 'An error occurred'}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={loading ? null : onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Investment</DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            
            {/* Form fields - unchanged */}
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <Autocomplete
                  options={searchResults}
                  loading={searchLoading}
                  getOptionLabel={(option) => `${option.name} - ${option.name}`}
                  onChange={handleAssetSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="name"
                      label="Search Asset"
                      variant="outlined"
                      fullWidth
                      required
                      value={formData.name}
                      onChange={handleChange}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {searchLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid> */}
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  name="type"
                  label="Asset Type"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.type}
                  onChange={handleChange}
                >
                  <MenuItem value="stocks">Stocks</MenuItem>
                  <MenuItem value="crypto">Crypto</MenuItem>
                  <MenuItem value="mutual_funds">Mutual Funds</MenuItem>
                  <MenuItem value="fd">Fixed Deposit</MenuItem>
                  <MenuItem value="us_stocks">US Stocks</MenuItem>
                  <MenuItem value="etf">ETF</MenuItem>
                  <MenuItem value="bonds">Bonds</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="quantity"
                  label="Quantity / Units"
                  variant="outlined"
                  fullWidth
                  required
                  type="number"
                  inputProps={{ min: 0, step: "any" }}
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="price"
                  label="Purchase Price"
                  variant="outlined"
                  fullWidth
                  required
                  type="number"
                  inputProps={{ min: 0, step: "any" }}
                  value={formData.price}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="icon"
                  label="Icon (Emoji)"
                  variant="outlined"
                  fullWidth
                  placeholder="🍏"
                  value={formData.icon}
                  onChange={handleChange}
                  helperText="Optional: Enter an emoji to represent this asset"
                />
              </Grid>
              
              {totalValue > 0 && (
                <Grid item xs={12}>
                  <Box sx={{ 
                    mt: 1, 
                    p: 2, 
                    bgcolor: 'background.paper', 
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Investment Value
                    </Typography>
                    <Typography variant="h6">
                      {formatCurrency(totalValue)}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Add Investment'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Success/Error Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.type} 
          variant="filled" 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddInvestmentModal;
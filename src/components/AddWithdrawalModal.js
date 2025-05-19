import React, { useState } from 'react';
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
  Snackbar,
  Alert
} from '@mui/material';
import { usePortfolio } from '../context/PortfolioContext';
import { formatCurrency } from '../utils/formatters';

/**
 * Modal component for recording withdrawals from portfolio
 * 
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {function} props.onClose - Function to call when closing the modal
 * @param {Object} [props.initialValues] - Initial values for the form
 */
const AddWithdrawalModal = ({ open, onClose, initialValues = {} }) => {
  const { portfolio } = usePortfolio();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ open: false, type: 'success', message: '' });
  
  const [formData, setFormData] = useState({
    amount: initialValues.amount || '',
    withdrawalType: initialValues.withdrawalType || 'bank_transfer',
    fromAsset: initialValues.fromAsset || '',
    description: initialValues.description || '',
    date: initialValues.date || new Date().toISOString().split('T')[0],
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  // Create a list of assets the user can withdraw from
  const withdrawalOptions = portfolio?.holdings?.map(holding => ({
    symbol: holding.symbol,
    name: holding.name,
    value: holding.value
  })) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.amount || !formData.withdrawalType) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    setLoading(true);
    try {
      // This would call a withdrawal function from the portfolio context
      // But for now, we'll just simulate success
      // const result = await withdrawFromPortfolio(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = { success: true };
      
      if (result.success) {
        // Show success notification
        setNotification({
          open: true,
          type: 'success',
          message: '🎉 Withdrawal processed successfully!'
        });
        
        // Reset form data
        setFormData({
          amount: '',
          withdrawalType: 'bank_transfer',
          fromAsset: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
        });
        
        // Close modal after a short delay to show notification
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(result.error || 'Failed to process withdrawal');
        setNotification({
          open: true,
          type: 'error',
          message: `❌ ${result.error || 'Failed to process withdrawal'}`
        });
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
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
        <DialogTitle>Record Withdrawal</DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="amount"
                  label="Withdrawal Amount"
                  variant="outlined"
                  fullWidth
                  required
                  type="number"
                  inputProps={{ min: 0, step: "any" }}
                  value={formData.amount}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  select
                  name="withdrawalType"
                  label="Withdrawal Method"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.withdrawalType}
                  onChange={handleChange}
                >
                  <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                  <MenuItem value="sell_assets">Sell Assets</MenuItem>
                  <MenuItem value="redemption">Redemption</MenuItem>
                </TextField>
              </Grid>
              
              {formData.withdrawalType === 'sell_assets' && (
                <Grid item xs={12}>
                  <TextField
                    select
                    name="fromAsset"
                    label="Select Asset to Sell"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.fromAsset}
                    onChange={handleChange}
                    helperText="Choose which asset to sell for this withdrawal"
                  >
                    {withdrawalOptions.map((option) => (
                      <MenuItem key={option.symbol} value={option.symbol}>
                        {option.name} ({option.symbol}) - {formatCurrency(option.value)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <TextField
                  name="date"
                  label="Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description (Optional)"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add notes about this withdrawal"
                />
              </Grid>
              
              {Number(formData.amount) > 0 && (
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
                      Total Withdrawal Amount
                    </Typography>
                    <Typography variant="h6">
                      {formatCurrency(Number(formData.amount))}
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
              {loading ? <CircularProgress size={24} /> : 'Confirm Withdrawal'}
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

export default AddWithdrawalModal;
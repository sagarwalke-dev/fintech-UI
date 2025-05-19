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
  Alert,
  Slider
} from '@mui/material';
import { styled } from '@mui/system';
import { formatCurrency } from '../utils/formatters';

// Styled slider with custom colors based on completion percentage
const ProgressSlider = styled(Slider)(({ theme, value }) => ({
  color: value < 30 ? theme.palette.error.main : 
         value < 70 ? theme.palette.warning.main : 
         theme.palette.success.main,
  height: 8,
  '& .MuiSlider-thumb': {
    display: 'none',
  },
}));

/**
 * Modal component for adding financial goals to the portfolio
 * 
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {function} props.onClose - Function to call when closing the modal
 * @param {Object} [props.initialValues] - Initial values for the form
 */
const AddGoalModal = ({ open, onClose, initialValues = {} }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ open: false, type: 'success', message: '' });
  
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    targetAmount: initialValues.targetAmount || '',
    currentAmount: initialValues.currentAmount || '',
    deadline: initialValues.deadline || '',
    goalType: initialValues.goalType || 'retirement',
    priority: initialValues.priority || 'medium',
    icon: initialValues.icon || '🎯',
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

  // Calculate progress percentage
  const progressPercentage = formData.targetAmount && formData.currentAmount 
    ? Math.min(100, (Number(formData.currentAmount) / Number(formData.targetAmount)) * 100)
    : 0;

  // Calculate estimated time remaining in months
  const calculateMonthsRemaining = () => {
    if (!formData.deadline) return null;
    
    const deadlineDate = new Date(formData.deadline);
    const today = new Date();
    const monthsDiff = (deadlineDate.getFullYear() - today.getFullYear()) * 12 + 
                      (deadlineDate.getMonth() - today.getMonth());
    
    return Math.max(0, monthsDiff);
  };
  
  const monthsRemaining = calculateMonthsRemaining();
  const monthlyContributionNeeded = monthsRemaining && formData.targetAmount && formData.currentAmount
    ? (Number(formData.targetAmount) - Number(formData.currentAmount)) / monthsRemaining
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name || !formData.targetAmount || !formData.deadline || !formData.goalType) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (isNaN(formData.targetAmount) || Number(formData.targetAmount) <= 0) {
      setError('Please enter a valid target amount');
      return;
    }
    
    if (formData.currentAmount && (isNaN(formData.currentAmount) || Number(formData.currentAmount) < 0)) {
      setError('Please enter a valid current amount');
      return;
    }
    
    // Validate deadline is in the future
    const deadlineDate = new Date(formData.deadline);
    const today = new Date();
    if (deadlineDate <= today) {
      setError('Deadline must be in the future');
      return;
    }
    
    setLoading(true);
    try {
      // This would call a function to add a goal from the portfolio context
      // But for now, we'll just simulate success
      // const result = await addGoal(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = { success: true };
      
      if (result.success) {
        // Show success notification
        setNotification({
          open: true,
          type: 'success',
          message: '🎯 Goal added successfully!'
        });
        
        // Reset form data
        setFormData({
          name: '',
          targetAmount: '',
          currentAmount: '',
          deadline: '',
          goalType: 'retirement',
          priority: 'medium',
          icon: '🎯',
        });
        
        // Close modal after a short delay to show notification
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(result.error || 'Failed to add goal');
        setNotification({
          open: true,
          type: 'error',
          message: `❌ ${result.error || 'Failed to add goal'}`
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
        <DialogTitle>Add Financial Goal</DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  name="name"
                  label="Goal Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Retirement Fund, New Car, House Down Payment"
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  name="icon"
                  label="Icon (Emoji)"
                  variant="outlined"
                  fullWidth
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="🏠 🚗 💰"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="targetAmount"
                  label="Target Amount"
                  variant="outlined"
                  fullWidth
                  required
                  type="number"
                  inputProps={{ min: 0 }}
                  value={formData.targetAmount}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="currentAmount"
                  label="Current Amount (Optional)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  inputProps={{ min: 0 }}
                  value={formData.currentAmount}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  name="goalType"
                  label="Goal Type"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.goalType}
                  onChange={handleChange}
                >
                  <MenuItem value="retirement">Retirement</MenuItem>
                  <MenuItem value="education">Education</MenuItem>
                  <MenuItem value="house">Home Purchase</MenuItem>
                  <MenuItem value="car">Vehicle</MenuItem>
                  <MenuItem value="travel">Travel</MenuItem>
                  <MenuItem value="emergency">Emergency Fund</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  name="priority"
                  label="Priority Level"
                  variant="outlined"
                  fullWidth
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="deadline"
                  label="Target Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              {progressPercentage > 0 && formData.targetAmount && (
                <Grid item xs={12}>
                  <Box sx={{ 
                    mt: 1, 
                    p: 2, 
                    bgcolor: 'background.paper', 
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Progress
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {progressPercentage.toFixed(1)}%
                      </Typography>
                    </Box>
                    
                    <ProgressSlider
                      value={progressPercentage}
                      valueLabelDisplay="off"
                      disabled
                    />
                    
                    {monthlyContributionNeeded && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Recommended Monthly Contribution
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                          {formatCurrency(monthlyContributionNeeded)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                          {monthsRemaining} months remaining to reach your goal
                        </Typography>
                      </Box>
                    )}
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
              {loading ? <CircularProgress size={24} /> : 'Save Goal'}
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

export default AddGoalModal;
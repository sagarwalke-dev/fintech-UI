import React from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Divider,
  Chip
} from '@mui/material';
import { formatCurrency } from '../utils/formatters';

/**
 * Modal component for displaying detailed information about a financial goal
 * 
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {function} props.onClose - Function to call when closing the modal
 * @param {Object} props.goal - The goal object to display details for
 * @param {boolean} props.isAmountHidden - Whether to hide monetary amounts
 */
const GoalDetailsModal = ({ open, onClose, goal, isAmountHidden }) => {
  if (!goal) return null;
  
  // Calculate time remaining
  const calculateTimeRemaining = () => {
    const deadlineDate = new Date(goal.deadline);
    const today = new Date();
    
    const monthsDiff = (deadlineDate.getFullYear() - today.getFullYear()) * 12 + 
                      (deadlineDate.getMonth() - today.getMonth());
    
    const yearsDiff = Math.floor(monthsDiff / 12);
    const remainingMonths = monthsDiff % 12;
    
    if (yearsDiff > 0 && remainingMonths > 0) {
      return `${yearsDiff} year${yearsDiff !== 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (yearsDiff > 0) {
      return `${yearsDiff} year${yearsDiff !== 1 ? 's' : ''}`;
    } else if (remainingMonths > 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else {
      return 'Less than a month';
    }
  };
  
  // Calculate monthly contribution needed to reach goal
  const calculateMonthlyContribution = () => {
    const deadlineDate = new Date(goal.deadline);
    const today = new Date();
    const monthsDiff = (deadlineDate.getFullYear() - today.getFullYear()) * 12 + 
                      (deadlineDate.getMonth() - today.getMonth());
    
    if (monthsDiff <= 0) return 0;
    
    const remaining = goal.targetAmount - goal.currentAmount;
    return remaining / monthsDiff;
  };

  // Get progress color based on percentage and priority
  const getProgressColor = (progress, priority) => {
    if (priority === 'high') {
      return progress < 30 ? '#FF5757' : progress < 70 ? '#FF9800' : '#00C087';
    }
    return progress < 30 ? '#FF9800' : progress < 70 ? '#5367FF' : '#00C087';
  };
  
  // Monthly contribution needed
  const monthlyContribution = calculateMonthlyContribution();
  
  // Time remaining
  const timeRemaining = calculateTimeRemaining();
  
  // Amount remaining
  const amountRemaining = goal.targetAmount - goal.currentAmount;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 1, fontSize: '1.5rem' }}>{goal.icon}</Box>
        <Typography variant="h6" component="div">
          {goal.name}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            {goal.goalType.charAt(0).toUpperCase() + goal.goalType.slice(1).replace('_', ' ')} Goal
            <Chip 
              label={goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} 
              size="small"
              sx={{ 
                ml: 1, 
                bgcolor: goal.priority === 'high' ? 'rgba(255,87,87,0.1)' : 'rgba(83,103,255,0.1)',
                color: goal.priority === 'high' ? '#FF5757' : '#5367FF',
              }}
            />
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Target Date: {new Date(goal.deadline).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>Progress</Typography>
          <LinearProgress 
            variant="determinate" 
            value={goal.progressPercent} 
            sx={{ 
              height: 10, 
              borderRadius: 1,
              backgroundColor: 'rgba(0,0,0,0.06)',
              mb: 1,
              '& .MuiLinearProgress-bar': {
                backgroundColor: getProgressColor(goal.progressPercent, goal.priority)
              }
            }}
          />
          <Typography variant="body2" align="right">
            {goal.progressPercent}% complete
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Target Amount</Typography>
            <Typography variant="h6">
              {isAmountHidden ? '••••••' : formatCurrency(goal.targetAmount)}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Current Amount</Typography>
            <Typography variant="h6">
              {isAmountHidden ? '••••••' : formatCurrency(goal.currentAmount)}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Amount Remaining</Typography>
            <Typography variant="h6">
              {isAmountHidden ? '••••••' : formatCurrency(amountRemaining)}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Time Remaining</Typography>
            <Typography variant="h6">{timeRemaining}</Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body1" gutterBottom fontWeight={500}>
            Recommended Monthly Contribution
          </Typography>
          <Typography variant="h5" color="primary.main">
            {isAmountHidden ? '••••••' : formatCurrency(monthlyContribution)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            To reach your goal by {new Date(goal.deadline).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'short'
            })}
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GoalDetailsModal;
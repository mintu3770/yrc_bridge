import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'volunteer_approved',
      user: 'Jennifer Martinez',
      action: 'Volunteer application approved',
      timestamp: '2 minutes ago',
      icon: 'UserCheck',
      color: 'success'
    },
    {
      id: 2,
      type: 'donation_assigned',
      user: 'Michael Chen',
      action: 'Donation DON-001 assigned to Sarah Johnson',
      timestamp: '5 minutes ago',
      icon: 'Heart',
      color: 'primary'
    },
    {
      id: 3,
      type: 'user_registered',
      user: 'Amanda Foster',
      action: 'New patient registered',
      timestamp: '12 minutes ago',
      icon: 'UserPlus',
      color: 'primary'
    },
    {
      id: 4,
      type: 'donation_completed',
      user: 'David Wilson',
      action: 'Blood donation completed successfully',
      timestamp: '18 minutes ago',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 5,
      type: 'volunteer_rejected',
      user: 'Carlos Rodriguez',
      action: 'Volunteer application rejected',
      timestamp: '25 minutes ago',
      icon: 'XCircle',
      color: 'error'
    },
    {
      id: 6,
      type: 'system_alert',
      user: 'System',
      action: 'High priority donation request received',
      timestamp: '32 minutes ago',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      id: 7,
      type: 'user_promoted',
      user: 'Lisa Thompson',
      action: 'User promoted to admin role',
      timestamp: '45 minutes ago',
      icon: 'Shield',
      color: 'error'
    },
    {
      id: 8,
      type: 'donation_cancelled',
      user: 'Robert Kim',
      action: 'Donation request DON-005 cancelled',
      timestamp: '1 hour ago',
      icon: 'X',
      color: 'error'
    },
    {
      id: 9,
      type: 'volunteer_assigned',
      user: 'Emily Rodriguez',
      action: 'Assigned to donation DON-002',
      timestamp: '1 hour ago',
      icon: 'Users',
      color: 'primary'
    },
    {
      id: 10,
      type: 'report_generated',
      user: 'Admin',
      action: 'Monthly performance report generated',
      timestamp: '2 hours ago',
      icon: 'BarChart3',
      color: 'success'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      error: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[color] || colors?.primary;
  };

  const getActivityTypeLabel = (type) => {
    const labels = {
      volunteer_approved: 'Volunteer Approved',
      volunteer_rejected: 'Volunteer Rejected',
      volunteer_assigned: 'Volunteer Assigned',
      donation_assigned: 'Donation Assigned',
      donation_completed: 'Donation Completed',
      donation_cancelled: 'Donation Cancelled',
      user_registered: 'User Registered',
      user_promoted: 'User Promoted',
      system_alert: 'System Alert',
      report_generated: 'Report Generated'
    };
    return labels?.[type] || 'Activity';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">Recent Activity</h3>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Latest system activities and updates
            </p>
          </div>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-200">
            <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className={`p-4 hover:bg-muted/30 transition-colors duration-200 ${index !== activities?.length - 1 ? 'border-b border-border' : ''}`}>
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 ${getColorClasses(activity?.color)}`}>
                <Icon name={activity?.icon} size={14} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-body text-sm text-foreground">
                      <span className="font-medium">{activity?.user}</span>
                    </p>
                    <p className="font-body text-sm text-muted-foreground mt-1">
                      {activity?.action}
                    </p>
                  </div>
                  <span className="font-caption text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {activity?.timestamp}
                  </span>
                </div>
                
                <div className="flex items-center mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getColorClasses(activity?.color)}`}>
                    {getActivityTypeLabel(activity?.type)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full text-center font-body text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;
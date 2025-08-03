import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'donation':
        return 'Heart';
      case 'volunteer_assigned':
        return 'UserCheck';
      case 'status_update':
        return 'RefreshCw';
      case 'completion':
        return 'CheckCircle';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'donation':
        return 'text-primary';
      case 'volunteer_assigned':
        return 'text-accent';
      case 'status_update':
        return 'text-warning';
      case 'completion':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h3 className="font-heading font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body text-foreground">{activity?.message}</p>
              <p className="text-xs font-caption text-muted-foreground mt-1">{activity?.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
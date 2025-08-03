import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction = () => {} }) => {
  const actions = [
    {
      id: 'update-availability',
      label: 'Update Availability',
      description: 'Change your status or schedule',
      icon: 'Calendar',
      color: 'bg-primary',
      action: () => onAction('availability')
    },
    {
      id: 'training-materials',
      label: 'Training Materials',
      description: 'Access guides and resources',
      icon: 'BookOpen',
      color: 'bg-accent',
      action: () => onAction('training')
    },
    {
      id: 'contact-coordinator',
      label: 'Contact Coordinator',
      description: 'Get help or report issues',
      icon: 'MessageCircle',
      color: 'bg-warning',
      action: () => onAction('contact')
    },
    {
      id: 'emergency-response',
      label: 'Emergency Response',
      description: 'Report urgent situations',
      icon: 'AlertTriangle',
      color: 'bg-destructive',
      action: () => onAction('emergency')
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      title: 'New urgent assignment available',
      message: 'Blood donation needed in your area',
      time: '5 min ago',
      type: 'urgent',
      unread: true
    },
    {
      id: 2,
      title: 'Assignment completed successfully',
      message: 'Thank you for helping Sarah Johnson',
      time: '2 hours ago',
      type: 'success',
      unread: false
    },
    {
      id: 3,
      title: 'Training session reminder',
      message: 'First Aid training tomorrow at 2 PM',
      time: '1 day ago',
      type: 'info',
      unread: false
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent': return 'AlertCircle';
      case 'success': return 'CheckCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'urgent': return 'text-destructive';
      case 'success': return 'text-success';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="p-4 border border-border rounded-lg hover:shadow-card transition-all duration-200 text-left group"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <Icon name={action?.icon} size={24} color="white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-body font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {action?.label}
                  </h4>
                  <p className="font-caption text-sm text-muted-foreground mt-1">
                    {action?.description}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Notifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">Recent Notifications</h3>
          <Button variant="ghost" size="sm" iconName="Bell">
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {recentNotifications?.map((notification) => (
            <div key={notification?.id} className={`p-4 rounded-lg border transition-colors duration-200 ${
              notification?.unread ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  notification?.type === 'urgent' ? 'bg-destructive/10' :
                  notification?.type === 'success'? 'bg-success/10' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={getNotificationIcon(notification?.type)} 
                    size={16} 
                    className={getNotificationColor(notification?.type)}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-body font-medium text-sm text-foreground">
                        {notification?.title}
                      </h4>
                      <p className="font-body text-sm text-muted-foreground mt-1">
                        {notification?.message}
                      </p>
                      <p className="font-caption text-xs text-muted-foreground mt-2">
                        {notification?.time}
                      </p>
                    </div>
                    {notification?.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center">
            <Icon name="Phone" size={24} color="white" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground mb-2">Emergency Hotline</h3>
            <p className="font-body text-sm text-muted-foreground mb-4">
              For urgent situations or immediate assistance, contact our 24/7 emergency hotline.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="destructive"
                size="sm"
                iconName="Phone"
                iconPosition="left"
                onClick={() => onAction('emergency-call')}
              >
                Call Emergency: +1-800-YRC-HELP
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="MessageSquare"
                iconPosition="left"
                onClick={() => onAction('emergency-chat')}
              >
                Emergency Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
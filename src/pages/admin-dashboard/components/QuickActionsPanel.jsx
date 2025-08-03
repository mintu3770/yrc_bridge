import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      id: 'approve-volunteers',
      title: 'Approve Volunteers',
      description: 'Review and approve pending volunteer applications',
      icon: 'UserCheck',
      color: 'primary',
      count: 8,
      action: () => console.log('Navigate to volunteer approvals')
    },
    {
      id: 'assign-donations',
      title: 'Assign Donations',
      description: 'Match volunteers with pending donation requests',
      icon: 'Heart',
      color: 'success',
      count: 12,
      action: () => console.log('Navigate to donation assignments')
    },
    {
      id: 'verify-users',
      title: 'Verify Users',
      description: 'Review user profiles requiring verification',
      icon: 'Shield',
      color: 'warning',
      count: 5,
      action: () => console.log('Navigate to user verification')
    },
    {
      id: 'system-alerts',
      title: 'System Alerts',
      description: 'Address critical system notifications',
      icon: 'AlertTriangle',
      color: 'error',
      count: 3,
      action: () => console.log('Navigate to system alerts')
    },
    {
      id: 'bulk-operations',
      title: 'Bulk Operations',
      description: 'Perform bulk actions on users and donations',
      icon: 'Database',
      color: 'primary',
      count: null,
      action: () => console.log('Navigate to bulk operations')
    },
    {
      id: 'generate-reports',
      title: 'Generate Reports',
      description: 'Create detailed analytics and performance reports',
      icon: 'BarChart3',
      color: 'success',
      count: null,
      action: () => console.log('Navigate to report generation')
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
      success: 'bg-success/10 text-success border-success/20 hover:bg-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20',
      error: 'bg-error/10 text-error border-error/20 hover:bg-error/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground">Quick Actions</h3>
        <p className="font-body text-sm text-muted-foreground mt-1">
          Frequently used administrative tasks
        </p>
      </div>
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className="w-full p-4 bg-muted/30 hover:bg-muted/50 border border-border rounded-lg transition-colors duration-200 text-left group"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getColorClasses(action?.color)}`}>
                <Icon name={action?.icon} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-body font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {action?.title}
                  </h4>
                  {action?.count && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getColorClasses(action?.color)}`}>
                      {action?.count}
                    </span>
                  )}
                </div>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {action?.description}
                </p>
              </div>
              
              <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            </div>
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Settings">
          Admin Settings
        </Button>
      </div>
    </div>
  );
};

export default QuickActionsPanel;
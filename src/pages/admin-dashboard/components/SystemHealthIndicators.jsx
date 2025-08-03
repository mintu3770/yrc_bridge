import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthIndicators = () => {
  const healthMetrics = [
    {
      id: 'server_status',
      name: 'Server Status',
      status: 'healthy',
      value: '99.9%',
      description: 'Uptime',
      icon: 'Server',
      lastUpdated: '2 minutes ago'
    },
    {
      id: 'database_performance',
      name: 'Database Performance',
      status: 'healthy',
      value: '45ms',
      description: 'Avg Response Time',
      icon: 'Database',
      lastUpdated: '1 minute ago'
    },
    {
      id: 'api_health',
      name: 'API Health',
      status: 'warning',
      value: '98.2%',
      description: 'Success Rate',
      icon: 'Zap',
      lastUpdated: '30 seconds ago'
    },
    {
      id: 'storage_usage',
      name: 'Storage Usage',
      status: 'healthy',
      value: '67%',
      description: 'Disk Space Used',
      icon: 'HardDrive',
      lastUpdated: '5 minutes ago'
    },
    {
      id: 'active_sessions',
      name: 'Active Sessions',
      status: 'healthy',
      value: '1,247',
      description: 'Current Users',
      icon: 'Users',
      lastUpdated: '1 minute ago'
    },
    {
      id: 'error_rate',
      name: 'Error Rate',
      status: 'critical',
      value: '2.1%',
      description: 'Last 24 Hours',
      icon: 'AlertTriangle',
      lastUpdated: '30 seconds ago'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High API Response Time',
      message: 'API response time increased by 15% in the last hour',
      timestamp: '5 minutes ago'
    },
    {
      id: 2,
      type: 'error',
      title: 'Database Connection Issues',
      message: 'Intermittent database connection failures detected',
      timestamp: '12 minutes ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight at 2:00 AM',
      timestamp: '1 hour ago'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      healthy: 'text-success bg-success/10 border-success/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      critical: 'text-error bg-error/10 border-error/20'
    };
    return colors?.[status] || colors?.healthy;
  };

  const getStatusIcon = (status) => {
    const icons = {
      healthy: 'CheckCircle',
      warning: 'AlertTriangle',
      critical: 'XCircle'
    };
    return icons?.[status] || icons?.healthy;
  };

  const getAlertColor = (type) => {
    const colors = {
      info: 'text-primary bg-primary/10 border-primary/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      error: 'text-error bg-error/10 border-error/20'
    };
    return colors?.[type] || colors?.info;
  };

  const getAlertIcon = (type) => {
    const icons = {
      info: 'Info',
      warning: 'AlertTriangle',
      error: 'AlertCircle'
    };
    return icons?.[type] || icons?.info;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">System Health</h3>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Real-time system monitoring
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="font-caption text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </div>
      {/* Health Metrics */}
      <div className="p-4 space-y-3 border-b border-border">
        {healthMetrics?.map((metric) => (
          <div key={metric?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${getStatusColor(metric?.status)}`}>
                <Icon name={metric?.icon} size={16} />
              </div>
              <div>
                <p className="font-body font-medium text-sm text-foreground">{metric?.name}</p>
                <p className="font-caption text-xs text-muted-foreground">{metric?.description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="font-body font-semibold text-sm text-foreground">{metric?.value}</span>
                <Icon name={getStatusIcon(metric?.status)} size={14} className={getStatusColor(metric?.status)?.split(' ')?.[0]} />
              </div>
              <p className="font-caption text-xs text-muted-foreground">{metric?.lastUpdated}</p>
            </div>
          </div>
        ))}
      </div>
      {/* System Alerts */}
      <div className="p-4">
        <h4 className="font-body font-semibold text-sm text-foreground mb-3">Recent Alerts</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {systemAlerts?.map((alert) => (
            <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
              <div className="flex items-start space-x-3">
                <Icon name={getAlertIcon(alert.type)} size={16} className="flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm">{alert.title}</p>
                  <p className="font-body text-xs mt-1 opacity-90">{alert.message}</p>
                  <p className="font-caption text-xs mt-2 opacity-70">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full text-center font-body text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View System Dashboard
        </button>
      </div>
    </div>
  );
};

export default SystemHealthIndicators;
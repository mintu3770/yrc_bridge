import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsPanel = ({ stats }) => {
  const statItems = [
    {
      id: 'completed',
      label: 'Assignments Completed',
      value: stats?.assignmentsCompleted,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'success-rate',
      label: 'Success Rate',
      value: `${stats?.successRate}%`,
      icon: 'TrendingUp',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'recognition',
      label: 'Recognition Points',
      value: stats?.recognitionPoints?.toLocaleString(),
      icon: 'Award',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'hours',
      label: 'Service Hours',
      value: `${stats?.serviceHours}h`,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  const achievements = [
    { name: 'First Responder', description: 'Completed first assignment', earned: true },
    { name: 'Reliable Helper', description: 'Maintained 90%+ success rate', earned: stats?.successRate >= 90 },
    { name: 'Community Champion', description: 'Completed 50+ assignments', earned: stats?.assignmentsCompleted >= 50 },
    { name: 'Time Keeper', description: 'Logged 100+ service hours', earned: stats?.serviceHours >= 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-6">Your Impact</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems?.map((item) => (
            <div key={item?.id} className="text-center">
              <div className={`w-12 h-12 ${item?.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <Icon name={item?.icon} size={24} className={item?.color} />
              </div>
              <div className="space-y-1">
                <p className="font-heading font-bold text-2xl text-foreground">{item?.value}</p>
                <p className="font-caption text-sm text-muted-foreground">{item?.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {stats?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity?.type === 'completed' ? 'bg-success/10' :
                activity?.type === 'started'? 'bg-primary/10' : 'bg-warning/10'
              }`}>
                <Icon 
                  name={
                    activity?.type === 'completed' ? 'CheckCircle' :
                    activity?.type === 'started'? 'Play' : 'Clock'
                  } 
                  size={16} 
                  className={
                    activity?.type === 'completed' ? 'text-success' :
                    activity?.type === 'started'? 'text-primary' : 'text-warning'
                  }
                />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm text-foreground">{activity?.description}</p>
                <p className="font-caption text-xs text-muted-foreground">{activity?.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements?.map((achievement, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              achievement?.earned 
                ? 'border-success bg-success/5' :'border-border bg-muted/50'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement?.earned ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={achievement?.earned ? 'Award' : 'Lock'} size={16} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-body font-medium text-sm ${
                    achievement?.earned ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {achievement?.name}
                  </h4>
                  <p className="font-caption text-xs text-muted-foreground mt-1">
                    {achievement?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Monthly Progress */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">This Month's Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-body text-sm text-foreground">Assignments Goal</span>
              <span className="font-caption text-sm text-muted-foreground">{stats?.monthlyProgress?.assignments}/10</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min((stats?.monthlyProgress?.assignments / 10) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-body text-sm text-foreground">Service Hours Goal</span>
              <span className="font-caption text-sm text-muted-foreground">{stats?.monthlyProgress?.hours}/40h</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min((stats?.monthlyProgress?.hours / 40) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
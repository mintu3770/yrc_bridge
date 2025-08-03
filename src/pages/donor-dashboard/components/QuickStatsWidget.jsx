import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsWidget = ({ stats }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h3 className="font-heading font-semibold text-foreground mb-4">Quick Stats</h3>
      <div className="space-y-4">
        {stats?.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={16} className={stat?.iconColor} />
              </div>
              <span className="text-sm font-body text-foreground">{stat?.label}</span>
            </div>
            <span className="text-sm font-body font-medium text-foreground">{stat?.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsWidget;
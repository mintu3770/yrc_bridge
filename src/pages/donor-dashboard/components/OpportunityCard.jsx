import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OpportunityCard = ({ opportunity }) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'text-destructive';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-primary';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'Clock';
      case 'medium':
        return 'Info';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name={opportunity?.icon} size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">{opportunity?.title}</h3>
            <p className="text-sm text-muted-foreground font-body">{opportunity?.location}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${getUrgencyColor(opportunity?.urgency)}`}>
          <Icon name={getUrgencyIcon(opportunity?.urgency)} size={16} />
          <span className="text-xs font-caption font-medium capitalize">{opportunity?.urgency}</span>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <p className="text-sm text-foreground font-body">{opportunity?.description}</p>
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{opportunity?.beneficiaries} beneficiaries</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>{opportunity?.deadline}</span>
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground font-body">Needed: </span>
          <span className="text-foreground font-body font-medium">{opportunity?.needed}</span>
        </div>
        <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
          Donate Now
        </Button>
      </div>
    </div>
  );
};

export default OpportunityCard;
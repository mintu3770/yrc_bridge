import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DonationCard = ({ donation }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'in-progress':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'pending':
        return 25;
      case 'in-progress':
        return 75;
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={donation?.icon} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">{donation?.title}</h3>
            <p className="text-sm text-muted-foreground font-body">{donation?.recipientType}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(donation?.status)}`}>
          {donation?.status?.charAt(0)?.toUpperCase() + donation?.status?.slice(1)}
        </span>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-body">Resource:</span>
          <span className="text-foreground font-body font-medium">{donation?.resource}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-body">Volunteer:</span>
          <span className="text-foreground font-body font-medium">{donation?.volunteer}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-body">Timeline:</span>
          <span className="text-foreground font-body font-medium">{donation?.timeline}</span>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground font-body">Progress</span>
          <span className="text-foreground font-body font-medium">{getProgressPercentage(donation?.status)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${getProgressPercentage(donation?.status)}%` }}
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
          Contact
        </Button>
        <Button variant="ghost" size="sm" iconName="Eye" iconPosition="left">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default DonationCard;
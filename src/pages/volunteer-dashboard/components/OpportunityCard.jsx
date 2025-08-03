import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const OpportunityCard = ({ opportunity, onAccept = () => {}, onViewDetails = () => {} }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffHours = Math.ceil((deadlineDate - now) / (1000 * 60 * 60));
    
    if (diffHours < 0) return 'Overdue';
    if (diffHours < 24) return `${diffHours}h remaining`;
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays}d remaining`;
  };

  const getMatchScore = (score) => {
    if (score >= 90) return { label: 'Perfect Match', color: 'text-success' };
    if (score >= 75) return { label: 'Great Match', color: 'text-primary' };
    if (score >= 60) return { label: 'Good Match', color: 'text-warning' };
    return { label: 'Fair Match', color: 'text-muted-foreground' };
  };

  const matchInfo = getMatchScore(opportunity?.matchScore);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-shadow duration-200">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name={opportunity?.resourceType === 'blood' ? 'Heart' : opportunity?.resourceType === 'financial' ? 'DollarSign' : 'Package'} size={20} color="white" />
            </div>
            <div>
              <h4 className="font-body font-semibold text-foreground">{opportunity?.title}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-sm font-caption font-medium ${matchInfo?.color}`}>
                  {matchInfo?.label} ({opportunity?.matchScore}%)
                </span>
              </div>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getPriorityColor(opportunity?.priority)}`}>
            {opportunity?.priority}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span className="font-caption">{opportunity?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span className="font-caption">{getTimeRemaining(opportunity?.deadline)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Users" size={14} />
            <span className="font-caption text-xs">{opportunity?.volunteersNeeded} needed</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start space-x-4 mb-4">
          <Image
            src={opportunity?.requester?.avatar}
            alt={opportunity?.requester?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h5 className="font-body font-medium text-foreground">{opportunity?.requester?.name}</h5>
              <span className="px-2 py-0.5 bg-muted rounded text-xs font-caption text-muted-foreground capitalize">
                {opportunity?.requester?.type}
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-2">{opportunity?.description}</p>
          </div>
        </div>

        {/* Resource Details */}
        <div className="bg-muted rounded-lg p-3 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-caption text-muted-foreground">Resource Type:</span>
              <p className="font-body font-medium text-foreground capitalize">{opportunity?.resourceType}</p>
            </div>
            <div>
              <span className="font-caption text-muted-foreground">Quantity/Amount:</span>
              <p className="font-body font-medium text-foreground">{opportunity?.quantity}</p>
            </div>
            <div>
              <span className="font-caption text-muted-foreground">Deadline:</span>
              <p className="font-body font-medium text-foreground">{formatDate(opportunity?.deadline)}</p>
            </div>
            <div>
              <span className="font-caption text-muted-foreground">Posted:</span>
              <p className="font-body font-medium text-foreground">{formatDate(opportunity?.postedAt)}</p>
            </div>
          </div>
        </div>

        {/* Skills Match */}
        {opportunity?.skillsMatch && opportunity?.skillsMatch?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-body font-medium text-sm text-foreground mb-2">Matching Skills:</h6>
            <div className="flex flex-wrap gap-2">
              {opportunity?.skillsMatch?.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-caption">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="default"
            size="sm"
            iconName="UserPlus"
            iconPosition="left"
            onClick={() => onAccept(opportunity?.id)}
            fullWidth
          >
            Accept Assignment
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(opportunity)}
            fullWidth
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
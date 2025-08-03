import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AssignmentCard = ({ assignment, onStatusUpdate = () => {}, onContact = () => {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-progress': return 'bg-primary text-primary-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-success text-success-foreground';
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

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-shadow duration-200">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name={assignment?.resourceType === 'blood' ? 'Heart' : assignment?.resourceType === 'financial' ? 'DollarSign' : 'Package'} size={20} color="white" />
            </div>
            <div>
              <h4 className="font-body font-semibold text-foreground">{assignment?.title}</h4>
              <p className="font-caption text-sm text-muted-foreground">ID: #{assignment?.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getPriorityColor(assignment?.priority)}`}>
              {assignment?.priority}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(assignment?.status)}`}>
              {assignment?.status}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span className="font-caption">{assignment?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span className="font-caption">{getTimeRemaining(assignment?.deadline)}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start space-x-4 mb-4">
          <Image
            src={assignment?.requester?.avatar}
            alt={assignment?.requester?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h5 className="font-body font-medium text-foreground">{assignment?.requester?.name}</h5>
              <span className="px-2 py-0.5 bg-muted rounded text-xs font-caption text-muted-foreground capitalize">
                {assignment?.requester?.type}
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground mb-2">{assignment?.description}</p>
            {isExpanded && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} className="text-muted-foreground" />
                  <span className="font-caption text-muted-foreground">{assignment?.requester?.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={14} className="text-muted-foreground" />
                  <span className="font-caption text-muted-foreground">{assignment?.requester?.email}</span>
                </div>
                <div className="bg-muted rounded-lg p-3 mt-3">
                  <h6 className="font-body font-medium text-sm text-foreground mb-2">Additional Details:</h6>
                  <p className="font-body text-sm text-muted-foreground">{assignment?.additionalInfo}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resource Details */}
        <div className="bg-muted rounded-lg p-3 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-caption text-muted-foreground">Resource Type:</span>
              <p className="font-body font-medium text-foreground capitalize">{assignment?.resourceType}</p>
            </div>
            <div>
              <span className="font-caption text-muted-foreground">Quantity/Amount:</span>
              <p className="font-body font-medium text-foreground">{assignment?.quantity}</p>
            </div>
            <div>
              <span className="font-caption text-muted-foreground">Deadline:</span>
              <p className="font-body font-medium text-foreground">{formatDate(assignment?.deadline)}</p>
            </div>
            <div>
              <span className="font-caption text-muted-foreground">Assigned:</span>
              <p className="font-body font-medium text-foreground">{formatDate(assignment?.assignedAt)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          {assignment?.status === 'pending' && (
            <>
              <Button
                variant="default"
                size="sm"
                iconName="Play"
                iconPosition="left"
                onClick={() => onStatusUpdate(assignment?.id, 'in-progress')}
                fullWidth
              >
                Start Assignment
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => onContact(assignment?.requester)}
                fullWidth
              >
                Contact
              </Button>
            </>
          )}
          
          {assignment?.status === 'in-progress' && (
            <>
              <Button
                variant="success"
                size="sm"
                iconName="CheckCircle"
                iconPosition="left"
                onClick={() => onStatusUpdate(assignment?.id, 'completed')}
                fullWidth
              >
                Mark Complete
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => onContact(assignment?.requester)}
                fullWidth
              >
                Contact
              </Button>
            </>
          )}

          {assignment?.status === 'completed' && (
            <div className="flex items-center justify-center py-2 text-success">
              <Icon name="CheckCircle" size={16} className="mr-2" />
              <span className="font-body font-medium text-sm">Assignment Completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RequestCard = ({ request, onViewDetails, onContactVolunteer }) => {
  const getStatusConfig = (status) => {
    const configs = {
      submitted: { color: 'bg-blue-100 text-blue-800', icon: 'Clock', label: 'Submitted' },
      'under-review': { color: 'bg-yellow-100 text-yellow-800', icon: 'Search', label: 'Under Review' },
      'volunteer-assigned': { color: 'bg-green-100 text-green-800', icon: 'UserCheck', label: 'Volunteer Assigned' },
      'in-progress': { color: 'bg-orange-100 text-orange-800', icon: 'Activity', label: 'In Progress' },
      completed: { color: 'bg-gray-100 text-gray-800', icon: 'CheckCircle', label: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', icon: 'XCircle', label: 'Cancelled' }
    };
    return configs?.[status] || configs?.submitted;
  };

  const getUrgencyConfig = (urgency) => {
    const configs = {
      critical: { color: 'text-red-600', icon: 'AlertTriangle', label: 'Critical' },
      high: { color: 'text-orange-600', icon: 'AlertCircle', label: 'High' },
      medium: { color: 'text-yellow-600', icon: 'Clock', label: 'Medium' },
      low: { color: 'text-green-600', icon: 'Info', label: 'Low' }
    };
    return configs?.[urgency] || configs?.medium;
  };

  const statusConfig = getStatusConfig(request?.status);
  const urgencyConfig = getUrgencyConfig(request?.urgency);

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-heading font-semibold text-lg text-foreground">{request?.resourceType}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig?.color}`}>
              <Icon name={statusConfig?.icon} size={12} className="mr-1" />
              {statusConfig?.label}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>Submitted: {request?.submissionDate}</span>
            </div>
            <div className={`flex items-center space-x-1 ${urgencyConfig?.color}`}>
              <Icon name={urgencyConfig?.icon} size={14} />
              <span className="font-medium">{urgencyConfig?.label} Priority</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            onClick={() => onViewDetails(request)}
          >
            View
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Description:</p>
          <p className="text-sm text-foreground">{request?.description}</p>
        </div>

        {request?.location && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>{request?.location}</span>
          </div>
        )}

        {request?.volunteer && (
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-sm">
                    {request?.volunteer?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{request?.volunteer?.name}</p>
                  <p className="text-xs text-muted-foreground">Assigned Volunteer</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="MessageCircle"
                onClick={() => onContactVolunteer(request?.volunteer)}
              >
                Contact
              </Button>
            </div>
          </div>
        )}

        {request?.estimatedCompletion && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Estimated completion: {request?.estimatedCompletion}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
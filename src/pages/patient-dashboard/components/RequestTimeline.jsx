import React from 'react';
import Icon from '../../../components/AppIcon';

const RequestTimeline = ({ request }) => {
  const getTimelineSteps = () => {
    const allSteps = [
      { id: 'submitted', label: 'Request Submitted', icon: 'Send', description: 'Your request has been received' },
      { id: 'under-review', label: 'Under Review', icon: 'Search', description: 'Our team is reviewing your request' },
      { id: 'volunteer-assigned', label: 'Volunteer Assigned', icon: 'UserCheck', description: 'A volunteer has been assigned to help' },
      { id: 'in-progress', label: 'In Progress', icon: 'Activity', description: 'Volunteer is working on your request' },
      { id: 'completed', label: 'Completed', icon: 'CheckCircle', description: 'Request has been fulfilled' }
    ];

    const statusOrder = ['submitted', 'under-review', 'volunteer-assigned', 'in-progress', 'completed'];
    const currentIndex = statusOrder?.indexOf(request?.status);

    return allSteps?.map((step, index) => ({
      ...step,
      isCompleted: index <= currentIndex,
      isCurrent: index === currentIndex,
      timestamp: index <= currentIndex ? request?.timeline?.[step?.id] : null
    }));
  };

  const steps = getTimelineSteps();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-6">Request Progress</h3>
      <div className="space-y-6">
        {steps?.map((step, index) => (
          <div key={step?.id} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step?.isCompleted 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : step?.isCurrent
                  ? 'bg-primary/10 border-primary text-primary' :'bg-muted border-border text-muted-foreground'
              }`}>
                <Icon name={step?.icon} size={16} />
              </div>
              {index < steps?.length - 1 && (
                <div className={`w-0.5 h-8 mt-2 ${
                  step?.isCompleted ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium text-sm ${
                  step?.isCompleted || step?.isCurrent ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.label}
                </h4>
                {step?.timestamp && (
                  <span className="text-xs text-muted-foreground">{step?.timestamp}</span>
                )}
              </div>
              <p className={`text-sm mt-1 ${
                step?.isCompleted || step?.isCurrent ? 'text-muted-foreground' : 'text-muted-foreground/60'
              }`}>
                {step?.description}
              </p>
              
              {step?.isCurrent && request?.estimatedCompletion && (
                <div className="mt-2 flex items-center space-x-2 text-xs text-primary">
                  <Icon name="Clock" size={12} />
                  <span>Expected by: {request?.estimatedCompletion}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestTimeline;
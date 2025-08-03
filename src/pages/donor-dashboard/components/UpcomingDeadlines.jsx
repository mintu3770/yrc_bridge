import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingDeadlines = ({ deadlines }) => {
  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (days) => {
    if (days <= 1) return 'text-destructive';
    if (days <= 3) return 'text-warning';
    if (days <= 7) return 'text-primary';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">Upcoming Deadlines</h3>
        <Icon name="Clock" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {deadlines?.map((item, index) => {
          const daysLeft = getDaysUntilDeadline(item?.deadline);
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground truncate">{item?.title}</p>
                <p className="text-xs font-caption text-muted-foreground">{item?.type}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-body font-medium ${getUrgencyColor(daysLeft)}`}>
                  {daysLeft > 0 ? `${daysLeft} days` : 'Today'}
                </p>
                <Button variant="ghost" size="xs" className="mt-1">
                  View
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
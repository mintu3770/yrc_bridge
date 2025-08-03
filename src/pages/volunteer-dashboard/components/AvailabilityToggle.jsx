import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AvailabilityToggle = ({ currentStatus = 'available', onStatusChange = () => {} }) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedHours, setSelectedHours] = useState('');

  const statusOptions = [
    { value: 'available', label: 'Available', color: 'bg-success', icon: 'CheckCircle' },
    { value: 'busy', label: 'Busy', color: 'bg-warning', icon: 'Clock' },
    { value: 'offline', label: 'Offline', color: 'bg-muted', icon: 'XCircle' }
  ];

  const timeOptions = [
    { value: '1', label: '1 hour' },
    { value: '2', label: '2 hours' },
    { value: '4', label: '4 hours' },
    { value: '8', label: '8 hours' },
    { value: '24', label: '24 hours' },
    { value: 'custom', label: 'Custom time' }
  ];

  const currentStatusData = statusOptions?.find(option => option?.value === currentStatus);

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'busy') {
      setIsScheduleModalOpen(true);
    } else {
      onStatusChange(newStatus);
    }
  };

  const handleScheduleSubmit = () => {
    onStatusChange('busy', selectedHours);
    setIsScheduleModalOpen(false);
    setSelectedHours('');
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">Availability Status</h3>
          <div className={`w-3 h-3 rounded-full ${currentStatusData?.color}`}></div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className={`w-12 h-12 rounded-full ${currentStatusData?.color} flex items-center justify-center`}>
            <Icon name={currentStatusData?.icon} size={24} color="white" />
          </div>
          <div>
            <p className="font-body font-medium text-foreground capitalize">{currentStatusData?.label}</p>
            <p className="font-caption text-sm text-muted-foreground">
              {currentStatus === 'available' && 'Ready to accept new assignments'}
              {currentStatus === 'busy' && 'Currently handling assignments'}
              {currentStatus === 'offline' && 'Not available for assignments'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {statusOptions?.map((status) => (
            <Button
              key={status.value}
              variant={currentStatus === status.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStatusChange(status.value)}
              className="flex flex-col items-center py-3 h-auto"
            >
              <Icon name={status.icon} size={16} className="mb-1" />
              <span className="text-xs capitalize">{status.label}</span>
            </Button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => setIsScheduleModalOpen(true)}
            fullWidth
          >
            Schedule Availability
          </Button>
        </div>
      </div>
      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-lg text-foreground">Schedule Availability</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsScheduleModalOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <Select
                label="Set status duration"
                placeholder="Select duration"
                options={timeOptions}
                value={selectedHours}
                onChange={setSelectedHours}
              />
              
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-foreground">
                      Setting to 'Busy' will temporarily pause new assignment notifications.
                    </p>
                    <p className="font-caption text-xs text-muted-foreground mt-1">
                      You can change your status anytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsScheduleModalOpen(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleScheduleSubmit}
                disabled={!selectedHours}
                fullWidth
              >
                Update Status
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvailabilityToggle;
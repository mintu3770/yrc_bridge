import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContact = () => {
  const emergencyContacts = [
    {
      id: 1,
      name: 'YRC Emergency Hotline',
      phone: '+1-800-YRC-HELP',
      description: '24/7 emergency assistance for critical situations',
      icon: 'Phone',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 2,
      name: 'Medical Emergency',
      phone: '911',
      description: 'For immediate medical emergencies',
      icon: 'Heart',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 3,
      name: 'YRC Support Center',
      phone: '+1-555-YRC-CARE',
      description: 'General support and non-emergency assistance',
      icon: 'HelpCircle',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
          <Icon name="AlertTriangle" size={20} className="text-red-600" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">Emergency Contacts</h3>
          <p className="text-sm text-muted-foreground">Available 24/7 for urgent assistance</p>
        </div>
      </div>
      <div className="space-y-4">
        {emergencyContacts?.map((contact) => (
          <div key={contact?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg ${contact?.bgColor} flex items-center justify-center`}>
                <Icon name={contact?.icon} size={20} className={contact?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground">{contact?.name}</h4>
                <p className="text-sm text-muted-foreground">{contact?.description}</p>
                <p className="font-mono text-sm text-foreground font-medium">{contact?.phone}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              onClick={() => handleCall(contact?.phone)}
              className="shrink-0"
            >
              Call
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-800 font-medium">Important Note</p>
            <p className="text-sm text-yellow-700 mt-1">
              For life-threatening emergencies, always call 911 first. YRC services are designed to complement, not replace, emergency medical services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
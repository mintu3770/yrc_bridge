import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourcesSidebar = () => {
  const resources = [
    {
      id: 1,
      title: 'How to Request Help',
      description: 'Step-by-step guide for submitting assistance requests',
      icon: 'BookOpen',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'Frequently Asked Questions',
      description: 'Common questions about our services and processes',
      icon: 'HelpCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      title: 'Community Guidelines',
      description: 'Guidelines for respectful interaction with volunteers',
      icon: 'Users',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      title: 'Privacy & Safety',
      description: 'How we protect your personal information',
      icon: 'Shield',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const quickLinks = [
    { label: 'Find Volunteers', icon: 'Users', path: '/volunteer-directory' },
    { label: 'Contact Support', icon: 'MessageCircle', path: '#' },
    { label: 'Feedback', icon: 'Star', path: '#' },
    { label: 'Report Issue', icon: 'Flag', path: '#' }
  ];

  return (
    <div className="space-y-6">
      {/* Resources Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Helpful Resources</h3>
        <div className="space-y-4">
          {resources?.map((resource) => (
            <div key={resource?.id} className="flex items-start space-x-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200 cursor-pointer">
              <div className={`w-8 h-8 rounded-lg ${resource?.bgColor} flex items-center justify-center shrink-0`}>
                <Icon name={resource?.icon} size={16} className={resource?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground">{resource?.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{resource?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Links Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Quick Links</h3>
        <div className="space-y-2">
          {quickLinks?.map((link, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              iconName={link?.icon}
              iconPosition="left"
              fullWidth
              className="justify-start"
            >
              {link?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Tips Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} className="text-yellow-600" />
          <h3 className="font-heading font-semibold text-lg text-foreground">Tips for Success</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">Be specific about your needs and location for faster assistance</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">Keep your contact information updated for smooth communication</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">Respond promptly to volunteer messages to maintain good relationships</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">Express gratitude to volunteers who help you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSidebar;
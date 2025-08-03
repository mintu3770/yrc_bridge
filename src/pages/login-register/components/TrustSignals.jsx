import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      id: 2,
      icon: 'Award',
      title: 'YRC Certified',
      description: 'Official Youth Red Cross platform'
    },
    {
      id: 3,
      icon: 'Users',
      title: '10,000+ Users',
      description: 'Trusted by volunteers worldwide'
    }
  ];

  const stats = [
    { label: 'Active Volunteers', value: '2,500+', icon: 'Heart' },
    { label: 'Lives Helped', value: '15,000+', icon: 'Users' },
    { label: 'Donations Facilitated', value: '$500K+', icon: 'DollarSign' }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          Trusted & Secure Platform
        </h3>
        <div className="space-y-4">
          {trustBadges?.map((badge) => (
            <div key={badge?.id} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={badge?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-body font-medium text-sm text-foreground">{badge?.title}</p>
                <p className="font-caption text-xs text-muted-foreground">{badge?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Stats */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          Making a Difference Together
        </h3>
        <div className="space-y-4">
          {stats?.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={stat?.icon} size={16} className="text-primary" />
                <span className="font-body text-sm text-muted-foreground">{stat?.label}</span>
              </div>
              <span className="font-heading font-bold text-lg text-primary">{stat?.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonial */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-body font-medium text-sm">SM</span>
          </div>
          <div className="flex-1">
            <p className="font-body text-sm text-foreground mb-2">
              "YRC Bridge made it so easy to connect with volunteers in my area. The platform is intuitive and the support is amazing."
            </p>
            <div>
              <p className="font-body font-medium text-sm text-foreground">Sarah Martinez</p>
              <p className="font-caption text-xs text-muted-foreground">Blood Donation Recipient</p>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Support */}
      <div className="text-center">
        <p className="font-body text-sm text-muted-foreground mb-2">
          Need help getting started?
        </p>
        <button className="text-primary hover:text-primary/80 font-body font-medium text-sm transition-colors duration-200">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default TrustSignals;
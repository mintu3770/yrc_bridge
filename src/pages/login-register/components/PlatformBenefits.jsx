import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlatformBenefits = () => {
  const benefits = [
    {
      id: 1,
      icon: 'Heart',
      title: 'Make a Real Impact',
      description: 'Connect directly with people who need help and see the difference you make in real-time.',
      color: 'text-red-500'
    },
    {
      id: 2,
      icon: 'Users',
      title: 'Join a Community',
      description: 'Be part of a network of compassionate individuals working together for humanitarian causes.',
      color: 'text-blue-500'
    },
    {
      id: 3,
      icon: 'Shield',
      title: 'Safe & Secure',
      description: 'All interactions are verified and monitored by YRC administrators for your safety.',
      color: 'text-green-500'
    },
    {
      id: 4,
      icon: 'Clock',
      title: 'Flexible Participation',
      description: 'Contribute on your own schedule with volunteer opportunities that fit your availability.',
      color: 'text-purple-500'
    }
  ];

  const roleHighlights = [
    {
      role: 'Donors',
      icon: 'Gift',
      description: 'Share resources and make meaningful contributions to those in need',
      features: ['Track donation impact', 'Connect with recipients', 'Tax-deductible receipts']
    },
    {
      role: 'Patients',
      icon: 'HelpCircle',
      description: 'Get the assistance you need through our verified volunteer network',
      features: ['Quick request process', 'Verified volunteers', '24/7 support available']
    },
    {
      role: 'Volunteers',
      icon: 'HandHeart',
      description: 'Coordinate help and be the bridge between donors and those in need',
      features: ['Flexible scheduling', 'Skill-based matching', 'Recognition programs']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Image */}
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=300&fit=crop"
          alt="Volunteers helping in community"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h2 className="text-xl font-heading font-bold mb-2">
              Connecting Hearts, Changing Lives
            </h2>
            <p className="font-body text-sm opacity-90">
              Join thousands of volunteers making a difference every day
            </p>
          </div>
        </div>
      </div>
      {/* Platform Benefits */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Why Choose YRC Bridge?
        </h3>
        <div className="space-y-4">
          {benefits?.map((benefit) => (
            <div key={benefit?.id} className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mt-1">
                <Icon name={benefit?.icon} size={20} className={benefit?.color} />
              </div>
              <div className="flex-1">
                <h4 className="font-body font-semibold text-sm text-foreground mb-1">
                  {benefit?.title}
                </h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Role Highlights */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Find Your Way to Help
        </h3>
        <div className="space-y-4">
          {roleHighlights?.map((roleInfo, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={roleInfo?.icon} size={16} className="text-primary" />
                </div>
                <h4 className="font-body font-semibold text-sm text-foreground">
                  {roleInfo?.role}
                </h4>
              </div>
              <p className="font-body text-sm text-muted-foreground mb-3">
                {roleInfo?.description}
              </p>
              <ul className="space-y-1">
                {roleInfo?.features?.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-success" />
                    <span className="font-caption text-xs text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Success Stories */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Recent Success Stories
        </h3>
        <div className="space-y-3">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Heart" size={16} className="text-success" />
              <span className="font-body font-medium text-sm text-success">Blood Donation Success</span>
            </div>
            <p className="font-body text-sm text-foreground">
              Emergency blood donation coordinated in under 2 hours, helping save a life in Chicago.
            </p>
          </div>
          
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="DollarSign" size={16} className="text-primary" />
              <span className="font-body font-medium text-sm text-primary">Financial Aid Provided</span>
            </div>
            <p className="font-body text-sm text-foreground">
              $2,500 raised for family affected by natural disaster through community donations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformBenefits;
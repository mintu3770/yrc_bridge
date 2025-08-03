import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VolunteerCard = ({ volunteer, onViewProfile, onSendMessage, onRequestAssignment, currentUser }) => {
  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success text-success-foreground';
      case 'busy':
        return 'bg-warning text-warning-foreground';
      case 'unavailable':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getExperienceLevel = (years) => {
    if (years < 1) return 'Beginner';
    if (years < 3) return 'Intermediate';
    if (years < 5) return 'Experienced';
    return 'Expert';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted'}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-shadow duration-200">
      {/* Header with Avatar and Basic Info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <Image
            src={volunteer?.avatar}
            alt={volunteer?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${getAvailabilityColor(volunteer?.availability)}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-lg text-foreground truncate">
            {volunteer?.name}
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-1">
            {volunteer?.location}
          </p>
          <div className="flex items-center space-x-1 mb-2">
            {renderStars(volunteer?.rating)}
            <span className="font-caption text-xs text-muted-foreground ml-1">
              ({volunteer?.reviewCount})
            </span>
          </div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getAvailabilityColor(volunteer?.availability)}`}>
            {volunteer?.availability?.charAt(0)?.toUpperCase() + volunteer?.availability?.slice(1)}
          </span>
        </div>
      </div>
      {/* Specializations */}
      <div className="mb-4">
        <h4 className="font-body font-medium text-sm text-foreground mb-2">Specializations</h4>
        <div className="flex flex-wrap gap-1">
          {volunteer?.specializations?.slice(0, 3)?.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-caption"
            >
              {skill}
            </span>
          ))}
          {volunteer?.specializations?.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-caption">
              +{volunteer?.specializations?.length - 3} more
            </span>
          )}
        </div>
      </div>
      {/* Experience and Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/50 rounded-md">
        <div className="text-center">
          <p className="font-body font-semibold text-sm text-foreground">
            {volunteer?.experienceYears}+ years
          </p>
          <p className="font-caption text-xs text-muted-foreground">Experience</p>
        </div>
        <div className="text-center">
          <p className="font-body font-semibold text-sm text-foreground">
            {volunteer?.completedTasks}
          </p>
          <p className="font-caption text-xs text-muted-foreground">Tasks Done</p>
        </div>
      </div>
      {/* Distance and Last Active */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={12} />
          <span className="font-caption">{volunteer?.distance} away</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={12} />
          <span className="font-caption">Active {volunteer?.lastActive}</span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col space-y-2">
        <Button
          variant="default"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewProfile(volunteer)}
          fullWidth
        >
          View Profile
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => onSendMessage(volunteer)}
          >
            Message
          </Button>
          
          {(currentUser?.role === 'donor' || currentUser?.role === 'patient' || currentUser?.role === 'admin') && (
            <Button
              variant="secondary"
              size="sm"
              iconName="UserPlus"
              iconPosition="left"
              onClick={() => onRequestAssignment(volunteer)}
              disabled={volunteer?.availability === 'unavailable'}
            >
              Request
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerCard;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VolunteerProfileModal = ({ volunteer, isOpen, onClose, onSendMessage, onRequestAssignment, currentUser }) => {
  if (!isOpen || !volunteer) return null;

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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted'}
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-xl text-foreground">Volunteer Profile</h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="flex items-start space-x-6 mb-6">
            <div className="relative">
              <Image
                src={volunteer?.avatar}
                alt={volunteer?.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-card ${getAvailabilityColor(volunteer?.availability)}`} />
            </div>
            
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-2">
                {volunteer?.name}
              </h3>
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="font-body text-sm text-muted-foreground">{volunteer?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(volunteer?.rating)}
                  <span className="font-caption text-sm text-muted-foreground ml-1">
                    {volunteer?.rating} ({volunteer?.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-caption font-medium ${getAvailabilityColor(volunteer?.availability)}`}>
                {volunteer?.availability?.charAt(0)?.toUpperCase() + volunteer?.availability?.slice(1)}
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="font-heading font-semibold text-lg text-foreground">{volunteer?.experienceYears}+</p>
              <p className="font-caption text-xs text-muted-foreground">Years Experience</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="font-heading font-semibold text-lg text-foreground">{volunteer?.completedTasks}</p>
              <p className="font-caption text-xs text-muted-foreground">Tasks Completed</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="font-heading font-semibold text-lg text-foreground">{volunteer?.responseTime}</p>
              <p className="font-caption text-xs text-muted-foreground">Avg Response</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="font-heading font-semibold text-lg text-foreground">{volunteer?.distance}</p>
              <p className="font-caption text-xs text-muted-foreground">Distance</p>
            </div>
          </div>

          {/* About */}
          <div className="mb-6">
            <h4 className="font-heading font-semibold text-lg text-foreground mb-3">About</h4>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {volunteer?.bio}
            </p>
          </div>

          {/* Specializations */}
          <div className="mb-6">
            <h4 className="font-heading font-semibold text-lg text-foreground mb-3">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {volunteer?.specializations?.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-caption"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {volunteer?.certifications && volunteer?.certifications?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-lg text-foreground mb-3">Certifications</h4>
              <div className="space-y-2">
                {volunteer?.certifications?.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Icon name="Award" size={16} className="text-primary" />
                    <div>
                      <p className="font-body font-medium text-sm text-foreground">{cert?.name}</p>
                      <p className="font-caption text-xs text-muted-foreground">
                        Issued by {cert?.issuer} • Expires {cert?.expiry}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Reviews */}
          {volunteer?.recentReviews && volunteer?.recentReviews?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-lg text-foreground mb-3">Recent Reviews</h4>
              <div className="space-y-4">
                {volunteer?.recentReviews?.slice(0, 3)?.map((review, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(review?.rating)}
                      <span className="font-caption text-xs text-muted-foreground">
                        by {review?.reviewer} • {review?.date}
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground">{review?.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Availability Schedule */}
          <div className="mb-6">
            <h4 className="font-heading font-semibold text-lg text-foreground mb-3">Availability Schedule</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {volunteer?.schedule && Object.entries(volunteer?.schedule)?.map(([day, times]) => (
                <div key={day} className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="font-body font-medium text-sm text-foreground capitalize">{day}</p>
                  <p className="font-caption text-xs text-muted-foreground">{times}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h4 className="font-heading font-semibold text-lg text-foreground mb-3">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="font-body text-sm text-foreground">{volunteer?.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="font-body text-sm text-foreground">{volunteer?.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="font-body text-sm text-muted-foreground">
                  Last active {volunteer?.lastActive}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => onSendMessage(volunteer)}
            className="flex-1"
          >
            Send Message
          </Button>
          
          {(currentUser?.role === 'donor' || currentUser?.role === 'patient' || currentUser?.role === 'admin') && (
            <Button
              variant="default"
              iconName="UserPlus"
              iconPosition="left"
              onClick={() => onRequestAssignment(volunteer)}
              disabled={volunteer?.availability === 'unavailable'}
              className="flex-1"
            >
              Request Assignment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfileModal;
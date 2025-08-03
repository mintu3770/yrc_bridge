import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ volunteers, onVolunteerSelect, isVisible }) => {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // Mock coordinates for demonstration
  const centerLat = 40.7128;
  const centerLng = -74.0060;

  const handleMarkerClick = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  const handleViewProfile = () => {
    if (selectedVolunteer) {
      onVolunteerSelect(selectedVolunteer);
      setSelectedVolunteer(null);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Volunteer Locations"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=12&output=embed`}
        className="border-0"
      />
      {/* Map Overlay with Volunteer Markers */}
      <div className="absolute inset-0 pointer-events-none">
        {volunteers?.slice(0, 10)?.map((volunteer, index) => {
          // Mock positioning for demonstration
          const left = 20 + (index % 5) * 15;
          const top = 20 + Math.floor(index / 5) * 25;
          
          return (
            <div
              key={volunteer?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
              onClick={() => handleMarkerClick(volunteer)}
            >
              <div className="relative">
                <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                  volunteer?.availability === 'available' ? 'bg-success' :
                  volunteer?.availability === 'busy' ? 'bg-warning' : 'bg-error'
                }`}>
                  <Icon name="User" size={16} className="text-white" />
                </div>
                {selectedVolunteer?.id === volunteer?.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-card border border-border rounded-lg shadow-modal p-4 z-10">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={volunteer?.avatar}
                        alt={volunteer?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-body font-semibold text-sm text-foreground truncate">
                          {volunteer?.name}
                        </h4>
                        <p className="font-caption text-xs text-muted-foreground">
                          {volunteer?.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 mb-3">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <Icon
                          key={starIndex}
                          name="Star"
                          size={12}
                          className={starIndex < Math.floor(volunteer?.rating) ? 'text-warning fill-current' : 'text-muted'}
                        />
                      ))}
                      <span className="font-caption text-xs text-muted-foreground ml-1">
                        {volunteer?.rating}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {volunteer?.specializations?.slice(0, 2)?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded text-xs font-caption"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleViewProfile}
                        className="flex-1"
                      >
                        View Profile
                      </Button>
                      <button
                        onClick={() => setSelectedVolunteer(null)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="p-2 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <Icon name="Plus" size={16} className="text-foreground" />
        </button>
        <button className="p-2 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <Icon name="Minus" size={16} className="text-foreground" />
        </button>
        <button className="p-2 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <Icon name="Locate" size={16} className="text-foreground" />
        </button>
      </div>
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg shadow-sm p-3">
        <h5 className="font-body font-semibold text-xs text-foreground mb-2">Availability</h5>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="font-caption text-xs text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="font-caption text-xs text-muted-foreground">Busy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="font-caption text-xs text-muted-foreground">Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
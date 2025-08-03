import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const getActiveFilters = () => {
    const activeFilters = [];

    if (filters?.location !== 'any') {
      const locationLabels = {
        '5': 'Within 5 miles',
        '10': 'Within 10 miles',
        '25': 'Within 25 miles',
        '50': 'Within 50 miles'
      };
      activeFilters?.push({
        type: 'location',
        value: filters?.location,
        label: locationLabels?.[filters?.location] || `Within ${filters?.location} miles`,
        key: 'location'
      });
    }

    filters?.availability?.forEach(availability => {
      const availabilityLabels = {
        'available': 'Available Now',
        'busy': 'Busy',
        'unavailable': 'Unavailable'
      };
      activeFilters?.push({
        type: 'availability',
        value: availability,
        label: availabilityLabels?.[availability],
        key: `availability-${availability}`
      });
    });

    filters?.experience?.forEach(exp => {
      const experienceLabels = {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate',
        'experienced': 'Experienced',
        'expert': 'Expert'
      };
      activeFilters?.push({
        type: 'experience',
        value: exp,
        label: experienceLabels?.[exp],
        key: `experience-${exp}`
      });
    });

    filters?.specializations?.forEach(spec => {
      activeFilters?.push({
        type: 'specializations',
        value: spec,
        label: spec,
        key: `specialization-${spec}`
      });
    });

    if (filters?.minRating > 0) {
      activeFilters?.push({
        type: 'minRating',
        value: filters?.minRating,
        label: `${filters?.minRating}+ Stars`,
        key: 'minRating'
      });
    }

    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters?.length === 0) {
    return null;
  }

  const handleRemoveFilter = (filter) => {
    onRemoveFilter(filter?.type, filter?.value);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-muted/50 rounded-lg">
      <span className="font-body font-medium text-sm text-foreground">
        Active Filters:
      </span>
      {activeFilters?.map((filter) => (
        <div
          key={filter?.key}
          className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-caption"
        >
          <span>{filter?.label}</span>
          <button
            onClick={() => handleRemoveFilter(filter)}
            className="text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <Icon name="X" size={14} />
          </button>
        </div>
      ))}
      {activeFilters?.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          iconPosition="left"
          onClick={onClearAll}
          className="ml-2"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;
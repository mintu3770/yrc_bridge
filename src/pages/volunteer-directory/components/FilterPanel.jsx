import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  isOpen, 
  onToggle 
}) => {
  const locationOptions = [
    { value: '5', label: 'Within 5 miles' },
    { value: '10', label: 'Within 10 miles' },
    { value: '25', label: 'Within 25 miles' },
    { value: '50', label: 'Within 50 miles' },
    { value: 'any', label: 'Any distance' }
  ];

  const availabilityOptions = [
    { value: 'available', label: 'Available Now' },
    { value: 'busy', label: 'Busy' },
    { value: 'unavailable', label: 'Unavailable' }
  ];

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (0-1 years)' },
    { value: 'intermediate', label: 'Intermediate (1-3 years)' },
    { value: 'experienced', label: 'Experienced (3-5 years)' },
    { value: 'expert', label: 'Expert (5+ years)' }
  ];

  const specializationOptions = [
    'Blood Donation',
    'Emergency Response',
    'Medical Assistance',
    'Transportation',
    'Food Distribution',
    'Disaster Relief',
    'Community Outreach',
    'Administrative Support',
    'Translation Services',
    'Elderly Care',
    'Child Care',
    'Mental Health Support'
  ];

  const handleSpecializationChange = (specialization, checked) => {
    const updatedSpecializations = checked
      ? [...filters?.specializations, specialization]
      : filters?.specializations?.filter(s => s !== specialization);
    
    onFiltersChange({
      ...filters,
      specializations: updatedSpecializations
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.location !== 'any') count++;
    if (filters?.availability?.length > 0) count++;
    if (filters?.experience?.length > 0) count++;
    if (filters?.specializations?.length > 0) count++;
    if (filters?.minRating > 0) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          iconName="Filter"
          iconPosition="left"
          onClick={onToggle}
          className="w-full"
        >
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-card border border-border rounded-lg p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold text-lg text-foreground">Filters</h3>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={onClearFilters}
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {/* Location Filter */}
          <div>
            <Select
              label="Distance"
              options={locationOptions}
              value={filters?.location}
              onChange={(value) => onFiltersChange({ ...filters, location: value })}
            />
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-3">
              Availability Status
            </label>
            <div className="space-y-2">
              {availabilityOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.availability?.includes(option?.value)}
                  onChange={(e) => {
                    const updatedAvailability = e?.target?.checked
                      ? [...filters?.availability, option?.value]
                      : filters?.availability?.filter(a => a !== option?.value);
                    onFiltersChange({ ...filters, availability: updatedAvailability });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Experience Level Filter */}
          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-3">
              Experience Level
            </label>
            <div className="space-y-2">
              {experienceOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.experience?.includes(option?.value)}
                  onChange={(e) => {
                    const updatedExperience = e?.target?.checked
                      ? [...filters?.experience, option?.value]
                      : filters?.experience?.filter(exp => exp !== option?.value);
                    onFiltersChange({ ...filters, experience: updatedExperience });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Specializations Filter */}
          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-3">
              Specializations
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {specializationOptions?.map((specialization) => (
                <Checkbox
                  key={specialization}
                  label={specialization}
                  checked={filters?.specializations?.includes(specialization)}
                  onChange={(e) => handleSpecializationChange(specialization, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block font-body font-medium text-sm text-foreground mb-3">
              Minimum Rating
            </label>
            <div className="space-y-2">
              {[4, 3, 2, 1]?.map((rating) => (
                <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={filters?.minRating === rating}
                    onChange={() => onFiltersChange({ ...filters, minRating: rating })}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Icon
                        key={index}
                        name="Star"
                        size={14}
                        className={index < rating ? 'text-warning fill-current' : 'text-muted'}
                      />
                    ))}
                    <span className="font-body text-sm text-foreground ml-1">& up</span>
                  </div>
                </label>
              ))}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={0}
                  checked={filters?.minRating === 0}
                  onChange={() => onFiltersChange({ ...filters, minRating: 0 })}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="font-body text-sm text-foreground">Any rating</span>
              </label>
            </div>
          </div>
        </div>

        {/* Mobile Apply Button */}
        <div className="lg:hidden mt-6 pt-6 border-t border-border">
          <Button
            variant="default"
            onClick={onToggle}
            fullWidth
          >
            Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterBar = ({ onFilterChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const urgencyOptions = [
    { value: 'all', label: 'All Urgency Levels' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'local', label: 'Local (within 10 miles)' },
    { value: 'regional', label: 'Regional (within 50 miles)' },
    { value: 'national', label: 'National' }
  ];

  const resourceOptions = [
    { value: 'all', label: 'All Resources' },
    { value: 'blood', label: 'Blood Donation' },
    { value: 'financial', label: 'Financial Aid' },
    { value: 'supplies', label: 'Medical Supplies' },
    { value: 'food', label: 'Food & Water' },
    { value: 'other', label: 'Other Assistance' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({ ...activeFilters, [filterType]: value });
  };

  const clearAllFilters = () => {
    onFilterChange({
      urgency: 'all',
      location: 'all',
      resource: 'all'
    });
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(value => value !== 'all');

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-heading font-semibold text-foreground">Filter Opportunities</h3>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Urgency"
          options={urgencyOptions}
          value={activeFilters?.urgency}
          onChange={(value) => handleFilterChange('urgency', value)}
          className="mb-0"
        />
        <Select
          label="Location"
          options={locationOptions}
          value={activeFilters?.location}
          onChange={(value) => handleFilterChange('location', value)}
          className="mb-0"
        />
        <Select
          label="Resource Type"
          options={resourceOptions}
          value={activeFilters?.resource}
          onChange={(value) => handleFilterChange('resource', value)}
          className="mb-0"
        />
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Distance Range
              </label>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5 miles</span>
                <span>100+ miles</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">
                Sort By
              </label>
              <Select
                options={[
                  { value: 'urgency', label: 'Urgency Level' },
                  { value: 'distance', label: 'Distance' },
                  { value: 'deadline', label: 'Deadline' },
                  { value: 'beneficiaries', label: 'Number of Beneficiaries' }
                ]}
                value="urgency"
                onChange={() => {}}
                className="mb-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
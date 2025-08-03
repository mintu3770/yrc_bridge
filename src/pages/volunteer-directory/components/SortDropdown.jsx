import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'proximity', label: 'Nearest First', icon: 'MapPin' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'experience', label: 'Most Experienced', icon: 'Award' },
    { value: 'availability', label: 'Available First', icon: 'Clock' },
    { value: 'name', label: 'Name (A-Z)', icon: 'User' },
    { value: 'recent', label: 'Recently Active', icon: 'Activity' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const currentSort = sortOptions?.find(option => option?.value === sortBy);
    return currentSort ? currentSort?.label : 'Sort By';
  };

  const getCurrentSortIcon = () => {
    const currentSort = sortOptions?.find(option => option?.value === sortBy);
    return currentSort ? currentSort?.icon : 'ArrowUpDown';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        iconName={getCurrentSortIcon()}
        iconPosition="left"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[140px] justify-between"
      >
        <span className="truncate">{getCurrentSortLabel()}</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal z-50">
          <div className="py-1">
            {sortOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleSortSelect(option?.value)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left font-body text-sm transition-colors duration-200 ${
                  sortBy === option?.value
                    ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={option?.icon} size={16} />
                <span>{option?.label}</span>
                {sortBy === option?.value && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
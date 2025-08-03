import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchQuery, onSearchChange, volunteers, onVolunteerSelect }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const filteredSuggestions = volunteers?.filter(volunteer => 
          volunteer?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          volunteer?.specializations?.some(spec => 
            spec?.toLowerCase()?.includes(searchQuery?.toLowerCase())
          ) ||
          volunteer?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )?.slice(0, 5);
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions?.length > 0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [searchQuery, volunteers]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (volunteer) => {
    onVolunteerSelect(volunteer);
    setShowSuggestions(false);
    onSearchChange('');
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <span key={index} className="bg-primary/20 text-primary font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search volunteers by name, skills, or location..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="pl-10"
        />
        <Icon
          name="Search"
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        {searchQuery && (
          <button
            onClick={() => {
              onSearchChange('');
              setShowSuggestions(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-modal z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-caption text-muted-foreground px-3 py-2 border-b border-border">
              Search Results ({suggestions?.length})
            </div>
            {suggestions?.map((volunteer) => (
              <button
                key={volunteer?.id}
                onClick={() => handleSuggestionClick(volunteer)}
                className="w-full flex items-center space-x-3 px-3 py-3 hover:bg-muted rounded-md transition-colors duration-200 text-left"
              >
                <img
                  src={volunteer?.avatar}
                  alt={volunteer?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm text-foreground truncate">
                    {highlightMatch(volunteer?.name, searchQuery)}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground truncate">
                    {highlightMatch(volunteer?.location, searchQuery)}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    {volunteer?.specializations?.slice(0, 2)?.map((spec, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-1.5 py-0.5 bg-primary/10 text-primary rounded text-xs font-caption"
                      >
                        {highlightMatch(spec, searchQuery)}
                      </span>
                    ))}
                    {volunteer?.specializations?.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{volunteer?.specializations?.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="font-caption text-xs text-muted-foreground">
                    {volunteer?.rating}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { AuthenticatedHeader } from '../../components/ui/AuthenticatedHeader';
import VolunteerCard from './components/VolunteerCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import VolunteerProfileModal from './components/VolunteerProfileModal';
import MapView from './components/MapView';
import ActiveFilters from './components/ActiveFilters';

const VolunteerDirectory = () => {
  const navigate = useNavigate();
  const [currentUser] = useState({
    role: 'donor',
    name: 'John Smith',
    avatar: null
  });

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('proximity');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: 'any',
    availability: [],
    experience: [],
    specializations: [],
    minRating: 0
  });

  // Mock volunteers data
  const mockVolunteers = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      location: "Downtown, NY",
      specializations: ["Blood Donation", "Emergency Response", "Medical Assistance"],
      availability: "available",
      rating: 4.8,
      reviewCount: 127,
      experienceYears: 5,
      completedTasks: 89,
      distance: "0.8 miles",
      lastActive: "2 hours ago",
      responseTime: "< 1 hour",
      bio: `Dedicated volunteer with over 5 years of experience in emergency response and medical assistance. I'm passionate about helping others and have been actively involved in blood donation drives and community health programs. Available most weekends and evenings.`,
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      certifications: [
        { name: "CPR Certification", issuer: "American Red Cross", expiry: "Dec 2025" },
        { name: "First Aid Training", issuer: "Red Cross", expiry: "Jan 2026" }
      ],
      schedule: {
        monday: "6PM - 10PM",
        tuesday: "Not Available",
        wednesday: "6PM - 10PM",
        thursday: "Not Available",
        friday: "6PM - 10PM",
        saturday: "9AM - 6PM",
        sunday: "9AM - 6PM"
      },
      recentReviews: [
        { rating: 5, reviewer: "Michael Chen", date: "2 weeks ago", comment: "Sarah was incredibly helpful during our blood drive event. Very professional and caring." },
        { rating: 5, reviewer: "Lisa Rodriguez", date: "1 month ago", comment: "Excellent volunteer! Very responsive and went above and beyond to help." }
      ]
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "Midtown, NY",
      specializations: ["Transportation", "Food Distribution", "Elderly Care"],
      availability: "available",
      rating: 4.6,
      reviewCount: 93,
      experienceYears: 3,
      completedTasks: 67,
      distance: "1.2 miles",
      lastActive: "1 hour ago",
      responseTime: "< 2 hours",
      bio: `Community-focused volunteer specializing in transportation services and food distribution. I have my own vehicle and am available to help with deliveries and transportation needs. Particularly experienced in working with elderly community members.`,
      email: "michael.rodriguez@email.com",
      phone: "+1 (555) 234-5678",
      certifications: [
        { name: "Safe Driving Certificate", issuer: "DMV", expiry: "Mar 2026" }
      ],
      schedule: {
        monday: "5PM - 9PM",
        tuesday: "5PM - 9PM",
        wednesday: "Not Available",
        thursday: "5PM - 9PM",
        friday: "Not Available",
        saturday: "8AM - 8PM",
        sunday: "8AM - 4PM"
      },
      recentReviews: [
        { rating: 5, reviewer: "Anna Thompson", date: "1 week ago", comment: "Michael helped deliver groceries to my elderly neighbor. Very kind and reliable." },
        { rating: 4, reviewer: "David Kim", date: "3 weeks ago", comment: "Great volunteer, always on time and very helpful." }
      ]
    },
    {
      id: 3,
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      location: "Brooklyn, NY",
      specializations: ["Translation Services", "Administrative Support", "Community Outreach"],
      availability: "busy",
      rating: 4.9,
      reviewCount: 156,
      experienceYears: 7,
      completedTasks: 134,
      distance: "2.1 miles",
      lastActive: "30 minutes ago",
      responseTime: "< 30 minutes",
      bio: `Multilingual volunteer fluent in English, Mandarin, and Spanish. I specialize in translation services and administrative support for various community programs. Have extensive experience in community outreach and program coordination.`,
      email: "emily.chen@email.com",
      phone: "+1 (555) 345-6789",
      certifications: [
        { name: "Certified Translator", issuer: "ATA", expiry: "Jun 2025" },
        { name: "Community Outreach Certificate", issuer: "NYC Community Board", expiry: "Sep 2025" }
      ],
      schedule: {
        monday: "7PM - 10PM",
        tuesday: "7PM - 10PM",
        wednesday: "7PM - 10PM",
        thursday: "Not Available",
        friday: "7PM - 10PM",
        saturday: "10AM - 6PM",
        sunday: "Not Available"
      },
      recentReviews: [
        { rating: 5, reviewer: "Carlos Martinez", date: "5 days ago", comment: "Emily\'s translation services were invaluable for our community meeting. Highly professional." },
        { rating: 5, reviewer: "Jennifer Wu", date: "2 weeks ago", comment: "Excellent administrative support. Very organized and efficient." }
      ]
    },
    {
      id: 4,
      name: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: "Queens, NY",
      specializations: ["Disaster Relief", "Emergency Response", "Mental Health Support"],
      availability: "available",
      rating: 4.7,
      reviewCount: 78,
      experienceYears: 4,
      completedTasks: 56,
      distance: "3.5 miles",
      lastActive: "4 hours ago",
      responseTime: "< 3 hours",
      bio: `Former emergency responder with specialized training in disaster relief and mental health first aid. I'm committed to helping communities during crisis situations and providing emotional support to those in need.`,
      email: "david.thompson@email.com",
      phone: "+1 (555) 456-7890",
      certifications: [
        { name: "Mental Health First Aid", issuer: "NAMI", expiry: "Aug 2025" },
        { name: "Disaster Response Training", issuer: "FEMA", expiry: "Nov 2025" }
      ],
      schedule: {
        monday: "6PM - 11PM",
        tuesday: "6PM - 11PM",
        wednesday: "Not Available",
        thursday: "6PM - 11PM",
        friday: "6PM - 11PM",
        saturday: "All Day",
        sunday: "9AM - 5PM"
      },
      recentReviews: [
        { rating: 5, reviewer: "Maria Gonzalez", date: "1 week ago", comment: "David provided excellent support during our community crisis response. Very professional." },
        { rating: 4, reviewer: "Robert Lee", date: "2 weeks ago", comment: "Great volunteer with strong emergency response skills." }
      ]
    },
    {
      id: 5,
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      location: "Manhattan, NY",
      specializations: ["Child Care", "Educational Support", "Community Outreach"],
      availability: "available",
      rating: 4.8,
      reviewCount: 112,
      experienceYears: 6,
      completedTasks: 98,
      distance: "1.8 miles",
      lastActive: "1 hour ago",
      responseTime: "< 1 hour",
      bio: `Experienced childcare volunteer with a background in education. I love working with children and families, providing educational support and organizing community activities. Available for both one-time events and ongoing programs.`,
      email: "lisa.wang@email.com",
      phone: "+1 (555) 567-8901",
      certifications: [
        { name: "Child Care Certification", issuer: "NYC Department of Health", expiry: "Apr 2026" },
        { name: "Educational Support Training", issuer: "Board of Education", expiry: "Jul 2025" }
      ],
      schedule: {
        monday: "4PM - 8PM",
        tuesday: "4PM - 8PM",
        wednesday: "4PM - 8PM",
        thursday: "Not Available",
        friday: "4PM - 8PM",
        saturday: "9AM - 5PM",
        sunday: "9AM - 3PM"
      },
      recentReviews: [
        { rating: 5, reviewer: "Patricia Davis", date: "3 days ago", comment: "Lisa was wonderful with the children at our community event. Very patient and caring." },
        { rating: 5, reviewer: "James Wilson", date: "1 week ago", comment: "Excellent educational support volunteer. Kids love working with her." }
      ]
    },
    {
      id: 6,
      name: "Robert Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      location: "Bronx, NY",
      specializations: ["Blood Donation", "Medical Assistance", "Transportation"],
      availability: "unavailable",
      rating: 4.5,
      reviewCount: 67,
      experienceYears: 2,
      completedTasks: 43,
      distance: "4.2 miles",
      lastActive: "1 day ago",
      responseTime: "< 4 hours",
      bio: `Medical student volunteer with experience in blood donation coordination and basic medical assistance. Currently focusing on studies but available for urgent medical volunteer needs on weekends.`,
      email: "robert.kim@email.com",
      phone: "+1 (555) 678-9012",
      certifications: [
        { name: "Basic Life Support", issuer: "American Heart Association", expiry: "Feb 2026" }
      ],
      schedule: {
        monday: "Not Available",
        tuesday: "Not Available",
        wednesday: "Not Available",
        thursday: "Not Available",
        friday: "Not Available",
        saturday: "9AM - 6PM",
        sunday: "9AM - 6PM"
      },
      recentReviews: [
        { rating: 4, reviewer: "Susan Brown", date: "2 weeks ago", comment: "Robert was helpful during our blood drive, though he seemed a bit busy with his studies." },
        { rating: 5, reviewer: "Mark Johnson", date: "1 month ago", comment: "Great medical knowledge and very professional approach." }
      ]
    }
  ];

  const [volunteers, setVolunteers] = useState(mockVolunteers);
  const [filteredVolunteers, setFilteredVolunteers] = useState(mockVolunteers);

  // Filter and sort volunteers
  useEffect(() => {
    let filtered = [...volunteers];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(volunteer =>
        volunteer?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        volunteer?.specializations?.some(spec =>
          spec?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        ) ||
        volunteer?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply location filter
    if (filters?.location !== 'any') {
      const maxDistance = parseInt(filters?.location);
      filtered = filtered?.filter(volunteer => {
        const distance = parseFloat(volunteer?.distance);
        return distance <= maxDistance;
      });
    }

    // Apply availability filter
    if (filters?.availability?.length > 0) {
      filtered = filtered?.filter(volunteer =>
        filters?.availability?.includes(volunteer?.availability)
      );
    }

    // Apply experience filter
    if (filters?.experience?.length > 0) {
      filtered = filtered?.filter(volunteer => {
        const years = volunteer?.experienceYears;
        return filters?.experience?.some(exp => {
          switch (exp) {
            case 'beginner': return years < 1;
            case 'intermediate': return years >= 1 && years < 3;
            case 'experienced': return years >= 3 && years < 5;
            case 'expert': return years >= 5;
            default: return false;
          }
        });
      });
    }

    // Apply specializations filter
    if (filters?.specializations?.length > 0) {
      filtered = filtered?.filter(volunteer =>
        filters?.specializations?.some(spec =>
          volunteer?.specializations?.includes(spec)
        )
      );
    }

    // Apply rating filter
    if (filters?.minRating > 0) {
      filtered = filtered?.filter(volunteer =>
        volunteer?.rating >= filters?.minRating
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'proximity':
          return parseFloat(a?.distance) - parseFloat(b?.distance);
        case 'rating':
          return b?.rating - a?.rating;
        case 'experience':
          return b?.experienceYears - a?.experienceYears;
        case 'availability':
          const availabilityOrder = { 'available': 0, 'busy': 1, 'unavailable': 2 };
          return availabilityOrder?.[a?.availability] - availabilityOrder?.[b?.availability];
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'recent':
          return new Date(b.lastActive) - new Date(a.lastActive);
        default:
          return 0;
      }
    });

    setFilteredVolunteers(filtered);
  }, [volunteers, searchQuery, filters, sortBy]);

  // Event handlers
  const handleLogout = () => {
    navigate('/login-register');
  };

  const handleViewProfile = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsProfileModalOpen(true);
  };

  const handleSendMessage = (volunteer) => {
    // Mock message functionality
    alert(`Message sent to ${volunteer?.name}! They will respond within ${volunteer?.responseTime}.`);
  };

  const handleRequestAssignment = (volunteer) => {
    // Mock assignment request functionality
    alert(`Assignment request sent to ${volunteer?.name}! You will receive a response soon.`);
  };

  const handleVolunteerSelect = (volunteer) => {
    handleViewProfile(volunteer);
  };

  const handleRemoveFilter = (filterType, filterValue) => {
    const newFilters = { ...filters };
    
    switch (filterType) {
      case 'location':
        newFilters.location = 'any';
        break;
      case 'availability':
        newFilters.availability = newFilters?.availability?.filter(a => a !== filterValue);
        break;
      case 'experience':
        newFilters.experience = newFilters?.experience?.filter(e => e !== filterValue);
        break;
      case 'specializations':
        newFilters.specializations = newFilters?.specializations?.filter(s => s !== filterValue);
        break;
      case 'minRating':
        newFilters.minRating = 0;
        break;
      default:
        break;
    }
    
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      location: 'any',
      availability: [],
      experience: [],
      specializations: [],
      minRating: 0
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader
        user={currentUser}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm font-body mb-6">
            <button
              onClick={() => navigate('/donor-dashboard')}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Home
            </button>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            <button
              onClick={() => navigate('/volunteer-directory')}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Volunteers
            </button>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            <span className="text-foreground font-medium">Directory</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Volunteer Directory
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Connect with approved volunteers in your area ready to help with your needs.
            </p>
          </div>

          {/* Search and Controls */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  volunteers={volunteers}
                  onVolunteerSelect={handleVolunteerSelect}
                />
              </div>
              <div className="flex items-center space-x-3">
                <SortDropdown
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === 'grid' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="Grid3X3" size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === 'map' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="Map" size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            <ActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearAllFilters}
                isOpen={isFilterPanelOpen}
                onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              />
            </div>

            {/* Content Area */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="font-body text-sm text-muted-foreground">
                  Showing {filteredVolunteers?.length} of {volunteers?.length} volunteers
                </p>
                {viewMode === 'map' && (
                  <Button
                    variant="outline"
                    iconName="Grid3X3"
                    iconPosition="left"
                    onClick={() => setViewMode('grid')}
                  >
                    Back to Grid
                  </Button>
                )}
              </div>

              {/* Map View */}
              {viewMode === 'map' && (
                <MapView
                  volunteers={filteredVolunteers}
                  onVolunteerSelect={handleVolunteerSelect}
                  isVisible={viewMode === 'map'}
                />
              )}

              {/* Grid View */}
              {viewMode === 'grid' && (
                <>
                  {filteredVolunteers?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredVolunteers?.map((volunteer) => (
                        <VolunteerCard
                          key={volunteer?.id}
                          volunteer={volunteer}
                          onViewProfile={handleViewProfile}
                          onSendMessage={handleSendMessage}
                          onRequestAssignment={handleRequestAssignment}
                          currentUser={currentUser}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        No volunteers found
                      </h3>
                      <p className="font-body text-muted-foreground mb-4">
                        Try adjusting your search criteria or filters to find more volunteers.
                      </p>
                      <Button
                        variant="outline"
                        iconName="RotateCcw"
                        iconPosition="left"
                        onClick={handleClearAllFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Volunteer Profile Modal */}
      <VolunteerProfileModal
        volunteer={selectedVolunteer}
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedVolunteer(null);
        }}
        onSendMessage={handleSendMessage}
        onRequestAssignment={handleRequestAssignment}
        currentUser={currentUser}
      />
    </div>
  );
};

export default VolunteerDirectory;
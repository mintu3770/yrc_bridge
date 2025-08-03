import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticatedHeader } from '../../components/ui/AuthenticatedHeader';
import AvailabilityToggle from './components/AvailabilityToggle';
import AssignmentCard from './components/AssignmentCard';
import OpportunityCard from './components/OpportunityCard';
import StatsPanel from './components/StatsPanel';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assignments');
  const [availabilityStatus, setAvailabilityStatus] = useState('available');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Mock user data
  const user = {
    role: 'volunteer',
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    id: 'vol_001',
    joinedDate: '2024-01-15',
    location: 'San Francisco, CA',
    skills: ['First Aid', 'Blood Donation', 'Emergency Response', 'Community Outreach']
  };

  // Mock assignments data
  const currentAssignments = [
    {
      id: 'ASG001',
      title: 'Blood Donation Coordination',
      description: 'Help coordinate blood donation drive at Community Center. Assist with registration and donor guidance.',
      resourceType: 'blood',
      quantity: '10 units needed',
      priority: 'urgent',
      status: 'in-progress',
      location: 'Downtown Community Center',
      deadline: '2025-01-05T18:00:00Z',
      assignedAt: '2025-01-03T09:00:00Z',
      requester: {
        name: 'Sarah Johnson',
        type: 'patient',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        phone: '+1 (555) 123-4567',
        email: 'sarah.johnson@email.com'
      },
      additionalInfo: 'Patient requires O-negative blood type for upcoming surgery. Time-sensitive request with hospital coordination required.'
    },
    {
      id: 'ASG002',
      title: 'Financial Aid Distribution',
      description: 'Assist with distributing financial aid to families affected by recent flooding.',
      resourceType: 'financial',
      quantity: '$5,000 total aid',
      priority: 'high',
      status: 'pending',
      location: 'Relief Center, Mission District',
      deadline: '2025-01-06T17:00:00Z',
      assignedAt: '2025-01-03T14:30:00Z',
      requester: {
        name: 'Michael Rodriguez',
        type: 'donor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        phone: '+1 (555) 987-6543',
        email: 'michael.rodriguez@email.com'
      },
      additionalInfo: 'Funds have been allocated for 20 families. Each family will receive $250 in emergency assistance. Documentation and verification required.'
    },
    {
      id: 'ASG003',
      title: 'Medical Supply Delivery',
      description: 'Deliver essential medical supplies to elderly residents in assisted living facility.',
      resourceType: 'medical',
      quantity: '50 supply kits',
      priority: 'medium',
      status: 'completed',
      location: 'Sunset Manor Assisted Living',
      deadline: '2025-01-02T16:00:00Z',
      assignedAt: '2025-01-01T10:00:00Z',
      requester: {
        name: 'Dr. Emily Chen',
        type: 'patient',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
        phone: '+1 (555) 456-7890',
        email: 'dr.emily.chen@email.com'
      },
      additionalInfo: 'Successfully delivered all medical supply kits including medications, first aid supplies, and health monitoring equipment.'
    }
  ];

  // Mock opportunities data
  const availableOpportunities = [
    {
      id: 'OPP001',
      title: 'Emergency Blood Drive Volunteer',
      description: 'Urgent need for volunteers to help with emergency blood drive following recent accident.',
      resourceType: 'blood',
      quantity: '20 units needed',
      priority: 'urgent',
      location: 'General Hospital',
      deadline: '2025-01-04T20:00:00Z',
      postedAt: '2025-01-03T16:00:00Z',
      volunteersNeeded: 3,
      matchScore: 95,
      requester: {
        name: 'General Hospital Blood Bank',
        type: 'patient',
        avatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop&crop=face'
      },
      skillsMatch: ['Blood Donation', 'Emergency Response']
    },
    {
      id: 'OPP002',
      title: 'Community Food Distribution',
      description: 'Help distribute food packages to families in need during weekend community event.',
      resourceType: 'food',
      quantity: '200 food packages',
      priority: 'medium',
      location: 'Community Park',
      deadline: '2025-01-07T14:00:00Z',
      postedAt: '2025-01-03T12:00:00Z',
      volunteersNeeded: 8,
      matchScore: 78,
      requester: {
        name: 'Community Food Bank',
        type: 'donor',
        avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&h=150&fit=crop&crop=face'
      },
      skillsMatch: ['Community Outreach']
    },
    {
      id: 'OPP003',
      title: 'Senior Care Assistance',
      description: 'Provide companionship and basic assistance to elderly residents.',
      resourceType: 'care',
      quantity: '15 residents',
      priority: 'low',
      location: 'Golden Years Care Home',
      deadline: '2025-01-10T17:00:00Z',
      postedAt: '2025-01-02T09:00:00Z',
      volunteersNeeded: 5,
      matchScore: 65,
      requester: {
        name: 'Golden Years Administration',
        type: 'patient',
        avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
      },
      skillsMatch: ['First Aid']
    }
  ];

  // Mock stats data
  const volunteerStats = {
    assignmentsCompleted: 47,
    successRate: 94,
    recognitionPoints: 2850,
    serviceHours: 156,
    monthlyProgress: {
      assignments: 8,
      hours: 32
    },
    recentActivity: [
      {
        type: 'completed',
        description: 'Completed medical supply delivery to Sunset Manor',
        timestamp: '2 hours ago'
      },
      {
        type: 'started',
        description: 'Started blood donation coordination assignment',
        timestamp: '1 day ago'
      },
      {
        type: 'accepted',
        description: 'Accepted financial aid distribution assignment',
        timestamp: '2 days ago'
      }
    ]
  };

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const tabs = [
    { id: 'assignments', label: 'Current Assignments', icon: 'Clipboard', count: currentAssignments?.filter(a => a?.status !== 'completed')?.length },
    { id: 'opportunities', label: 'Available Opportunities', icon: 'Search', count: availableOpportunities?.length },
    { id: 'stats', label: 'My Impact', icon: 'BarChart3', count: null },
    { id: 'actions', label: 'Quick Actions', icon: 'Zap', count: null }
  ];

  // Filter functions
  const filteredAssignments = currentAssignments?.filter(assignment => {
    const matchesSearch = assignment?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         assignment?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesPriority = !filterPriority || assignment?.priority === filterPriority;
    const matchesStatus = !filterStatus || assignment?.status === filterStatus;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const filteredOpportunities = availableOpportunities?.filter(opportunity => {
    const matchesSearch = opportunity?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         opportunity?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesPriority = !filterPriority || opportunity?.priority === filterPriority;
    
    return matchesSearch && matchesPriority;
  });

  // Event handlers
  const handleLogout = () => {
    navigate('/login-register');
  };

  const handleAvailabilityChange = (status, duration) => {
    setAvailabilityStatus(status);
    console.log(`Availability changed to: ${status}${duration ? ` for ${duration} hours` : ''}`);
  };

  const handleAssignmentStatusUpdate = (assignmentId, newStatus) => {
    console.log(`Assignment ${assignmentId} status updated to: ${newStatus}`);
    // In a real app, this would update the assignment status via API
  };

  const handleContactRequester = (requester) => {
    console.log('Contacting requester:', requester);
    // In a real app, this would open a communication interface
  };

  const handleAcceptOpportunity = (opportunityId) => {
    console.log(`Accepted opportunity: ${opportunityId}`);
    // In a real app, this would assign the opportunity to the volunteer
  };

  const handleViewOpportunityDetails = (opportunity) => {
    console.log('Viewing opportunity details:', opportunity);
    // In a real app, this would open a detailed view modal
  };

  const handleQuickAction = (actionId) => {
    console.log(`Quick action triggered: ${actionId}`);
    switch (actionId) {
      case 'availability':
        // Scroll to availability toggle or open modal
        break;
      case 'training':
        // Navigate to training materials
        break;
      case 'contact':
        // Open contact coordinator interface
        break;
      case 'emergency':
        // Open emergency reporting interface
        break;
      case 'emergency-call':
        window.open('tel:+1-800-YRC-HELP');
        break;
      case 'emergency-chat':
        // Open emergency chat interface
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader user={user} onLogout={handleLogout} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                  Welcome back, {user?.name}!
                </h1>
                <p className="font-body text-lg text-muted-foreground">
                  Ready to make a difference in your community today?
                </p>
              </div>
              <div className="lg:w-80">
                <AvailabilityToggle 
                  currentStatus={availabilityStatus}
                  onStatusChange={handleAvailabilityChange}
                />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-body font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    {tab?.count !== null && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-caption ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {tab?.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Search and Filters */}
          {(activeTab === 'assignments' || activeTab === 'opportunities') && (
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    placeholder="Priority"
                    options={priorityOptions}
                    value={filterPriority}
                    onChange={setFilterPriority}
                    className="w-40"
                  />
                  {activeTab === 'assignments' && (
                    <Select
                      placeholder="Status"
                      options={statusOptions}
                      value={filterStatus}
                      onChange={setFilterStatus}
                      className="w-40"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'assignments' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-semibold text-xl text-foreground">
                    Current Assignments ({filteredAssignments?.length})
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RefreshCw"
                    iconPosition="left"
                    onClick={() => window.location?.reload()}
                  >
                    Refresh
                  </Button>
                </div>

                {filteredAssignments?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Clipboard" size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      No assignments found
                    </h3>
                    <p className="font-body text-muted-foreground mb-6">
                      {searchQuery || filterPriority || filterStatus 
                        ? 'Try adjusting your search or filters' :'Check back later for new assignments or browse available opportunities'
                      }
                    </p>
                    <Button
                      variant="default"
                      onClick={() => setActiveTab('opportunities')}
                      iconName="Search"
                      iconPosition="left"
                    >
                      Browse Opportunities
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredAssignments?.map((assignment) => (
                      <AssignmentCard
                        key={assignment?.id}
                        assignment={assignment}
                        onStatusUpdate={handleAssignmentStatusUpdate}
                        onContact={handleContactRequester}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'opportunities' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-semibold text-xl text-foreground">
                    Available Opportunities ({filteredOpportunities?.length})
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RefreshCw"
                    iconPosition="left"
                    onClick={() => window.location?.reload()}
                  >
                    Refresh
                  </Button>
                </div>

                {filteredOpportunities?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Search" size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      No opportunities found
                    </h3>
                    <p className="font-body text-muted-foreground mb-6">
                      {searchQuery || filterPriority 
                        ? 'Try adjusting your search or filters' :'Check back later for new opportunities'
                      }
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setFilterPriority('');
                      }}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredOpportunities?.map((opportunity) => (
                      <OpportunityCard
                        key={opportunity?.id}
                        opportunity={opportunity}
                        onAccept={handleAcceptOpportunity}
                        onViewDetails={handleViewOpportunityDetails}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'stats' && (
              <div>
                <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                  Your Volunteer Impact
                </h2>
                <StatsPanel stats={volunteerStats} />
              </div>
            )}

            {activeTab === 'actions' && (
              <div>
                <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                  Quick Actions & Notifications
                </h2>
                <QuickActions onAction={handleQuickAction} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
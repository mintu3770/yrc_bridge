import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticatedHeader } from '../../components/ui/AuthenticatedHeader';
import ImpactSummaryCard from './components/ImpactSummaryCard';
import DonationCard from './components/DonationCard';
import OpportunityCard from './components/OpportunityCard';
import QuickStatsWidget from './components/QuickStatsWidget';
import ActivityFeed from './components/ActivityFeed';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import FilterBar from './components/FilterBar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    urgency: 'all',
    location: 'all',
    resource: 'all'
  });

  // Mock user data
  const user = {
    role: 'donor',
    name: 'Sarah Johnson',
    avatar: null
  };

  // Mock impact data
  const impactData = {
    totalDonations: 24,
    livesHelped: 156,
    badges: 8
  };

  // Mock active donations
  const activeDonations = [
    {
      id: 1,
      title: "Emergency Blood Drive",
      recipientType: "Hospital Patient",
      resource: "O+ Blood (2 units)",
      volunteer: "Dr. Michael Chen",
      timeline: "Completed today",
      status: "completed",
      icon: "Droplets"
    },
    {
      id: 2,
      title: "Medical Supply Aid",
      recipientType: "Elderly Care Facility",
      resource: "Wheelchairs & Walkers",
      volunteer: "Lisa Rodriguez",
      timeline: "In progress - 2 days left",
      status: "in-progress",
      icon: "Package"
    },
    {
      id: 3,
      title: "Financial Assistance",
      recipientType: "Family in Need",
      resource: "$500 Emergency Fund",
      volunteer: "James Wilson",
      timeline: "Pending approval",
      status: "pending",
      icon: "DollarSign"
    }
  ];

  // Mock new opportunities
  const newOpportunities = [
    {
      id: 1,
      title: "Critical Blood Shortage",
      location: "Downtown Medical Center",
      description: "Urgent need for AB+ blood type for surgery patient. Hospital reserves critically low.",
      urgency: "critical",
      beneficiaries: 1,
      deadline: "Today",
      needed: "AB+ Blood (3 units)",
      icon: "Droplets"
    },
    {
      id: 2,
      title: "Disaster Relief Fund",
      location: "Flood-affected Area",
      description: "Families displaced by recent flooding need immediate financial assistance for temporary housing.",
      urgency: "high",
      beneficiaries: 25,
      deadline: "3 days",
      needed: "$10,000 total",
      icon: "Home"
    },
    {
      id: 3,
      title: "School Supply Drive",
      location: "Lincoln Elementary",
      description: "Back-to-school supplies needed for underprivileged students. Help ensure every child is prepared.",
      urgency: "medium",
      beneficiaries: 150,
      deadline: "2 weeks",
      needed: "Books, Stationery, Bags",
      icon: "BookOpen"
    },
    {
      id: 4,
      title: "Senior Nutrition Program",
      location: "Community Center",
      description: "Monthly food packages for elderly residents who cannot afford proper nutrition.",
      urgency: "low",
      beneficiaries: 40,
      deadline: "1 month",
      needed: "Non-perishable Food",
      icon: "ShoppingCart"
    }
  ];

  // Mock quick stats
  const quickStats = [
    {
      label: "This Month",
      value: "3 donations",
      icon: "TrendingUp",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      label: "Response Time",
      value: "< 2 hours",
      icon: "Clock",
      bgColor: "bg-success/10",
      iconColor: "text-success"
    },
    {
      label: "Match Rate",
      value: "94%",
      icon: "Target",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    },
    {
      label: "Next Badge",
      value: "2 more",
      icon: "Award",
      bgColor: "bg-warning/10",
      iconColor: "text-warning"
    }
  ];

  // Mock activity feed
  const recentActivities = [
    {
      type: "completion",
      message: "Your blood donation helped save Emma's life during emergency surgery",
      timestamp: "2 hours ago"
    },
    {
      type: "volunteer_assigned",
      message: "Dr. Michael Chen was assigned to coordinate your blood donation",
      timestamp: "1 day ago"
    },
    {
      type: "donation",
      message: "You made a new donation: Emergency Blood Drive",
      timestamp: "1 day ago"
    },
    {
      type: "status_update",
      message: "Medical Supply Aid status updated to \'In Progress'",
      timestamp: "2 days ago"
    }
  ];

  // Mock upcoming deadlines
  const upcomingDeadlines = [
    {
      title: "Medical Supply Aid",
      type: "Donation Delivery",
      deadline: "2025-01-05"
    },
    {
      title: "Monthly Review Call",
      type: "Volunteer Meeting",
      deadline: "2025-01-07"
    },
    {
      title: "Impact Report Due",
      type: "Documentation",
      deadline: "2025-01-10"
    }
  ];

  const handleLogout = () => {
    navigate('/login-register');
  };

  const handleMakeNewDonation = () => {
    // In a real app, this would open a donation form modal or navigate to donation page
    console.log('Opening new donation form...');
  };

  const handleViewAllRequests = () => {
    // In a real app, this would navigate to a comprehensive requests page
    console.log('Navigating to all requests...');
  };

  const filteredOpportunities = newOpportunities?.filter(opportunity => {
    if (filters?.urgency !== 'all' && opportunity?.urgency !== filters?.urgency) return false;
    if (filters?.resource !== 'all') {
      const resourceMap = {
        'blood': ['Droplets'],
        'financial': ['DollarSign', 'Home'],
        'supplies': ['Package', 'BookOpen'],
        'food': ['ShoppingCart']
      };
      if (!resourceMap?.[filters?.resource]?.includes(opportunity?.icon)) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader user={user} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="mb-8">
            <ImpactSummaryCard 
              totalDonations={impactData?.totalDonations}
              livesHelped={impactData?.livesHelped}
              badges={impactData?.badges}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Donations Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground">Active Donations</h2>
                  <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeDonations?.map((donation) => (
                    <DonationCard key={donation?.id} donation={donation} />
                  ))}
                </div>
              </section>

              {/* New Opportunities Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground">New Opportunities</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="ExternalLink" 
                    iconPosition="left"
                    onClick={handleViewAllRequests}
                  >
                    View All Requests
                  </Button>
                </div>

                {/* Filter Bar */}
                <div className="mb-6">
                  <FilterBar 
                    onFilterChange={setFilters}
                    activeFilters={filters}
                  />
                </div>

                {/* Opportunities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredOpportunities?.map((opportunity) => (
                    <OpportunityCard key={opportunity?.id} opportunity={opportunity} />
                  ))}
                </div>

                {filteredOpportunities?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">No opportunities found</h3>
                    <p className="text-muted-foreground font-body">Try adjusting your filters to see more opportunities.</p>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <QuickStatsWidget stats={quickStats} />
              <UpcomingDeadlines deadlines={upcomingDeadlines} />
              <ActivityFeed activities={recentActivities} />
            </div>
          </div>
        </div>
      </main>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant="default"
          size="lg"
          iconName="Plus"
          onClick={handleMakeNewDonation}
          className="rounded-full shadow-floating w-14 h-14 p-0 lg:w-auto lg:h-auto lg:px-6 lg:py-3 lg:rounded-lg"
        >
          <span className="hidden lg:inline ml-2">Make New Donation</span>
        </Button>
      </div>
    </div>
  );
};

export default DonorDashboard;
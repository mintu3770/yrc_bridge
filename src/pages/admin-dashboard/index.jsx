import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticatedHeader } from '../../components/ui/AuthenticatedHeader';
import MetricsCard from './components/MetricsCard';
import UserManagementTable from './components/UserManagementTable';
import DonationOversightPanel from './components/DonationOversightPanel';
import VolunteerApplicationsPanel from './components/VolunteerApplicationsPanel';
import SystemReportsPanel from './components/SystemReportsPanel';
import QuickActionsPanel from './components/QuickActionsPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import SystemHealthIndicators from './components/SystemHealthIndicators';
import Icon from '../../components/AppIcon';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user-management');
  const [currentUser, setCurrentUser] = useState(null);

  // Mock admin user data
  useEffect(() => {
    const adminUser = {
      role: 'admin',
      name: 'Admin User',
      email: 'admin@yrcbridge.org',
      avatar: null
    };
    setCurrentUser(adminUser);
  }, []);

  const handleLogout = () => {
    // Clear user session and redirect to login
    localStorage.removeItem('user');
    navigate('/login-register');
  };

  // Key metrics data
  const metricsData = [
    {
      title: 'Active Users',
      value: '516',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '+5 new',
      changeType: 'warning',
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: 'Success Rate',
      value: '89.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      title: 'Volunteer Utilization',
      value: '76.8%',
      change: '-1.2%',
      changeType: 'negative',
      icon: 'Activity',
      color: 'error'
    }
  ];

  const tabs = [
    { id: 'user-management', label: 'User Management', icon: 'Users' },
    { id: 'donation-oversight', label: 'Donation Oversight', icon: 'Heart' },
    { id: 'volunteer-applications', label: 'Volunteer Applications', icon: 'UserCheck' },
    { id: 'system-reports', label: 'System Reports', icon: 'BarChart3' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'user-management':
        return <UserManagementTable />;
      case 'donation-oversight':
        return <DonationOversightPanel />;
      case 'volunteer-applications':
        return <VolunteerApplicationsPanel />;
      case 'system-reports':
        return <SystemReportsPanel />;
      default:
        return <UserManagementTable />;
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-4" />
          <p className="font-body text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader 
        user={currentUser} 
        onLogout={handleLogout}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="font-body text-muted-foreground mt-2">
                  Comprehensive organizational oversight and management
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-body text-sm text-foreground">Welcome back,</p>
                  <p className="font-body font-semibold text-foreground">{currentUser?.name}</p>
                </div>
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-body font-medium">
                    {currentUser?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tabbed Sections */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-body font-medium text-sm transition-colors duration-200 ${
                          activeTab === tab?.id
                            ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-0">
                  {renderTabContent()}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Actions Panel */}
              <QuickActionsPanel />

              {/* Recent Activity Feed */}
              <RecentActivityFeed />

              {/* System Health Indicators */}
              <SystemHealthIndicators />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SystemReportsPanel = () => {
  const [reportType, setReportType] = useState('overview');
  const [timeRange, setTimeRange] = useState('30days');

  const reportOptions = [
    { value: 'overview', label: 'Overview Dashboard' },
    { value: 'donations', label: 'Donation Analytics' },
    { value: 'volunteers', label: 'Volunteer Performance' },
    { value: 'users', label: 'User Growth' }
  ];

  const timeRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '1year', label: 'Last Year' }
  ];

  // Mock data for charts
  const donationTrendsData = [
    { month: 'Jan', donations: 45, completed: 38, cancelled: 7 },
    { month: 'Feb', donations: 52, completed: 47, cancelled: 5 },
    { month: 'Mar', donations: 48, completed: 42, cancelled: 6 },
    { month: 'Apr', donations: 61, completed: 55, cancelled: 6 },
    { month: 'May', donations: 58, completed: 52, cancelled: 6 },
    { month: 'Jun', donations: 67, completed: 61, cancelled: 6 },
    { month: 'Jul', donations: 72, completed: 65, cancelled: 7 }
  ];

  const userGrowthData = [
    { month: 'Jan', donors: 120, patients: 85, volunteers: 95, admins: 8 },
    { month: 'Feb', donors: 135, patients: 92, volunteers: 108, admins: 8 },
    { month: 'Mar', donors: 148, patients: 98, volunteers: 115, admins: 9 },
    { month: 'Apr', donors: 162, patients: 105, volunteers: 128, admins: 9 },
    { month: 'May', donors: 178, patients: 112, volunteers: 142, admins: 10 },
    { month: 'Jun', donors: 195, patients: 118, volunteers: 156, admins: 10 },
    { month: 'Jul', donors: 212, patients: 125, volunteers: 168, admins: 11 }
  ];

  const donationTypeData = [
    { name: 'Blood Donation', value: 45, color: '#EF4444' },
    { name: 'Financial Aid', value: 30, color: '#10B981' },
    { name: 'Medical Supplies', value: 15, color: '#F59E0B' },
    { name: 'Food Assistance', value: 10, color: '#8B5CF6' }
  ];

  const volunteerPerformanceData = [
    { name: 'Sarah Johnson', completed: 28, pending: 3, rating: 4.9 },
    { name: 'Michael Chen', completed: 25, pending: 2, rating: 4.8 },
    { name: 'Emily Rodriguez', completed: 22, pending: 4, rating: 4.7 },
    { name: 'David Wilson', completed: 20, pending: 1, rating: 4.9 },
    { name: 'Lisa Thompson', completed: 18, pending: 2, rating: 4.6 }
  ];

  const generateReport = () => {
    console.log('Generating report:', reportType, timeRange);
  };

  const exportReport = () => {
    console.log('Exporting report:', reportType, timeRange);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header with controls */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              options={reportOptions}
              value={reportType}
              onChange={setReportType}
              placeholder="Select report type"
              className="w-48"
            />
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              placeholder="Select time range"
              className="w-40"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" iconName="RefreshCw" onClick={generateReport}>
              Refresh
            </Button>
            <Button variant="default" iconName="Download" onClick={exportReport}>
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Report Content */}
      <div className="p-6 space-y-8 max-h-[600px] overflow-y-auto">
        {reportType === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Total Donations</p>
                    <p className="font-heading text-2xl font-bold text-foreground">423</p>
                    <p className="font-body text-xs text-success">+12% from last month</p>
                  </div>
                  <Icon name="Heart" size={24} className="text-primary" />
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Success Rate</p>
                    <p className="font-heading text-2xl font-bold text-foreground">89.2%</p>
                    <p className="font-body text-xs text-success">+2.1% from last month</p>
                  </div>
                  <Icon name="TrendingUp" size={24} className="text-success" />
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Active Volunteers</p>
                    <p className="font-heading text-2xl font-bold text-foreground">168</p>
                    <p className="font-body text-xs text-success">+8 new this month</p>
                  </div>
                  <Icon name="Users" size={24} className="text-warning" />
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Response Time</p>
                    <p className="font-heading text-2xl font-bold text-foreground">2.4h</p>
                    <p className="font-body text-xs text-error">+0.3h from last month</p>
                  </div>
                  <Icon name="Clock" size={24} className="text-error" />
                </div>
              </div>
            </div>

            {/* Donation Trends Chart */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Donation Trends</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={donationTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="donations" fill="#2563EB" name="Total Donations" />
                    <Bar dataKey="completed" fill="#10B981" name="Completed" />
                    <Bar dataKey="cancelled" fill="#EF4444" name="Cancelled" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {reportType === 'donations' && (
          <div className="space-y-8">
            {/* Donation Types Distribution */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Donation Types Distribution</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donationTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                    >
                      {donationTypeData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Performance */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Monthly Performance</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={donationTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="donations" stroke="#2563EB" strokeWidth={2} name="Total Donations" />
                    <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="Completed" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {reportType === 'volunteers' && (
          <div className="space-y-8">
            {/* Top Performing Volunteers */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Top Performing Volunteers</h3>
              <div className="space-y-4">
                {volunteerPerformanceData?.map((volunteer, index) => (
                  <div key={volunteer?.name} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-body font-medium text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-body font-medium text-foreground">{volunteer?.name}</p>
                        <p className="font-body text-sm text-muted-foreground">
                          {volunteer?.completed} completed, {volunteer?.pending} pending
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={16} className="text-warning fill-current" />
                        <span className="font-body text-sm text-foreground">{volunteer?.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {reportType === 'users' && (
          <div className="space-y-8">
            {/* User Growth Chart */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">User Growth Over Time</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="donors" stroke="#10B981" strokeWidth={2} name="Donors" />
                    <Line type="monotone" dataKey="patients" stroke="#F59E0B" strokeWidth={2} name="Patients" />
                    <Line type="monotone" dataKey="volunteers" stroke="#2563EB" strokeWidth={2} name="Volunteers" />
                    <Line type="monotone" dataKey="admins" stroke="#EF4444" strokeWidth={2} name="Admins" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Heart" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Total Donors</p>
                    <p className="font-heading text-xl font-bold text-foreground">212</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="User" size={20} className="text-warning" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Total Patients</p>
                    <p className="font-heading text-xl font-bold text-foreground">125</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Total Volunteers</p>
                    <p className="font-heading text-xl font-bold text-foreground">168</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={20} className="text-error" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Total Admins</p>
                    <p className="font-heading text-xl font-bold text-foreground">11</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemReportsPanel;
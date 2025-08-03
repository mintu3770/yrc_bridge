import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticatedHeader } from '../../components/ui/AuthenticatedHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RequestCard from './components/RequestCard';
import RequestTimeline from './components/RequestTimeline';
import QuickStats from './components/QuickStats';
import RequestHelpModal from './components/RequestHelpModal';
import EmergencyContact from './components/EmergencyContact';
import ResourcesSidebar from './components/ResourcesSidebar';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Mock user data
  const user = {
    role: 'patient',
    name: 'Sarah Johnson',
    avatar: null
  };

  // Mock requests data
  const [requests, setRequests] = useState([
    {
      id: 1,
      resourceType: 'Blood Donation - Type O+',
      status: 'volunteer-assigned',
      urgency: 'critical',
      description: 'Urgent blood donation needed for surgery scheduled tomorrow morning. Patient requires 2 units of O+ blood.',
      location: 'City General Hospital, Downtown',
      submissionDate: 'Jan 15, 2025',
      estimatedCompletion: 'Jan 16, 2025',
      volunteer: {
        id: 1,
        name: 'Dr. Michael Chen',
        phone: '+1-555-0123',
        email: 'michael.chen@email.com'
      },
      timeline: {
        submitted: 'Jan 15, 2025 - 9:30 AM',
        'under-review': 'Jan 15, 2025 - 10:15 AM',
        'volunteer-assigned': 'Jan 15, 2025 - 11:45 AM'
      }
    },
    {
      id: 2,
      resourceType: 'Financial Aid',
      status: 'in-progress',
      urgency: 'high',
      description: 'Need financial assistance for medical bills and prescription medications. Total amount needed: $2,500.',
      location: 'Springfield, IL',
      submissionDate: 'Jan 12, 2025',
      estimatedCompletion: 'Jan 18, 2025',
      volunteer: {
        id: 2,
        name: 'Lisa Rodriguez',
        phone: '+1-555-0456',
        email: 'lisa.rodriguez@email.com'
      },
      timeline: {
        submitted: 'Jan 12, 2025 - 2:15 PM',
        'under-review': 'Jan 12, 2025 - 4:30 PM',
        'volunteer-assigned': 'Jan 13, 2025 - 9:00 AM',
        'in-progress': 'Jan 14, 2025 - 10:30 AM'
      }
    },
    {
      id: 3,
      resourceType: 'Transportation',
      status: 'completed',
      urgency: 'medium',
      description: 'Need transportation to weekly dialysis appointments. 3 times per week, early morning sessions.',
      location: 'Riverside Medical Center',
      submissionDate: 'Jan 8, 2025',
      estimatedCompletion: 'Jan 10, 2025',
      volunteer: {
        id: 3,
        name: 'James Wilson',
        phone: '+1-555-0789',
        email: 'james.wilson@email.com'
      },
      timeline: {
        submitted: 'Jan 8, 2025 - 1:00 PM',
        'under-review': 'Jan 8, 2025 - 3:15 PM',
        'volunteer-assigned': 'Jan 9, 2025 - 8:30 AM',
        'in-progress': 'Jan 9, 2025 - 2:00 PM',
        completed: 'Jan 10, 2025 - 6:00 PM'
      }
    },
    {
      id: 4,
      resourceType: 'Medical Supplies',
      status: 'under-review',
      urgency: 'low',
      description: 'Need wheelchair and mobility aids for temporary use during recovery period (6-8 weeks).',
      location: 'Oak Park Community',
      submissionDate: 'Jan 14, 2025',
      timeline: {
        submitted: 'Jan 14, 2025 - 4:45 PM',
        'under-review': 'Jan 15, 2025 - 8:00 AM'
      }
    }
  ]);

  // Mock stats data
  const stats = {
    totalRequests: 12,
    successfulMatches: 8,
    avgResponseTime: '4.2 hrs',
    activeRequests: 3
  };

  useEffect(() => {
    // Simulate real-time notifications
    const mockNotifications = [
      {
        id: 1,
        title: 'Volunteer Assigned',
        message: 'Dr. Michael Chen has been assigned to your blood donation request',
        time: '5 min ago',
        unread: true
      },
      {
        id: 2,
        title: 'Request Update',
        message: 'Your financial aid request is now in progress',
        time: '2 hours ago',
        unread: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleLogout = () => {
    navigate('/login-register');
  };

  const handleRequestSubmit = (formData) => {
    const newRequest = {
      id: requests?.length + 1,
      resourceType: formData?.resourceType?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase()),
      status: 'submitted',
      urgency: formData?.urgency,
      description: formData?.description,
      location: formData?.location,
      submissionDate: new Date()?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      timeline: {
        submitted: new Date()?.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }) + ' - ' + new Date()?.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        })
      }
    };

    setRequests(prev => [newRequest, ...prev]);
    setIsRequestModalOpen(false);

    // Show success notification
    const successNotification = {
      id: Date.now(),
      title: 'Request Submitted',
      message: 'Your help request has been submitted successfully',
      time: 'Just now',
      unread: true
    };
    setNotifications(prev => [successNotification, ...prev]);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleContactVolunteer = (volunteer) => {
    // In a real app, this would open a messaging interface
    alert(`Contact ${volunteer?.name} at ${volunteer?.phone} or ${volunteer?.email}`);
  };

  const activeRequests = requests?.filter(req => 
    ['submitted', 'under-review', 'volunteer-assigned', 'in-progress']?.includes(req?.status)
  );

  const completedRequests = requests?.filter(req => 
    ['completed', 'cancelled']?.includes(req?.status)
  );

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader 
        user={user} 
        onLogout={handleLogout}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground">
                  Welcome back, {user?.name}
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage your assistance requests and track their progress
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button
                  variant="default"
                  size="lg"
                  iconName="HelpCircle"
                  iconPosition="left"
                  onClick={() => setIsRequestModalOpen(true)}
                  className="w-full sm:w-auto"
                >
                  Request Help
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mb-8">
            <QuickStats stats={stats} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Active Requests */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-semibold text-xl text-foreground">
                    Active Requests ({activeRequests?.length})
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => setIsRequestModalOpen(true)}
                  >
                    New Request
                  </Button>
                </div>

                {activeRequests?.length > 0 ? (
                  <div className="space-y-4">
                    {activeRequests?.map((request) => (
                      <RequestCard
                        key={request?.id}
                        request={request}
                        onViewDetails={handleViewDetails}
                        onContactVolunteer={handleContactVolunteer}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="HelpCircle" size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      No Active Requests
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any active assistance requests at the moment.
                    </p>
                    <Button
                      variant="default"
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => setIsRequestModalOpen(true)}
                    >
                      Submit Your First Request
                    </Button>
                  </div>
                )}
              </div>

              {/* Request Timeline */}
              {selectedRequest && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading font-semibold text-xl text-foreground">
                      Request Timeline
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => setSelectedRequest(null)}
                    >
                      Close
                    </Button>
                  </div>
                  <RequestTimeline request={selectedRequest} />
                </div>
              )}

              {/* Recent Activity */}
              {completedRequests?.length > 0 && (
                <div>
                  <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {completedRequests?.slice(0, 3)?.map((request) => (
                      <RequestCard
                        key={request?.id}
                        request={request}
                        onViewDetails={handleViewDetails}
                        onContactVolunteer={handleContactVolunteer}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency Contact Section - Mobile */}
              <div className="lg:hidden">
                <EmergencyContact />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Emergency Contact - Desktop */}
              <div className="hidden lg:block">
                <EmergencyContact />
              </div>
              
              {/* Resources Sidebar */}
              <ResourcesSidebar />
            </div>
          </div>
        </div>
      </div>
      {/* Request Help Modal */}
      <RequestHelpModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={handleRequestSubmit}
      />
      {/* Mobile FAB for Emergency */}
      <div className="lg:hidden fixed bottom-20 left-6 z-40">
        <Button
          variant="destructive"
          size="lg"
          iconName="Phone"
          onClick={() => window.open('tel:+1-800-YRC-HELP', '_self')}
          className="rounded-full shadow-floating w-14 h-14 p-0"
        />
      </div>
    </div>
  );
};

export default PatientDashboard;
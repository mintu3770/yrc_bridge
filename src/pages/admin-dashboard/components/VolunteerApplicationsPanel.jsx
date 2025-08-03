import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const VolunteerApplicationsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const applications = [
    {
      id: 'APP-001',
      name: 'Jennifer Martinez',
      email: 'jennifer.martinez@email.com',
      phone: '+1 (555) 123-4567',
      age: 28,
      location: 'Downtown District',
      experience: 'Previous volunteer at local food bank for 2 years',
      availability: 'Weekends and evenings',
      skills: ['First Aid Certified', 'Bilingual (English/Spanish)', 'Driver License'],
      motivation: `I want to give back to my community and help those in need. Having received help from YRC during a difficult time in my family, I understand the importance of this organization's work.`,status: 'pending',applicationDate: '2024-08-01',avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'APP-002',name: 'Robert Kim',email: 'robert.kim@email.com',phone: '+1 (555) 234-5678',age: 35,location: 'Suburban Area',experience: 'Medical professional with 10+ years experience',availability: 'Flexible schedule',
      skills: ['Medical Training', 'Emergency Response', 'Team Leadership'],
      motivation: `As a healthcare professional, I want to extend my service beyond the hospital to help coordinate medical assistance in the community.`,
      status: 'under-review',applicationDate: '2024-07-30',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'APP-003',name: 'Amanda Foster',email: 'amanda.foster@email.com',phone: '+1 (555) 345-6789',age: 22,location: 'University District',experience: 'College student with community service background',availability: 'Afternoons and weekends',
      skills: ['Social Media Management', 'Event Planning', 'Public Speaking'],
      motivation: `I'm studying social work and want to gain practical experience while helping people in my community. I believe in the mission of YRC.`,
      status: 'approved',
      applicationDate: '2024-07-28',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'APP-004',
      name: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      age: 45,
      location: 'Industrial District',
      experience: 'Retired firefighter with emergency response background',
      availability: 'Full-time availability',
      skills: ['Emergency Response', 'Crisis Management', 'Physical Fitness'],
      motivation: `After retiring from the fire department, I want to continue serving my community in a different capacity. My experience in emergency situations would be valuable.`,
      status: 'rejected',
      applicationDate: '2024-07-25',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const filteredApplications = applications?.filter(app => {
    const matchesSearch = app?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         app?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pending', icon: 'Clock' },
      'under-review': { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Under Review', icon: 'Eye' },
      approved: { color: 'bg-success/10 text-success border-success/20', label: 'Approved', icon: 'CheckCircle' },
      rejected: { color: 'bg-error/10 text-error border-error/20', label: 'Rejected', icon: 'XCircle' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const handleApprove = (applicationId) => {
    console.log('Approving application:', applicationId);
  };

  const handleReject = (applicationId) => {
    console.log('Rejecting application:', applicationId);
  };

  const handleReview = (application) => {
    setSelectedApplication(application);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header with filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
              />
            </div>
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Filter by status"
              className="w-40"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" iconName="Download">
              Export
            </Button>
            <Button variant="default" iconName="UserPlus">
              Invite Volunteer
            </Button>
          </div>
        </div>
      </div>
      {/* Applications List */}
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {filteredApplications?.map((application) => (
          <div key={application?.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-shadow duration-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start space-x-4 flex-1">
                <img
                  src={application?.avatar}
                  alt={application?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-heading font-semibold text-foreground">{application?.name}</h3>
                    {getStatusBadge(application?.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="font-body font-medium text-muted-foreground">Contact</p>
                      <p className="font-body text-foreground">{application?.email}</p>
                      <p className="font-body text-foreground">{application?.phone}</p>
                    </div>
                    <div>
                      <p className="font-body font-medium text-muted-foreground">Details</p>
                      <p className="font-body text-foreground">Age: {application?.age}</p>
                      <p className="font-body text-foreground">{application?.location}</p>
                    </div>
                    <div>
                      <p className="font-body font-medium text-muted-foreground">Availability</p>
                      <p className="font-body text-foreground">{application?.availability}</p>
                    </div>
                    <div>
                      <p className="font-body font-medium text-muted-foreground">Applied</p>
                      <p className="font-body text-foreground">{application?.applicationDate}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="font-body font-medium text-muted-foreground mb-1">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {application?.skills?.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-body font-medium text-muted-foreground mb-1">Experience</p>
                    <p className="font-body text-sm text-foreground">{application?.experience}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  iconName="Eye"
                  onClick={() => handleReview(application)}
                >
                  Review
                </Button>
                
                {application?.status === 'pending' && (
                  <>
                    <Button 
                      variant="success" 
                      size="sm" 
                      iconName="Check"
                      onClick={() => handleApprove(application?.id)}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      iconName="X"
                      onClick={() => handleReject(application?.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                
                <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredApplications?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="UserCheck" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="font-body text-muted-foreground">No applications found matching your criteria</p>
        </div>
      )}
      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Application Review - {selectedApplication?.name}
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                iconName="X"
                onClick={() => setSelectedApplication(null)}
              />
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-start space-x-4">
                <img
                  src={selectedApplication?.avatar}
                  alt={selectedApplication?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {selectedApplication?.name}
                  </h3>
                  {getStatusBadge(selectedApplication?.status)}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-body font-semibold text-foreground mb-2">Contact Information</h4>
                  <div className="space-y-1 text-sm">
                    <p className="font-body text-foreground">{selectedApplication?.email}</p>
                    <p className="font-body text-foreground">{selectedApplication?.phone}</p>
                    <p className="font-body text-foreground">{selectedApplication?.location}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-body font-semibold text-foreground mb-2">Personal Details</h4>
                  <div className="space-y-1 text-sm">
                    <p className="font-body text-foreground">Age: {selectedApplication?.age}</p>
                    <p className="font-body text-foreground">Applied: {selectedApplication?.applicationDate}</p>
                    <p className="font-body text-foreground">Availability: {selectedApplication?.availability}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-body font-semibold text-foreground mb-2">Skills & Qualifications</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication?.skills?.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-body font-semibold text-foreground mb-2">Experience</h4>
                <p className="font-body text-sm text-foreground">{selectedApplication?.experience}</p>
              </div>
              
              <div>
                <h4 className="font-body font-semibold text-foreground mb-2">Motivation</h4>
                <p className="font-body text-sm text-foreground">{selectedApplication?.motivation}</p>
              </div>
            </div>
            
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </Button>
              {selectedApplication?.status === 'pending' && (
                <>
                  <Button 
                    variant="destructive" 
                    iconName="X"
                    onClick={() => {
                      handleReject(selectedApplication?.id);
                      setSelectedApplication(null);
                    }}
                  >
                    Reject
                  </Button>
                  <Button 
                    variant="success" 
                    iconName="Check"
                    onClick={() => {
                      handleApprove(selectedApplication?.id);
                      setSelectedApplication(null);
                    }}
                  >
                    Approve
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerApplicationsPanel;
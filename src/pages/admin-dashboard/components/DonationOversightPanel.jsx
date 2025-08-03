import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DonationOversightPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const donations = [
    {
      id: 'DON-001',
      donor: 'Michael Chen',
      patient: 'Sarah Williams',
      type: 'Blood Donation',
      bloodType: 'O+',
      status: 'pending',
      priority: 'urgent',
      requestDate: '2024-08-02',
      assignedVolunteer: null,
      location: 'City Hospital, Downtown'
    },
    {
      id: 'DON-002',
      donor: 'Emily Rodriguez',
      patient: 'John Davis',
      type: 'Financial Aid',
      amount: '$500',
      status: 'in-progress',
      priority: 'high',
      requestDate: '2024-08-01',
      assignedVolunteer: 'Lisa Thompson',
      location: 'Community Center'
    },
    {
      id: 'DON-003',
      donor: 'David Wilson',
      patient: 'Maria Garcia',
      type: 'Medical Supplies',
      items: 'Wheelchair, Crutches',
      status: 'completed',
      priority: 'medium',
      requestDate: '2024-07-30',
      assignedVolunteer: 'Alex Johnson',
      location: 'Patient Home'
    },
    {
      id: 'DON-004',
      donor: 'Lisa Thompson',
      patient: 'Robert Brown',
      type: 'Blood Donation',
      bloodType: 'AB-',
      status: 'assigned',
      priority: 'urgent',
      requestDate: '2024-08-03',
      assignedVolunteer: 'Sarah Johnson',
      location: 'Regional Medical Center'
    },
    {
      id: 'DON-005',
      donor: 'James Wilson',
      patient: 'Anna Martinez',
      type: 'Food Assistance',
      items: 'Meal packages for family of 4',
      status: 'cancelled',
      priority: 'low',
      requestDate: '2024-07-28',
      assignedVolunteer: null,
      location: 'Food Bank'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Blood Donation', label: 'Blood Donation' },
    { value: 'Financial Aid', label: 'Financial Aid' },
    { value: 'Medical Supplies', label: 'Medical Supplies' },
    { value: 'Food Assistance', label: 'Food Assistance' }
  ];

  const filteredDonations = donations?.filter(donation => {
    const matchesSearch = donation?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         donation?.donor?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         donation?.patient?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || donation?.status === statusFilter;
    const matchesType = typeFilter === 'all' || donation?.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pending', icon: 'Clock' },
      assigned: { color: 'bg-primary/10 text-primary border-primary/20', label: 'Assigned', icon: 'UserCheck' },
      'in-progress': { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'In Progress', icon: 'Activity' },
      completed: { color: 'bg-success/10 text-success border-success/20', label: 'Completed', icon: 'CheckCircle' },
      cancelled: { color: 'bg-error/10 text-error border-error/20', label: 'Cancelled', icon: 'XCircle' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{config?.label}</span>
      </div>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      urgent: { color: 'bg-red-100 text-red-700 border-red-200', label: 'Urgent' },
      high: { color: 'bg-orange-100 text-orange-700 border-orange-200', label: 'High' },
      medium: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Medium' },
      low: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Low' }
    };
    
    const config = priorityConfig?.[priority] || priorityConfig?.medium;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const handleAssignVolunteer = (donationId) => {
    console.log('Assigning volunteer to donation:', donationId);
  };

  const handleUpdateStatus = (donationId, newStatus) => {
    console.log('Updating status for donation:', donationId, 'to:', newStatus);
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
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Filter by status"
                className="w-40"
              />
              <Select
                options={typeOptions}
                value={typeFilter}
                onChange={setTypeFilter}
                placeholder="Filter by type"
                className="w-40"
              />
            </div>
          </div>
          
          <Button variant="default" iconName="Plus">
            Create Manual Assignment
          </Button>
        </div>
      </div>
      {/* Donation Cards */}
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {filteredDonations?.map((donation) => (
          <div key={donation?.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-shadow duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-heading font-semibold text-foreground">{donation?.id}</h3>
                  {getStatusBadge(donation?.status)}
                  {getPriorityBadge(donation?.priority)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-body font-medium text-muted-foreground">Donor</p>
                    <p className="font-body text-foreground">{donation?.donor}</p>
                  </div>
                  <div>
                    <p className="font-body font-medium text-muted-foreground">Patient</p>
                    <p className="font-body text-foreground">{donation?.patient}</p>
                  </div>
                  <div>
                    <p className="font-body font-medium text-muted-foreground">Type</p>
                    <p className="font-body text-foreground">{donation?.type}</p>
                  </div>
                  <div>
                    <p className="font-body font-medium text-muted-foreground">Details</p>
                    <p className="font-body text-foreground">
                      {donation?.bloodType || donation?.amount || donation?.items}
                    </p>
                  </div>
                  <div>
                    <p className="font-body font-medium text-muted-foreground">Assigned Volunteer</p>
                    <p className="font-body text-foreground">
                      {donation?.assignedVolunteer || 'Not assigned'}
                    </p>
                  </div>
                  <div>
                    <p className="font-body font-medium text-muted-foreground">Location</p>
                    <p className="font-body text-foreground">{donation?.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                {donation?.status === 'pending' && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    iconName="UserPlus"
                    onClick={() => handleAssignVolunteer(donation?.id)}
                  >
                    Assign Volunteer
                  </Button>
                )}
                
                {donation?.status === 'assigned' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="Play"
                    onClick={() => handleUpdateStatus(donation?.id, 'in-progress')}
                  >
                    Start Progress
                  </Button>
                )}
                
                {donation?.status === 'in-progress' && (
                  <Button 
                    variant="success" 
                    size="sm" 
                    iconName="CheckCircle"
                    onClick={() => handleUpdateStatus(donation?.id, 'completed')}
                  >
                    Mark Complete
                  </Button>
                )}
                
                <Button variant="ghost" size="sm" iconName="Eye">
                  View Details
                </Button>
                
                <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredDonations?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Heart" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="font-body text-muted-foreground">No donations found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default DonationOversightPanel;
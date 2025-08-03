import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagementTable = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      role: 'volunteer',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      role: 'donor',
      status: 'active',
      joinDate: '2024-02-03',
      lastActive: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      role: 'patient',
      status: 'pending',
      joinDate: '2024-02-28',
      lastActive: '3 days ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      role: 'volunteer',
      status: 'inactive',
      joinDate: '2023-12-10',
      lastActive: '2 weeks ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-11-20',
      lastActive: '30 minutes ago',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'donor', label: 'Donor' },
    { value: 'patient', label: 'Patient' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = roleFilter === 'all' || user?.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers?.filter(id => id !== userId));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success border-success/20', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground border-border', label: 'Inactive' },
      pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pending' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: 'bg-error/10 text-error border-error/20', label: 'Admin' },
      volunteer: { color: 'bg-primary/10 text-primary border-primary/20', label: 'Volunteer' },
      donor: { color: 'bg-success/10 text-success border-success/20', label: 'Donor' },
      patient: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Patient' }
    };
    
    const config = roleConfig?.[role] || roleConfig?.volunteer;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header with filters and actions */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                options={roleOptions}
                value={roleFilter}
                onChange={setRoleFilter}
                placeholder="Filter by role"
                className="w-40"
              />
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Filter by status"
                className="w-40"
              />
            </div>
          </div>
          
          {selectedUsers?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-body text-sm text-muted-foreground">
                {selectedUsers?.length} selected
              </span>
              <Button variant="outline" size="sm" iconName="Mail">
                Send Email
              </Button>
              <Button variant="outline" size="sm" iconName="UserCheck">
                Bulk Approve
              </Button>
              <Button variant="destructive" size="sm" iconName="Trash2">
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-body font-medium text-sm text-foreground">
                <Checkbox
                  checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                  indeterminate={selectedUsers?.length > 0 && selectedUsers?.length < filteredUsers?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4 font-body font-medium text-sm text-foreground">User</th>
              <th className="text-left p-4 font-body font-medium text-sm text-foreground">Role</th>
              <th className="text-left p-4 font-body font-medium text-sm text-foreground">Status</th>
              <th className="text-left p-4 font-body font-medium text-sm text-foreground">Join Date</th>
              <th className="text-left p-4 font-body font-medium text-sm text-foreground">Last Active</th>
              <th className="text-left p-4 font-body font-medium text-sm text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                <td className="p-4">
                  <Checkbox
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={(e) => handleSelectUser(user?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-body font-medium text-sm text-foreground">{user?.name}</p>
                      <p className="font-body text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {getRoleBadge(user?.role)}
                </td>
                <td className="p-4">
                  {getStatusBadge(user?.status)}
                </td>
                <td className="p-4">
                  <span className="font-body text-sm text-foreground">{user?.joinDate}</span>
                </td>
                <td className="p-4">
                  <span className="font-body text-sm text-muted-foreground">{user?.lastActive}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredUsers?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="font-body text-muted-foreground">No users found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;
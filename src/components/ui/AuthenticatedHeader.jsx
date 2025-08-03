import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { LogOut, User, Heart } from 'lucide-react';

export function AuthenticatedHeader() {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login-register');
    } catch (error) {
      console.log('Sign out error:', error);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'donor':
        return 'bg-green-100 text-green-800';
      case 'patient':
        return 'bg-blue-100 text-blue-800';
      case 'volunteer':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const navigateToDashboard = () => {
    const role = userProfile?.role || 'donor';
    switch (role) {
      case 'admin': navigate('/admin-dashboard');
        break;
      case 'donor':
        navigate('/donor-dashboard');
        break;
      case 'patient': navigate('/patient-dashboard');
        break;
      case 'volunteer': navigate('/volunteer-dashboard');
        break;
      default:
        navigate('/donor-dashboard');
    }
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={navigateToDashboard}>
            <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-lg">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">YRC Bridge</h1>
              <p className="text-xs text-gray-500">Connecting Hearts, Saving Lives</p>
            </div>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {userProfile?.full_name || user?.email?.split('@')?.[0]}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(userProfile?.role)}`}>
                      {userProfile?.role || 'User'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-4">
              {userProfile?.role === 'admin' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Admin Dashboard
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/volunteer-directory')}
                className="text-gray-600 hover:text-gray-900"
              >
                Volunteers
              </Button>
            </nav>

            {/* Sign Out Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
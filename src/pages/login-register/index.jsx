import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import { AuthForm } from './components/AuthForm';
import TrustSignals from './components/TrustSignals';
import PlatformBenefits from './components/PlatformBenefits';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for different user types
  const mockCredentials = {
    'donor@example.com': { password: 'donor123', role: 'donor', name: 'John Donor' },
    'patient@example.com': { password: 'patient123', role: 'patient', name: 'Jane Patient' },
    'volunteer@example.com': { password: 'volunteer123', role: 'volunteer', name: 'Mike Volunteer' },
    'admin@example.com': { password: 'admin123', role: 'admin', name: 'Sarah Admin' }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      if (isLogin) {
        // Handle login
        const user = mockCredentials?.[formData?.email];
        if (user && user?.password === formData?.password) {
          // Store user session
          localStorage.setItem('yrc_user', JSON.stringify({
            email: formData?.email,
            name: user?.name,
            role: user?.role,
            loginTime: new Date()?.toISOString()
          }));

          // Navigate to appropriate dashboard
          const dashboardRoutes = {
            donor: '/donor-dashboard',
            patient: '/patient-dashboard',
            volunteer: '/volunteer-dashboard',
            admin: '/admin-dashboard'
          };
          
          navigate(dashboardRoutes?.[user?.role] || '/donor-dashboard');
        } else {
          alert('Invalid credentials. Please try:\n• donor@example.com / donor123\n• patient@example.com / patient123\n• volunteer@example.com / volunteer123\n• admin@example.com / admin123');
        }
      } else {
        // Handle registration
        const newUser = {
          email: formData?.email,
          name: `${formData?.firstName} ${formData?.lastName}`,
          role: formData?.role,
          registrationTime: new Date()?.toISOString()
        };

        // Store user session
        localStorage.setItem('yrc_user', JSON.stringify(newUser));

        // Navigate to appropriate dashboard
        const dashboardRoutes = {
          donor: '/donor-dashboard',
          patient: '/patient-dashboard',
          volunteer: '/volunteer-dashboard'
        };
        
        navigate(dashboardRoutes?.[formData?.role] || '/donor-dashboard');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="relative min-h-screen flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="p-6 lg:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={24} color="white" />
                </div>
                <div>
                  <h1 className="font-heading font-bold text-xl text-foreground">YRC Bridge</h1>
                  <p className="font-caption text-xs text-muted-foreground">Youth Red Cross Platform</p>
                </div>
              </div>
              
              {/* Help Link */}
              <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Icon name="HelpCircle" size={20} />
                <span className="font-body text-sm hidden sm:inline">Need Help?</span>
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Auth Form */}
                <div className="order-2 lg:order-1">
                  <AuthForm
                    isLogin={isLogin}
                    onToggleMode={setIsLogin}
                    onSubmit={handleSubmit}
                    loading={loading}
                  />
                </div>

                {/* Right Column - Benefits (Desktop Only) */}
                <div className="order-1 lg:order-2 hidden lg:block">
                  <PlatformBenefits />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Trust Signals */}
          <div className="lg:hidden p-6">
            <TrustSignals />
          </div>

          {/* Footer */}
          <footer className="p-6 border-t border-border bg-card/50">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} className="text-success" />
                    <span className="font-caption text-xs text-muted-foreground">SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Award" size={16} className="text-primary" />
                    <span className="font-caption text-xs text-muted-foreground">YRC Certified</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <button className="hover:text-foreground transition-colors duration-200">
                    Privacy Policy
                  </button>
                  <button className="hover:text-foreground transition-colors duration-200">
                    Terms of Service
                  </button>
                  <span>© {new Date()?.getFullYear()} YRC Bridge</span>
                </div>
              </div>
            </div>
          </footer>
        </div>

        {/* Desktop Sidebar - Trust Signals */}
        <div className="hidden xl:block w-80 bg-muted/30 border-l border-border">
          <div className="sticky top-0 h-screen overflow-y-auto p-8">
            <TrustSignals />
          </div>
        </div>
      </div>
      {/* Background Decorative Elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default LoginRegister;
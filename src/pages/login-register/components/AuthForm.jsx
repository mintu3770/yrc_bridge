import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'donor'
  });
  const [formError, setFormError] = useState('');
  
  const { signIn, signUp, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setFormError('');

    try {
      if (isSignUp) {
        await signUp(formData?.email, formData?.password, {
          fullName: formData?.fullName,
          role: formData?.role
        });
        setFormError('Registration successful! Please check your email to verify your account.');
      } else {
        await signIn(formData?.email, formData?.password);
        // Navigate based on user role
        switch (formData?.role) {
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
      }
    } catch (err) {
      setFormError(err?.message || 'Authentication failed');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e?.target?.name]: e?.target?.value
    });
  };

  const roleOptions = [
    { value: 'donor', label: 'Donor' },
    { value: 'patient', label: 'Patient' },
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'admin', label: 'YRC Board Member' }
  ];

  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {isSignUp ? 'Join YRC Bridge' : 'Sign In to YRC Bridge'}
      </h2>
      {(error || formError) && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error || formError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              value={formData?.fullName}
              onChange={handleInputChange}
              required={isSignUp}
              placeholder="Enter your full name"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            required
            placeholder="Enter your password"
            minLength={6}
          />
        </div>

        {isSignUp && (
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              I am a...
            </label>
            <Select
              value={formData?.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              {roleOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </Select>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          disabled={loading}
        >
          {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Admin:</strong> admin@yrc.org / admin123</p>
          <p><strong>Donor:</strong> donor@example.com / donor123</p>
          <p><strong>Patient:</strong> patient@example.com / patient123</p>
          <p><strong>Volunteer:</strong> volunteer@example.com / volunteer123</p>
        </div>
      </div>
    </div>
  );
}
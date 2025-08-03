import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import DonorDashboard from './pages/donor-dashboard';
import PatientDashboard from './pages/patient-dashboard';
import LoginRegister from './pages/login-register';
import VolunteerDashboard from './pages/volunteer-dashboard';
import VolunteerDirectory from './pages/volunteer-directory';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/volunteer-directory" element={<VolunteerDirectory />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

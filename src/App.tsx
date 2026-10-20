import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { EnquiriesPage } from './pages/EnquiriesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProfilePage } from './pages/ProfilePage';
import { PricingPage } from './pages/PricingPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Public site layout wrapper with Navbar & Footer
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('clientflow_font_theme');
      if (saved === 'outfit') {
        document.documentElement.style.setProperty('--app-font-family', "'Outfit', system-ui, sans-serif");
      } else if (saved === 'dm_sans') {
        document.documentElement.style.setProperty('--app-font-family', "'DM Sans', system-ui, sans-serif");
      } else {
        document.documentElement.style.setProperty('--app-font-family', "'Plus Jakarta Sans', system-ui, sans-serif");
      }
    } catch {
      // ignore in environments with disabled localStorage
    }
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/profile/:slug" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Designer Studio Dashboard (Nested Routes) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="enquiries" element={<EnquiriesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Direct Top-Level Routes (Master Prompt Specification) */}
          <Route element={<DashboardLayout />}>
            <Route path="/enquiries" element={<EnquiriesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route element={<PublicLayout />}>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

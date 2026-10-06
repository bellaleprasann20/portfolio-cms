import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout & Security
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Experience from './pages/Experience';
import Testimonials from './pages/Testimonials';
import Services from './pages/Services';
import Media from './pages/Media';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected CMS Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* The 'index' route loads at exactly '/' inside the layout */}
        <Route index element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="skills" element={<Skills />} />
        <Route path="projects" element={<Projects />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="experience" element={<Experience />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="services" element={<Services />} />
        <Route path="media" element={<Media />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
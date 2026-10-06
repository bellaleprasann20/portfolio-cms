import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      
      {/* 
        pt-16 compensates for a fixed navbar. 
        flex-grow ensures the main content pushes the footer to the bottom of the screen.
      */}
      <main className="flex-grow w-full pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
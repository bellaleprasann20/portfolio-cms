import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import Reveal from '../components/common/Reveal';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-white">
      <SEO title="404 - Page Not Found" />
      <Reveal direction="up">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Page not found</h2>
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
          Sorry, I couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link to="/">
          <Button size="lg">Return to Homepage</Button>
        </Link>
      </Reveal>
    </div>
  );
};

export default NotFound;
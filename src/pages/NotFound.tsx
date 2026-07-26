import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl text-accent font-heading">404</h1>
      <p className="text-text-muted mt-4">This path does not exist in the digital world.</p>
      <Link to="/" className="mt-8 px-6 py-2 bg-primary rounded-md text-text hover:bg-accent transition-colors">
        Return to Journey
      </Link>
    </div>
  );
};
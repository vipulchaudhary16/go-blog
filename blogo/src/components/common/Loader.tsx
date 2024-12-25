import React from 'react';

interface LoadingProps {
  text?: string;
}

const Loader: React.FC<LoadingProps> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-800">{text}</p>
    </div>
  );
};

export default Loader;

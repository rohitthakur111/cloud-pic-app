import React from 'react';

const ErrorMessage = ({ error }) => {
  if (!error) return null; // Do not render anything if no error message is provided

  return (
    <div className="mt-4">
      {/* Error Message Box */}
      <div className="bg-red-100 text-red-700 border-l-4 border-red-500 p-4 flex items-start space-x-3">
        <svg
          className="w-5 h-5 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z"
          />
        </svg>
        <div className="flex-1">
          <strong>Error:</strong> {error}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

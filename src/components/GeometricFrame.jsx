import React from 'react';

export default function GeometricFrame({ className = '', position = 'all' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {(position === 'all' || position === 'top-left') && (
        <svg
          className="absolute -top-6 -left-6 w-36 h-36 md:w-56 md:h-56 text-[#F5A623] opacity-30 md:opacity-40 animate-pulse"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 180 L20 40 L160 20"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {(position === 'all' || position === 'bottom-right') && (
        <svg
          className="absolute -bottom-6 -right-6 w-36 h-36 md:w-56 md:h-56 text-[#F5A623] opacity-30 md:opacity-40"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M180 20 L180 160 L40 180"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

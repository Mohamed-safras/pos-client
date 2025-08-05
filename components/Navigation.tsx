import React from "react";

const Navigation: React.FC = () => {
  return (
    <nav className="sticky top-0 z-10 bg-gray-800 text-white shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              <i className="fas fa-cash-register mr-2"></i>
              POS System
            </h1>
          </div>
          <div className="text-sm text-gray-300">
            Point of Sale Management System
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

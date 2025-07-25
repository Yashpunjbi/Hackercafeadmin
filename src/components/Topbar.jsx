import React from "react";

const Topbar = () => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md px-4 sm:px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white tracking-wide">
        Admin Panel
      </h2>
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          👨‍🍳 Admin
        </span>
        {/* Future logout button ya avatar yahan add ho sakta hai */}
      </div>
    </div>
  );
};

export default Topbar;
'use client';

import { ThemeContext } from '@/context/ThemeProvider';
import { useContext } from 'react';

const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // Hàm thay đổi theme khi nhấn vào nút
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="space-x-4">
      {/* Nút cho Light Mode */}
      <button
        onClick={() => handleThemeChange('light')}
        className="p-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
      >
        Light Mode
      </button>

      {/* Nút cho Dark Mode */}
      <button
        onClick={() => handleThemeChange('dark')}
        className="p-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
      >
        Dark Mode
      </button>

      {/* Nút cho System Mode */}
      <button
        onClick={() => handleThemeChange('system')}
        className="p-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
      >
        System Mode
      </button>

      {/* Hiển thị theme hiện tại */}
      <div className="mt-2">
        <p>Current theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</p>
      </div>
    </div>
  );
};

export default ToggleTheme;

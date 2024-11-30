"use client";
import { useTheme } from "next-themes";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md"
    >
      {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;

export default function ProfileSideBarSkeleton() {
  return (
    <div className="sm:pb-[200px] pb-[100px] bg-white dark:bg-dark-400 shadow-md rounded-xl overflow-hidden dark:text-white animate-pulse">
      {/* Skeleton Avatar Cover */}
      <div className="mb-4 relative">
        <div className="h-[250px] w-full bg-gray-300 dark:bg-dark-500"></div>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-full">
          <div className="h-[100px] w-[100px] bg-gray-400 dark:bg-dark-600 rounded-full"></div>
          <div className="h-5 w-32 bg-gray-400 dark:bg-dark-600 rounded mt-5"></div>
          <div className="h-4 w-28 bg-gray-400 dark:bg-dark-600 rounded mt-2"></div>
        </div>
      </div>

      {/* Skeleton Sections */}
      {[
        { titleWidth: 'w-[70%]', items: 3 },
        { titleWidth: 'w-[80%]', items: 3 },
      ].map((section, index) => (
        <div key={index} className="mb-6 mt-7">
          <div className="flex items-center h-10">
            <div className="w-[4px] h-full bg-gray-400 dark:bg-dark-600 rounded"></div>
            <div className={`h-8 ${section.titleWidth} bg-gray-400 dark:bg-dark-600 rounded ml-2`}></div>
          </div>
          <ul className="space-y-2 px-3 mt-3">
            {Array(section.items)
              .fill(0)
              .map((_, i) => (
                <li key={i} className="flex items-center space-x-3 p-2">
                  <div className="h-5 w-5 bg-gray-400 dark:bg-dark-600 rounded-full"></div>
                  <div className="h-5 w-40 bg-gray-400 dark:bg-dark-600 rounded"></div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

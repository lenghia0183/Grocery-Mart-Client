export default function EditMeSkeleton() {
  return (
    <div className="p-6 bg-white dark:bg-dark-400 shadow-md rounded-xl animate-pulse">
      {/* Skeleton Header */}
      <div className="h-6 w-44 bg-gray-400 dark:bg-dark-600 rounded mb-4"></div>
      <hr className="border-gray-300 dark:border-dark-500 mb-6" />

      {/* Skeleton Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[{ width: 'w-36' }, { width: 'w-40' }, { width: 'w-32' }, { width: 'w-20' }].map((item, index) => (
          <div key={index} className="space-y-2">
            <div className={`h-5 ${item.width} bg-gray-400 dark:bg-dark-600 rounded`}></div>
            <div className="h-12 w-full bg-gray-300 dark:bg-dark-500 rounded"></div>
          </div>
        ))}
      </div>

      {/* Skeleton Buttons */}
      <div className="flex justify-end gap-4 ml-auto mt-6">
        <div className="h-10 w-24 bg-gray-300 dark:bg-dark-500 rounded"></div>
        <div className="h-10 w-28 bg-gray-400 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
}

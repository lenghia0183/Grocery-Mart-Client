const ManufacturerSkeleton = () => {
  return (
    <div className="animate-pulse space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-2">
          <div className="w-[30px] h-[30px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default ManufacturerSkeleton;

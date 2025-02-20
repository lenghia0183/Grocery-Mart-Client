const CategoryListSkeleton = () => {
  return (
    <div className="p-2 space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-2">
          <div className="w-[30px] h-[30px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default CategoryListSkeleton;

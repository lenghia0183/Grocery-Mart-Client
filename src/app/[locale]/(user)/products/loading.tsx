import LoadingComponent from '@/components/Loading';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-dark-500 bg-gray-600 text-dark dark:text-white-200">
      <LoadingComponent size={5} thickness="6px" color="text-yellow-500" speed=".6s" />
      <p className="mt-4 text-lg font-semibold animate-pulse">Đang tải...</p>
    </div>
  );
}

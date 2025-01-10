const Skeleton = () => {
  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-gray-50 p-5">
      {/* Skeleton for title */}
      <div className="mb-4 h-8 w-32 animate-pulse rounded-md bg-gray-200"></div>

      <div className="flex items-start space-x-3 overflow-x-auto py-3 pb-2 scrollbar-hide">
        {/* Add Story Button Skeleton */}
        <div className="flex flex-shrink-0 flex-col items-center space-y-1">
          <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full border-2 border-dashed border-gray-200">
            <div className="h-6 w-6 rounded-full bg-gray-200"></div>
          </div>
          <div className="h-3 w-12 animate-pulse rounded bg-gray-200"></div>
        </div>

        {/* Story Skeletons */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-shrink-0 flex-col items-center space-y-1"
          >
            <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200"></div>
            <div className="h-3 w-12 animate-pulse rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;

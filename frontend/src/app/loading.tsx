import { ProductCardSkeleton } from "../components/loadingSpinner";

export default function Loading() {
  return (
    <main className="p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between gap-4">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="mt-6">
          {/* Search Bar Skeleton */}
          <div className="h-12 bg-gray-200 rounded-2xl mb-4 animate-pulse"></div>
          
          {/* Filter Button Skeleton */}
          <div className="h-10 bg-gray-200 rounded-lg w-32 mb-4 animate-pulse"></div>

          {/* Products Grid Skeleton */}
          <section className="mb-14">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>

            <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(165px,1fr))]">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
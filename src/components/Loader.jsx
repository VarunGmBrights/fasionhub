// src/components/Loader.jsx
export default function Loader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-2 border-cream-300 dark:border-charcoal-light rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-gold rounded-full animate-spin" />
      </div>
    </div>
  );
}

// src/components/SkeletonCard.jsx – inline export
export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-charcoal-light overflow-hidden">
      <div className="skeleton aspect-[3/4]" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-6 w-1/3 rounded" />
      </div>
    </div>
  );
}

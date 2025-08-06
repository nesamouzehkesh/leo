import { AnimesLoadingSkeleton } from "@app/ui/animes/skeletons";

/**
 * Loading UI for /animes route
 * 
 * Note: We could have used Suspense with fallback, but chose Next.js loading.tsx
 * for simplicity and better integration with App Router patterns.
 * 
 * Benefits of loading.tsx over Suspense:
 * - Simpler code (no wrapper components)
 * - Native Next.js pattern
 * - Automatic route-level loading
 * - Better integration with App Router
 */

export default function Loading() {
  return <AnimesLoadingSkeleton />;
} 
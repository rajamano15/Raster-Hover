/**
 * Route-transition fallback.
 *
 * Without a loading boundary the router keeps the *previous* page on screen
 * until the next route's payload has fully arrived, so a nav click reads as a
 * dead click. This paints immediately instead.
 */
export default function Loading() {
  return (
    <div className="route-progress" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

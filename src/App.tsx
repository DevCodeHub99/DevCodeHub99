import { QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { queryClient } from "@/lib/queryClient";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useAnalytics } from "@/hooks/use-analytics";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import Home from "@/pages/Home";

function AppContent() {
  useAnalytics();

  return (
    <>
      <Home />
      <ConsentBanner />
      <Analytics />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchAdvocates from './search-advocates';

const queryClient = new QueryClient();

/**
 * This is a convenience wrapper so that <QueryClientProvider /> lives
 * on the client side and not in a server component.
 */
export default function ClientApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchAdvocates />
    </QueryClientProvider>
  );
}

'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from './types';
import { getFilteredAdvocates } from './apiClient';

export function useFilteredAdvocates(filter = '') {
  return useQuery({
    queryKey: [QUERY_KEYS.ADVOCATES_LIST, filter],
    queryFn: () => getFilteredAdvocates(filter),
  });
}

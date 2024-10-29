'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from './types';
import { getFilteredAdvocates } from './apiClient';

export function useFilteredAdvocates(filter = '', page: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.ADVOCATES_LIST, { filter, page }],
    queryFn: () => getFilteredAdvocates(filter, page),
    initialData: {
      data: [],
      pagination: { totalItems: 0, page: 0, totalPages: 0 },
    },
  });
}

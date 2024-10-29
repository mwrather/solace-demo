'use client';

/**
 * apiClient.ts
 *
 * This file collects logic having to do with accessing the API service;
 * in an ideal world this is created via code generation from an OpenAPI spec.
 */

import { Advocate, PaginationResponse } from './types';

const API_HOST = process.env.API_HOST || 'http://localhost:3000';

export async function getFilteredAdvocates(
  query = '',
  page = 1,
): Promise<{
  data: Advocate[];
  pagination: PaginationResponse;
}> {
  const url = new URL(`${API_HOST}/api/advocates`);
  url.searchParams.append('page', String(page));

  if (query !== '') {
    url.searchParams.append('q', query);
  }

  const response = await fetch(url);
  const { data, pagination } = await response.json();

  if (data === undefined) {
    throw new Error('Error fetching advocates from API.');
  }

  return { data, pagination };
}

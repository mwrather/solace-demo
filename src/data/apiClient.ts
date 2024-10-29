'use client';

/**
 * apiClient.ts
 *
 * This file collects logic having to do with accessing the API service;
 * in an ideal world this is created via code generation from an OpenAPI spec.
 */

import { Advocate } from './types';

export async function getFilteredAdvocates(filter = ''): Promise<Advocate[]> {
  const response = await fetch('/api/advocates');
  const { data } = await response.json();

  if (data === undefined) {
    throw new Error('Error fetching advocates from API.');
  }

  return data;
}

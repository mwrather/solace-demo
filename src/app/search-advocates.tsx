'use client';

import AdvocatesList from '@/components/AdvocateList';
import { useFilteredAdvocates } from '@/data/queries';
import { useState } from 'react';

export default function SearchAdvocates() {
  const { data, isLoading } = useFilteredAdvocates();

  return (
    <main style={{ margin: '24px' }}>
      <h1>Solace Advocates</h1>
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: '1px solid black' }} />
        <button>Reset Search</button>
      </div>
      {isLoading ? 'Loading' : <AdvocatesList advocates={data} />}
    </main>
  );
}

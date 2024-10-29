'use client';

import AdvocatesList from '@/components/AdvocateList';
import Loader from '@/components/Loader';
import { Input } from '@/components/ui/input';
import { useFilteredAdvocates } from '@/data/queries';
import { CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

export default function SearchAdvocates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounceValue(
    searchTerm,
    500,
  );
  const { data, isLoading } = useFilteredAdvocates(debouncedSearchTerm);

  useEffect(() => {
    setDebouncedSearchTerm(searchTerm);
  }, [searchTerm, setDebouncedSearchTerm]);

  const isDirty = searchTerm !== debouncedSearchTerm;

  return (
    <div className="container mx-auto">
      <div className="space-y-4 mb-4">
        <label htmlFor="q">
          Search for an advocate by name, specialty, or city.
        </label>
        <div className="relative">
          <Input
            id="q"
            className="w-full pr-16"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isDirty ? (
            <Loader className="absolute right-4 top-2 p-0" />
          ) : (
            <button
              title="Reset Search"
              className="absolute right-4 top-2"
              type="button"
              onClick={() => setSearchTerm('')}
            >
              <CircleX />
            </button>
          )}
        </div>
      </div>
      <div className="relative">
        {isLoading && <Loader className="h-48" />}
        <AdvocatesList advocates={data} />
      </div>
    </div>
  );
}

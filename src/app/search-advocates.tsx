'use client';

import AdvocatesList from '@/components/AdvocateList';
import { useFilteredAdvocates } from '@/data/queries';
import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

export default function SearchAdvocates() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounceValue(searchTerm, 500);
    const { data, isLoading } = useFilteredAdvocates(debouncedSearchTerm);

    useEffect(() => {
        setDebouncedSearchTerm(searchTerm);
    }, [searchTerm, setDebouncedSearchTerm]);

    return (
        <main style={{ margin: '24px' }}>
            <h1>Solace Advocates</h1>
            <div>
                <p>Search</p>
                <input
                    style={{ border: '1px solid black' }}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button>Reset Search</button>
            </div>
            {isLoading ? 'Loading' : <AdvocatesList advocates={data} />}
        </main>
    );
}

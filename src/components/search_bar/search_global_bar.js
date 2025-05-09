// components/search_bar/SearchBar.js
import React, { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import debounce from 'lodash.debounce';
import './search_bar.css';

const SearchBar = forwardRef(({ onResults, catalogue_id, onQueryChange }, ref) => {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        getClassName: () => inputRef.current?.className,
    }));

    const [query, setQuery] = useState('');
    const abortControllerRef = useRef(null);

    const debouncedSearch = useMemo(() =>
        debounce(async (value) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            const formData = new FormData();
            formData.append('value_to_search', value);
            formData.append('catalogue_id', catalogue_id);

            try {
                if (value) {
                    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}api/search-products`, {
                        method: 'POST',
                        body: formData,
                        signal: controller.signal,
                    });

                    const data = await response.json();
                    onResults(Array.isArray(data?.result) ? data.result : []);
                } else {
                    onResults([]);
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('API error:', error);
                }
            }
        }, 300),
        [onResults, catalogue_id]
    );

    useEffect(() => {
        return () => abortControllerRef.current?.abort();
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onQueryChange?.(value);
        debouncedSearch(value);
    };

    const clearInput = () => {
        setQuery('');
        onQueryChange?.('');
        onResults([]);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Rechercher un produit"
                className="search-input"
                value={query}
                onChange={handleChange}
                ref={inputRef}
            />
            {query && <button onClick={clearInput}>Effacer</button>}
        </div>
    );
});

export default SearchBar;

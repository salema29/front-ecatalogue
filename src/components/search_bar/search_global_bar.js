import React, { useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import "../../components/search_bar/search_bar.css"

const SearchBar = ({ onResults }) => {
    const [query, setQuery] = useState('');
    const abortControllerRef = useRef(null);

    const debouncedSearch = useMemo(
        () =>
        debounce(async (value) => {
            // Cancel previous request if any
            if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            const formData = new FormData();
            formData.append('value_to_search', value)

            try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}api/search-products`, {
                method: 'POST',
                body: formData,
                signal: controller.signal,
            });

            const data = await response.json();
            onResults(data); // Send result to parent
            } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('API error:', error);
            }
            }
        }, 300),
        [onResults]
    );

    // Cancel on unmount
    useEffect(() => {
        return () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        };
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    return (
        <div className="search-container">
            <input type="text" placeholder="Rechercher un produit" className="search-input" value={query} onChange={handleChange}/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="search-icon">
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6 .1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
            </svg>
        </div>
    );
};

export default SearchBar;

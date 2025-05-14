import React, { useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash.debounce';
import './search_bar.css';
import { useSearch } from './SearchContext';

const SearchBar = ({ catalogue_id }) => {
    const { searchQuery, setSearchQuery, setSearchResults, setLoading } = useSearch();
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
                setSearchResults(Array.isArray(data?.result) ? data.result : []);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('API error:', error);
            }
            setSearchResults([]);
        } finally {
        setLoading(false);
        }

        }, 300),
        [catalogue_id, setSearchResults]
    );

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleChange = (e) => {
        setLoading(true);
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    const clearInput = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div className={`search-container ${searchQuery ? 'has-query' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" onClick={clearInput} className="search-clear" style={{ display: searchQuery ? 'block' : 'none'}} title="Vider le champ de recherche">
                <path d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z"/>
            </svg>
            <input
                type="text"
                placeholder="Rechercher un produit"
                className="search-input"
                value={searchQuery}
                onChange={handleChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="search-icon">
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6 .1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
            </svg>
        </div>
    );
};

export default SearchBar;
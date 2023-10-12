import React, { useState, useEffect } from 'react';
import styles from '../styles/searchbar.module.css';
import axios from 'axios';

interface SearchResult {
  _id: string;
  title: string;
  // Add more properties as needed
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    }
  }, [searchTerm]);

  const handleSearch = () => {
    setLoading(true);

    axios
      .get(`/api/search?search=${searchTerm}`)
      .then((response) => {
        const data = response.data as SearchResult[];
        setSearchResults(data);
      })
      .catch((error) => {
        console.error('Error searching:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.input}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="button" className={styles.button} onClick={handleSearch}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      <ul>
        {searchResults.map((result) => (
          <li key={result._id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;

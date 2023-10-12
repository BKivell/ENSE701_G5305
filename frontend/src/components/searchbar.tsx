import React, { useState } from 'react';
import styles from '../styles/searchbar.module.css';
import axios from 'axios';

interface Props {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search articles..."
      />
    </div>
  );
};


export default SearchBar;

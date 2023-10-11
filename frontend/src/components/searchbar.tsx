// components/SearchBar.tsx
import React from 'react';
import styles from '../styles/searchbar.module.css'; // Import your CSS file

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="Search..." className={styles.input} />
      <button type="button" className={styles.button}>
        Search
      </button>
      <div className={styles.filterBox}>
        <label htmlFor="filterOption">Filter:</label>
        <select id="filterOption" className={styles.select}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>
    </div>

    
  );
};

export default SearchBar;

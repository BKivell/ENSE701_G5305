import { useState } from 'react';

import Navbar from '../components/navbar';
import testData from './testData.json';
import ArticleTable from '../components/articletable';
import SearchBar from '../components/searchbar';
import ShowUncheckedCheckbox from '../components/showunchecked';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showUnchecked, setShowUnchecked] = useState(false);
  
    let filteredArticles = testData;
  
    if (showUnchecked) {
      filteredArticles = testData.filter(article => !article.checked);
    } else {
      filteredArticles = testData.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.claim.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    return (
      <div>
        <Navbar />
        <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
        <SearchBar onSearch={setSearchTerm} />
        <ShowUncheckedCheckbox onChange={setShowUnchecked} />
        <h2>All Articles</h2>
        <ArticleTable articles={filteredArticles} />
      </div>
    );
  }



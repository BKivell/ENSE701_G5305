// index.tsx
import { useState, useEffect } from "react";

import Navbar from "../components/navbar";
import testData from "./testData.json";
import ArticleTable from "../components/articletable";
import SearchBar from "../components/searchbar";
import ColumnVisibilityToggle from "../components/columntoggle";
import styles from "../styles/moderator.module.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(testData);
  const [visibleColumns, setVisibleColumns] = useState([
    "title",
    "author",
    "date",
    "se_practice",
    "claim",
    "result_of_evidence",
    "type_of_research",
    "approved",
    "checked",
    "grade",
  ]);

  useEffect(() => {
    let filtered = testData.filter(article => article.approved && article.checked);

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.claim.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [searchTerm]);

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>SPEED Analyst View</h1>
      <hr />
      <SearchBar onSearch={setSearchTerm} />

      
      <h2 style={{ textAlign: "center" }}>Moderated Articles</h2>
      <ColumnVisibilityToggle
        columns={[
          "title",
          "author",
          "date",
          "se_practice",
          "claim",
          "result_of_evidence",
          "type_of_research",
          "approved",
          "checked",
          "grade"
        ]}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
      />
      <div className={styles.tableContainer}>
        <ArticleTable
          articles={filteredArticles}
          visibleColumns={visibleColumns}
        />
      </div>
    </div>
  );
}

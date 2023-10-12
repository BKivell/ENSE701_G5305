import { useState, useEffect } from "react";

import Navbar from "../components/navbar";
import testData from "./testData.json";
import ArticleTable from "../components/articletable";
import SearchBar from "../components/searchbar";
import ColumnVisibilityToggle from "../components/columntoggle";

import styles from "../styles/moderator.module.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUnchecked, setShowUnchecked] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState(testData);
  const [uncheckedArticles, setUncheckedArticles] = useState(
    testData.filter((article) => !article.approved)
  );
  const [showDuplicates, setShowDuplicates] = useState(false);
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
  ]); // Adding a new state to manage the visible columns

  useEffect(() => {
    let filtered = testData;

    if (showUnchecked) {
      filtered = testData.filter((article) => !article.checked);
    } else if (searchTerm) {
      filtered = testData.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.claim.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [searchTerm, showUnchecked]);

  useEffect(() => {
    let unchecked = testData.filter((article) => !article.approved);

    if (showDuplicates) {
      const approvedTitles = new Set(
        testData
          .filter((article) => article.approved)
          .map((article) => article.title.toLowerCase())
      );
      unchecked = unchecked.filter((article) =>
        approvedTitles.has(article.title.toLowerCase())
      );
    }

    setUncheckedArticles(unchecked);
  }, [showDuplicates]);

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>SPEED Analyst View</h1>
      <hr />
      <SearchBar onSearch={setSearchTerm} />
      <ColumnVisibilityToggle
        columns={[
          "Title",
          "Author",
          "Date",
          "SE Practice",
          "Claim",
          "Result of Evidence",
          "Type of Research",
          "Approved",
          "Checked",
        ]}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
      />

      {/* Adding the new component to the UI */}
      <h2 style={{ textAlign: "center" }}>Moderated Articles</h2>
      <div className={styles.tableContainer}>
        <ArticleTable
          articles={filteredArticles}
          visibleColumns={visibleColumns}
        />
      </div>
    </div>
  );
}

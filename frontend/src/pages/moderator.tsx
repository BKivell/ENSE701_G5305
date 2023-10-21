// moderator.tsx
import { useState, useEffect, SetStateAction } from "react";
import Navbar from "../components/navbar";
import ArticleTable from "../components/articletable";
import SearchBar from "../components/searchbar";
import ShowUncheckedCheckbox from "../components/showunchecked";
import ModeratorArticleTable from "../components/moderatorarticletable";
import FilterDuplicatesCheckbox from "../components/duplicatescheck";
import ColumnVisibilityToggle from "../components/columntoggle";

import styles from "../styles/moderator.module.css";

// Define the type or interface for your articles
interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  se_practice: string;
  claim: string;
  result_of_evidence: string;
  type_of_research: string;
  approved: boolean;
  checked: boolean;
  details: string;
  grade: string;
}



export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [displayArticles, setDisplayArticles] = useState<Article[]>([]);
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [showUnchecked, setShowUnchecked] = useState(false);
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


  const dotenv = require("dotenv")
  dotenv.config()
  const backendURL = process.env.NEXT_PUBLIC_BACKENDURL;
  const fetchArticlesFromServer = async () => {
    try {
      const response = await fetch(`${backendURL}/api/articles`);
      if (response.ok) {
        const data = await response.json();
        setAllArticles(data);
        setDisplayArticles(data);
        console.log("Articles fetched successfully");
      } else {
        console.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  // Runs once on component mount
  useEffect(() => {
    fetchArticlesFromServer();
  }, []);

  // Update displayArticles based on search, show duplicates, and show unchecked options
  useEffect(() => {
    let filtered = allArticles;

    if (showUnchecked) {
      filtered = allArticles.filter((article) => !article.checked);
    } else if (searchTerm) {
      filtered = allArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.claim.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (showDuplicates) {
      const approvedTitles = new Set(
        allArticles
          .filter((article) => article.approved)
          .map((article) => article.title.toLowerCase())
      );
      filtered = filtered.filter((article) =>
        approvedTitles.has(article.title.toLowerCase())
      );
    }

    setDisplayArticles(filtered);
  }, [searchTerm, showDuplicates, showUnchecked]);


  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>SPEED Moderator View</h1>

      <hr />

      <SearchBar onSearch={setSearchTerm} />


      <h2 style={{ textAlign: "center" }}>All Articles</h2>

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
        ]}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
      />
      <FilterDuplicatesCheckbox
        showDuplicates={showDuplicates}
        setShowDuplicates={setShowDuplicates}
      />
      <ShowUncheckedCheckbox onChange={setShowUnchecked} />
      <ModeratorArticleTable
        articles={displayArticles}
        visibleColumns={visibleColumns}
      />


      <div className={styles.tableContainer}>
        {displayArticles.length === 0 ? (
          <p>No articles to display</p>
        ) : (
          <p></p>
        )}
      </div>

      <hr />
    </div>
  );
}

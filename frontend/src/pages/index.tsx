// index.tsx
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import ArticleTable from "../components/articletable";
import SearchBar from "../components/searchbar";
import ColumnVisibilityToggle from "../components/columntoggle";
import styles from "../styles/moderator.module.css";

// Define the type or interface for your articles
interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  se_practice: string;
  claim: string;
  result_of_evidence: string;
  type_of_research: string;
  approved: boolean;
  checked: boolean;
  details: string; // Add the missing 'details' property
  grade: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleColumns, setVisibleColumns] = useState([
    "title",
    "author",
    "date",
    "se_practice",
    "claim",
    "result_of_evidence",
    "type_of_research",
    "grade",
  ]);

  const dotenv = require("dotenv")
  dotenv.config()

  const backendURL = process.env.NEXT_PUBLIC_BACKENDURL;

  useEffect(() => {
    // Fetch articles from your API endpoint
    fetchArticlesFromServer();
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const fetchArticlesFromServer = async () => {
    try {
      // Make an HTTP GET request to your API endpoint that returns the articles
      const response = await fetch(`${backendURL}/api/articles`); // Adjust the URL to your API
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        const approvedArticles = data.filter((article: Article) => article.approved && article.checked);
        setArticles(approvedArticles);
      } else {
        console.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }

    console.log(articles)
  };

  useEffect(() => {
    // Filter articles based on the search term
    const filtered = articles
      .filter((article) => article.approved && article.checked)
      .filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.claim.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, articles]);

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>SPEED Database</h1>
      <hr />
      <SearchBar onSearch={setSearchTerm} />

      <ColumnVisibilityToggle
        columns={[
          "title",
          "author",
          "date",
          "se_practice",
          "claim",
          "result_of_evidence",
          "type_of_research",
          "grade",
        ]}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
      />
      <div className={styles.tableContainer}>
        <ArticleTable articles={articles} visibleColumns={visibleColumns} />
      </div>


      <div className={styles.tableContainer}>
        {articles.length === 0 ? (
          <p>No articles to display</p>
        ) : (
          <p></p>
        )}
      </div>




    </div>
  );
}

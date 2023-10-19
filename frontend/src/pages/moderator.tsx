import { useState, useEffect, SetStateAction } from "react";
import Navbar from "../components/navbar";
import ArticleTable from "../components/articletable";
import SearchBar from "../components/searchbar";
import ShowUncheckedCheckbox from "../components/showunchecked";
import UncheckedArticlesTable from "../components/uncheckedarticletable";
import FilterDuplicatesCheckbox from "../components/duplicatescheck";
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
  details: string;
  grade: string;
}



export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUnchecked, setShowUnchecked] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [uncheckedArticles, setUncheckedArticles] = useState(
    articles.filter((article) => !article.approved)
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
      const response = await fetch(`${backendURL}/api/articles`);
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        console.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  
    console.log(articles)
  };


  useEffect(() => {
    let filtered = articles;

    if (showUnchecked) {
      filtered = articles.filter((article) => !article.checked);
    } else if (searchTerm) {
      filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.claim.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [searchTerm, showUnchecked]);

  useEffect(() => {
    let unchecked = articles.filter((article) => !article.approved);

    if (showDuplicates) {
      const approvedTitles = new Set(
        articles
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
      <h1 style={{ textAlign: "center" }}>SPEED Moderator View</h1>

      <hr />

      <SearchBar onSearch={setSearchTerm} />
      <ShowUncheckedCheckbox onChange={setShowUnchecked} />
      

      <h2 style={{ textAlign: "center" }}>Articles</h2>
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
      <div className={styles.tableContainer}>
        <ArticleTable
          articles={filteredArticles}
          visibleColumns={visibleColumns}
        />
      </div>

      <hr />

      <h2 style={{ textAlign: "center" }}>Unchecked Articles</h2>
      
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
        visibleColumns={visibleColumns} setVisibleColumns={function (value: SetStateAction<string[]>): void {
          throw new Error("Function not implemented.");
        } }        //setVisibleColumns={setVisibleColumnsUnchecked}
      />
      <FilterDuplicatesCheckbox
        showDuplicates={showDuplicates}
        setShowDuplicates={setShowDuplicates}
      />
      <UncheckedArticlesTable 
          articles={uncheckedArticles} 
          visibleColumns={visibleColumns}
      />
    </div>
  );
}

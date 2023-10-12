import React, { useState } from "react";
import styles from "../styles/articletable.module.css";

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
}

interface Props {
  articles: Article[];
  visibleColumns: string[];
}

interface SortConfig {
  key: keyof Article;
  direction: "ascending" | "descending";
}

const ArticleTable: React.FC<Props> = ({ articles, visibleColumns }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedArticles = [
    ...articles.filter((article) => article.checked && article.approved),
  ];

  if (sortConfig !== null) {
    sortedArticles.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key: keyof Article) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  return (
    <table className={styles.articleTable}>
      <thead>
        <tr>
          {visibleColumns.includes("title") && (
            <th onClick={() => requestSort("title")}>Title</th>
          )}
          {visibleColumns.includes("author") && (
            <th onClick={() => requestSort("author")}>Author</th>
          )}
          {visibleColumns.includes("date") && (
            <th onClick={() => requestSort("date")}>Date</th>
          )}
          {visibleColumns.includes("se_practice") && (
            <th onClick={() => requestSort("se_practice")}>SE Practice</th>
          )}
          {visibleColumns.includes("claim") && (
            <th onClick={() => requestSort("claim")}>Claim</th>
          )}
          {visibleColumns.includes("result_of_evidence") && (
            <th onClick={() => requestSort("result_of_evidence")}>
              Result of Evidence
            </th>
          )}
          {visibleColumns.includes("type_of_research") && (
            <th onClick={() => requestSort("type_of_research")}>
              Type of Research
            </th>
          )}
          {visibleColumns.includes("approved") && (
            <th onClick={() => requestSort("approved")}>Approved</th>
          )}
          {visibleColumns.includes("checked") && (
            <th onClick={() => requestSort("checked")}>Checked</th>
          )}
        </tr>
      </thead>
      <tbody>
        {sortedArticles.map((article) => (
          <tr key={article.id}>
            {visibleColumns.includes("title") && <td>{article.title}</td>}
            {visibleColumns.includes("author") && <td>{article.author}</td>}
            {visibleColumns.includes("date") && <td>{article.date}</td>}
            {visibleColumns.includes("se_practice") && (
              <td>{article.se_practice}</td>
            )}
            {visibleColumns.includes("claim") && <td>{article.claim}</td>}
            {visibleColumns.includes("result_of_evidence") && (
              <td>{article.result_of_evidence}</td>
            )}
            {visibleColumns.includes("type_of_research") && (
              <td>{article.type_of_research}</td>
            )}
            {visibleColumns.includes("approved") && (
              <td>{article.approved ? "Yes" : "No"}</td>
            )}
            {visibleColumns.includes("checked") && (
              <td>{article.checked ? "Yes" : "No"}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArticleTable;

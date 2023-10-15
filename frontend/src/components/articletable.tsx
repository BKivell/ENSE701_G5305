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
  details: string;
}

interface Props {
  articles: Article[];
  visibleColumns: string[];
}

const ArticleTable: React.FC<Props> = ({ articles, visibleColumns }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  const viewArticle = (article: Article) => {
    setCurrentArticle(article);
    setIsViewModalOpen(true);
  };

  return (
    <div>
      {isViewModalOpen && currentArticle && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{currentArticle.title}</h2>
            <p><strong>Author:</strong> {currentArticle.author}</p>
            <p><strong>Date:</strong> {currentArticle.date}</p>
            <p><strong>SE Practice:</strong> {currentArticle.se_practice}</p>
            <p><strong>Claim:</strong> {currentArticle.claim}</p>
            <p><strong>Result of Evidence:</strong> {currentArticle.result_of_evidence}</p>
            <p><strong>Type of Research:</strong> {currentArticle.type_of_research}</p>
            <p><strong>Details:</strong> {currentArticle.details}</p>
            <button onClick={() => setIsViewModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <table className={styles.articleTable}>
        <thead>
          <tr>
            {visibleColumns.includes("title") && <th>Title</th>}
            {visibleColumns.includes("author") && <th>Author</th>}
            {visibleColumns.includes("date") && <th>Date</th>}
            {visibleColumns.includes("se_practice") && <th>SE Practice</th>}
            {visibleColumns.includes("claim") && <th>Claim</th>}
            {visibleColumns.includes("result_of_evidence") && <th>Result of Evidence</th>}
            {visibleColumns.includes("type_of_research") && <th>Type of Research</th>}
            {visibleColumns.includes("approved") && <th>Approved</th>}
            {visibleColumns.includes("checked") && <th>Checked</th>}
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id}>
              {visibleColumns.includes("title") && <td>{article.title}</td>}
              {visibleColumns.includes("author") && <td>{article.author}</td>}
              {visibleColumns.includes("date") && <td>{article.date}</td>}
              {visibleColumns.includes("se_practice") && <td>{article.se_practice}</td>}
              {visibleColumns.includes("claim") && <td>{article.claim}</td>}
              {visibleColumns.includes("result_of_evidence") && <td>{article.result_of_evidence}</td>}
              {visibleColumns.includes("type_of_research") && <td>{article.type_of_research}</td>}
              {visibleColumns.includes("approved") && <td>{article.approved ? "Yes" : "No"}</td>}
              {visibleColumns.includes("checked") && <td>{article.checked ? "Yes" : "No"}</td>}
              <td>
                <button onClick={() => viewArticle(article)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;

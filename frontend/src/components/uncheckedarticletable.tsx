import React, { useState } from 'react';
import styles from '../styles/articletable.module.css';

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

interface Props {
  articles: Article[];
  visibleColumns: string[];
}

const UncheckedArticlesTable: React.FC<Props> = ({ articles, visibleColumns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  const uncheckedArticles = articles.filter(article => !article.checked && !article.approved);

  const openModal = (article: Article) => {
    setCurrentArticle(article);
    setIsModalOpen(true);
  };

  const approveArticle = () => {
    if (currentArticle) {
      currentArticle.approved = true;
      currentArticle.checked = true;
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      {isModalOpen && currentArticle && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button onClick={() => setIsModalOpen(false)} className={styles.closeButton}>Close</button>
            <h3>Article Details</h3>
            <p><strong>Title:</strong> {currentArticle.title}</p>
            <p><strong>Author:</strong> {currentArticle.author}</p>
            <p><strong>Date:</strong> {currentArticle.date}</p>
            <p><strong>SE Practice:</strong> {currentArticle.se_practice}</p>
            <p><strong>Claim:</strong> {currentArticle.claim}</p>
            <p><strong>Result of Evidence:</strong> {currentArticle.result_of_evidence}</p>
            <p><strong>Type of Research:</strong> {currentArticle.type_of_research}</p>
            <p><strong>Details:</strong> {currentArticle.details}</p>

            <p>Do you want to approve this article?</p>
            <button onClick={approveArticle}>Yes</button>
            <button onClick={() => setIsModalOpen(false)}>No</button>
          </div>
        </div>
      )}

      <table className={styles.articleTable}>
        <thead>
          <tr>
            {visibleColumns.includes('title') && <th>Title</th>}
            {visibleColumns.includes('author') && <th>Author</th>}
            {visibleColumns.includes('date') && <th>Date</th>}
            {visibleColumns.includes('se_practice') && <th>SE Practice</th>}
            {visibleColumns.includes('claim') && <th>Claim</th>}
            {visibleColumns.includes('result_of_evidence') && <th>Result of Evidence</th>}
            {visibleColumns.includes('type_of_research') && <th>Type of Research</th>}
            {visibleColumns.includes('approved') && <th>Approved</th>}
            {visibleColumns.includes('checked') && <th>Checked</th>}
            <th>Check</th>
          </tr>
        </thead>
        <tbody>
          {uncheckedArticles.map(article => (
            <tr key={article.id}>
              {visibleColumns.includes('title') && <td>{article.title}</td>}
              {visibleColumns.includes('author') && <td>{article.author}</td>}
              {visibleColumns.includes('date') && <td>{article.date}</td>}
              {visibleColumns.includes('se_practice') && <td>{article.se_practice}</td>}
              {visibleColumns.includes('claim') && <td>{article.claim}</td>}
              {visibleColumns.includes('result_of_evidence') && <td>{article.result_of_evidence}</td>}
              {visibleColumns.includes('type_of_research') && <td>{article.type_of_research}</td>}
              {visibleColumns.includes('approved') && <td>{article.approved ? 'Yes' : 'No'}</td>}
              {visibleColumns.includes('checked') && <td>{article.checked ? 'Yes' : 'No'}</td>}
              <td>
                <button onClick={() => openModal(article)}>Check</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UncheckedArticlesTable;

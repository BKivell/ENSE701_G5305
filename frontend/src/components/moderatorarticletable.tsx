// moderatorarticletable.tsx
import React, { useState } from 'react';
import styles from '../styles/articletable.module.css';

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

interface Props {
  articles: Article[];
  visibleColumns: string[];
}

const ModeratorArticleTable: React.FC<Props> = ({ articles, visibleColumns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const uncheckedArticles = articles.filter(article => !article.checked && !article.approved);

  const dotenv = require("dotenv")
  dotenv.config()
  const backendURL = process.env.NEXT_PUBLIC_BACKENDURL;

  const openModal = (article: Article) => {
    setCurrentArticle(article);
    setIsModalOpen(true);
  };

  const viewArticle = (article: Article) => {
    setCurrentArticle(article);
    setIsViewModalOpen(true);
  };

  const approveArticle = async () => {
    if (currentArticle) {
      try {
        // Make an API request to update the article's approval status
        const response = await fetch(`${backendURL}/api/articles/${currentArticle.id}`, {
          method: 'PUT',
        });

        console.log(response)

        if (response.ok) {
          console.log('Article approved successfully');
          // Update the local state to reflect the changes
          setIsModalOpen(false);
        } else {
          console.error('Failed to approve the article');
        }
      } catch (error) {
        console.error('Error approving article:', error);
      }
    }
  };



  // moderatorarticletable.tsx
  const deleteArticle = async (articleId: string, articleTitle: string) => {
    try {
      if (articleId) {
        // If the article has an ID, make an API request to delete it using the articleId
        const response = await fetch(`${backendURL}/api/articles/${articleId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log(response) 
          console.log('Article deleted successfully');

        } else {
          console.error('Failed to delete the article');
        }
      } else {
        // If the article doesn't have an ID, you can delete it by title
        // Make an API request to delete the article by title
        const response = await fetch(`${backendURL}/api/articles/bytitle/${encodeURIComponent(articleTitle)}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Article deleted successfully');
        } else {
          console.error('Failed to delete the article');
        }
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }

    location.reload(); // Refresh page to allow the table to update
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
            <p><strong>Grade:</strong>{currentArticle.grade}</p>
            <button onClick={() => setIsViewModalOpen(false)}>Close</button>
          </div>
        </div>
      )}


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
            <th>ID</th>
            {visibleColumns.includes('title') && <th>Title</th>}
            {visibleColumns.includes('author') && <th>Author</th>}
            {visibleColumns.includes('date') && <th>Date</th>}
            {visibleColumns.includes('se_practice') && <th>SE Practice</th>}
            {visibleColumns.includes('claim') && <th>Claim</th>}
            {visibleColumns.includes('result_of_evidence') && <th>Result of Evidence</th>}
            {visibleColumns.includes('type_of_research') && <th>Type of Research</th>}
            {visibleColumns.includes('approved') && <th>Approved</th>}
            {visibleColumns.includes('checked') && <th>Checked</th>}
            <th>Details</th>
            <th>Check</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {uncheckedArticles.map(article => (
            <tr key={article.id}>
              <td>{article.id}</td>
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
                <button onClick={() => viewArticle(article)}>View</button>
              </td>
              <td>
                <button onClick={() => openModal(article)}>Check</button>
              </td>
              <td>
                <button onClick={() => deleteArticle(article.id, article.title)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModeratorArticleTable;

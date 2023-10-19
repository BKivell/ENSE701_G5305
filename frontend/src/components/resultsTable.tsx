// components/resultsTable.tsx
/*
import React, { useState } from "react";
import AdminEditWindow from './adminEditWindow';
import styles from '../styles/resultsTable.module.css';
import RatingPopup from './ratingPopup'; // Import the new RatingPopup component

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
  grade: string; // Add a "Grade" property.
}

const ResultsTable = () => {
  const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);
  const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false); // New state for the rating popup
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const data: Article[] = [
    {
      id: 1,
      title: 'Article 1',
      author: 'Author 1',
      date: '2023',
      claim: 'Claim 1',
      evidence: 'Evidence 1',
      grade: 'A', // Initialize the grade (you can use 'A' as a default).
    },
    {
      id: 2,
      title: 'Article 2',
      author: 'Author 2',
      year: 2022,
      claim: 'Claim 2',
      evidence: 'Evidence 2',
      grade: 'B',
    },
    // Add more data rows as needed
  ];

  const handleEditClick = (article: Article) => {
    setSelectedArticle(article);
    setIsEditWindowOpen(true);
  };

  const handleAddRatingClick = (article: Article) => {
    setSelectedArticle(article);
    setIsRatingPopupOpen(true); // Open the rating popup
  };

  const placeholderArticle: Article = {
    id: 0, // You should give a unique ID to the placeholder article.
    title: '',
    author: '',
    year: 0,
    claim: '',
    evidence: '',
    grade: 'A', // Set a default grade for the placeholder.
  };

  return (
    <section className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>Title</th>
            <th className={styles.header}>Author</th>
            <th className={styles.header}>Year</th>
            <th className={styles.header}>Claim</th>
            <th className={styles.header}>Evidence</th>
            <th className={styles.header}>Grade</th>
            <th className={styles.header}>Add Rating</th>
            <th className={styles.header}>Details</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((article, index) => (
            <tr key={article.id} className={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              <td className={styles.column}>{article.title}</td>
              <td className={styles.column}>{article.author}</td>
              <td className={styles.column}>{article.year}</td>
              <td className={styles.column}>{article.claim}</td>
              <td className={styles.column}>{article.evidence}</td>
              <td className={styles.column}>
                {article.grade}
              </td>
              <td className={styles.column}>
                <button onClick={() => handleAddRatingClick(article)} className={styles.editButton}>
                  Add Rating
                </button>
              </td>
              <td className={styles.detailsCol}>
                <button onClick={() => handleEditClick(article)} className={styles.editButton}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditWindowOpen && (
        <div className={styles.modalOverlay}>
          <AdminEditWindow
            onClose={() => setIsEditWindowOpen(false)}
            article={selectedArticle || placeholderArticle}
          />
        </div>
      )}
      {isRatingPopupOpen && (
        <div className={styles.modalOverlay}>
          <RatingPopup
            onClose={() => setIsRatingPopupOpen(false)}
            article={selectedArticle || placeholderArticle}
          />
        </div>
      )}
    </section>
  );
};

export default ResultsTable;*/

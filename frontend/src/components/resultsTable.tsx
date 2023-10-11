// components/ResultsTable.tsx
import React, { useState } from 'react';
import AdminEditWindow from './adminEditWindow'; // Import your edit window/modal component
import styles from '../styles/resultsTable.module.css'; // Import your CSS file

interface Article {
  title: string;
  content: string;
}

const ResultsTable = () => {
  const [isEditWindowOpen, setIsEditWindowOpen] = useState(false); // State to control the visibility of the edit window

  const data = [
    {
      _id: 1,
      title: 'Article 1',
      author: 'Author 1',
      year: 2023,
      claim: 'Claim 1',
      evidence: 'Evidence 1',
    },
    {
      _id: 2,
      title: 'Article 2',
      author: 'Author 2',
      year: 2022,
      claim: 'Claim 2',
      evidence: 'Evidence 2',
    },
    // Add more data rows as needed
  ];

  const handleEditClick = (articleId: number) => {
    // Show the AdminEditWindow by setting isEditWindowOpen to true
    setIsEditWindowOpen(true);
  };

  // Placeholder Article with default values
  const placeholderArticle: Article = {
    title: '',
    content: '',
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
            <th className={styles.header}>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id} className={row._id % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              <td className={styles.column}>{row.title}</td>
              <td className={styles.column}>{row.author}</td>
              <td className={styles.column}>{row.year}</td>
              <td className={styles.column}>{row.claim}</td>
              <td className={styles.column}>{row.evidence}</td>
              <td className={styles.detailsCol}>
                <button onClick={() => handleEditClick(row._id)} className={styles.editButton}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditWindowOpen && <AdminEditWindow onClose={() => setIsEditWindowOpen(false)} article={placeholderArticle} />}
    </section>
  );
};

export default ResultsTable;

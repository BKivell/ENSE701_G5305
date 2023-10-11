import React from 'react';
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
}

interface Props {
  articles: Article[];
}

const ArticleTable: React.FC<Props> = ({ articles }) => {
  return (
    <table className={styles.articleTable}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
          <th>SE Practice</th>
          <th>Claim</th>
          <th>Result of Evidence</th>
          <th>Type of Research</th>
          <th>Approved</th>
          <th>Checked</th>
        </tr>
      </thead>
      <tbody>
        {articles.map(article => (
          <tr key={article.id}>
            <td>{article.title}</td>
            <td>{article.author}</td>
            <td>{article.date}</td>
            <td>{article.se_practice}</td>
            <td>{article.claim}</td>
            <td>{article.result_of_evidence}</td>
            <td>{article.type_of_research}</td>
            <td>{article.approved ? 'Yes' : 'No'}</td>
            <td>{article.checked ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArticleTable;

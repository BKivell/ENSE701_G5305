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
  visibleColumns: string[]; // Add this line
}

const UncheckedArticlesTable: React.FC<Props> = ({ articles, visibleColumns }) => {
  const uncheckedArticles = articles.filter(article => !article.checked && !article.approved);

  return (
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UncheckedArticlesTable;

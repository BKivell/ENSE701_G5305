import Navbar from '../components/navbar';
import testData from './testData.json';
import ArticleTable from '../components/articletable'; // Adjust the import path as needed

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
      <h2>All Articles</h2>
      <ArticleTable articles={testData} />
    </div>
  );
}



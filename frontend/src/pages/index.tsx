// pages/index.tsx
import SearchBar from '@/components/searchbar';
import Navbar from '../components/navbar';
import ResultsTable from '../components/resultsTable';

const Home = () => {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <ResultsTable />
    </div>
  );
};

export default Home;

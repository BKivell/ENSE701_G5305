// pages/index.tsx
import SearchBar from '../components/searchbar';
import Navbar from '../components/navbar';
import ResultsTable from '../components/resultsTable';

const Home = () => {
  return (
    <div>
      <Navbar />
      <SearchBar onSearch={function (searchTerm: string): void {
        throw new Error('Function not implemented.');
      } } />
      <ResultsTable />
    </div>
  );
};

export default Home;

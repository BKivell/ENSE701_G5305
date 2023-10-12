// components/navbar.tsx
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import axios from 'axios';

const Navbar = () => {
  const addDummyData = () => {
    // Make a POST request to add dummy data
    axios.post('http://localhost:5000/api/add-dummy-data')
      .then((response) => {
        console.log(response.data.message); // Dummy data added successfully
      })
      .catch((error) => {
        console.error('Error adding dummy data:', error);
      });
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <h1>SPEED Database</h1>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/login">Login / Sign Up</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/moderator">Moderator</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/analyst">Analyst</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/operationalPreferences">Operational Preferences</Link>
          </li>
          <li className={styles.navItem}>
            <button onClick={addDummyData}>Add Dummy Data</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;


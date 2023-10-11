// components/navbar.tsx
import Link from 'next/link';
import styles from '../styles/navbar.module.css';

const Navbar = () => {
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
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

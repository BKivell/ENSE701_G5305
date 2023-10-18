// components/navbar.tsx
import Link from 'next/link';
import styles from '../styles/navbar.module.css';
import axios from 'axios';
import { Route } from 'next';

const Navbar = () => {

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
      <li className={styles.navItem}>
            <Link href="/">SPEED DATABASE</Link>
          </li>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/moderator">Moderator</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/operationalPreferences">Admin Operational Preferences</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/submit">Submit Article</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/login">Login / Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

/*
<Route path="/react-page" component={MyReactComponent} /> (for React to HTML)
<a href="/traditional-html-page.html">Go to HTML Page</a> (and for HTML to React)*/
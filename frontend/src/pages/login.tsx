import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/login.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      // Handle the success response here (e.g., set user data, redirect, etc.)
      console.log('Login successful:', response.data);
    } catch (error) {
      // Handle the error response here (e.g., show an error message)
      console.error('Login failed:', error);
    }
  };

  const handleRegisterClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      // Handle the success response here (e.g., set user data, redirect, etc.)
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Handle the error response here (e.g., show an error message)
      console.error('Registration failed:', error);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button onClick={isLogin ? handleLoginClick : handleRegisterClick} className={styles.button}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className={styles.toggleText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <a href="#" onClick={() => setIsLogin(!isLogin)} className={styles.toggleButton}>
            {isLogin ? ' Sign up' : ' Login'}
          </a>
        </p>
        <button onClick={handleBackToHome} className={styles.button}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

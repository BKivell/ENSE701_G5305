"use client";
import React, { useState } from 'react';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [articleData, setArticleData] = useState({
    title: '',
    content: '',
    status: 'pending', // Default status
  });

  // Function to handle admin login
  const handleAdminLogin = () => {
    if (username === adminUser.username && password === adminUser.password) {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  // Define admin user object
  const adminUser = {
    username: 'admin',
    password: 'password',
  };

  // Function to handle bypass login for development
  const handleBypassLogin = () => {
    setLoggedIn(true);
  };

  const handleArticleSubmit = (e : any) => {
    e.preventDefault();
    // implement the logic to update the article in the database
    // Example: send a PUT request to your API with the updated article data
    alert('Article updated successfully!');
  };

  // Render admin login form if not logged in
  if (!loggedIn) {
    return (
      <div className="admin dashboard">
        <div className="form-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminLogin}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="form-button">
                Login
              </button>
              <button
                type="button"
                onClick={handleBypassLogin}
                className="form-button bypass-button"
              >
                Bypass Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Render the article edit form if logged in
  if (loggedIn) {
    return (
      <div className="admin-dashboard">
        <div className="form-container">
          <h2>Admin Dashboard</h2>
          <form onSubmit={handleArticleSubmit} className="article-form">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="articleTitle"
                value={articleData.title}
                onChange={(e) =>
                  setArticleData({ ...articleData, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <textarea
                name="articleContent"
                value={articleData.content}
                onChange={(e) =>
                  setArticleData({ ...articleData, content: e.target.value })
                }
              ></textarea>
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                name="articleStatus"
                value={articleData.status}
                onChange={(e) =>
                  setArticleData({ ...articleData, status: e.target.value })
                }
              >
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    );
  }
};

export default AdminDashboard;



// NOT DONE YET

// 1. As an Administrator, I'd like to have the ability to modify data in SPEED to ensure its accuracy and integrity.
// Functionality:
// Implement a login system for administrators to authenticate themselves.
// Provide an interface in the AdminDashboard component for modifying data in the SPEED database. This interface may include features such as editing article information, marking articles as accepted or rejected, and updating article details.


// 2. As an Administrator, I'd like to adjust SPEED's operational preferences based on ongoing needs and feedback.
// Functionality:
// Create a form or settings panel in the AdminDashboard component where administrators can configure operational preferences. These preferences may include things like notification settings, moderation rules, or data retrieval options.


// 3. As a User, I'd like to grade articles on their significance and caliber to assist other users in their research.
// Functionality:
// In the ArticleRating component, allow users to give a rating (e.g., 1-5 stars) to articles.
// Store these ratings in the database along with user IDs to keep track of who rated which articles.
// Calculate the average rating for each article and display it in the Article component.


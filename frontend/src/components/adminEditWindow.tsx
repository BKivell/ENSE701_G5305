// components/adminEditWindow.tsx
import React, { useState } from "react";
import styles from "../styles/adminDashboard.module.css"; // Import your CSS file

interface AdminEditWindowProps {
  onClose: () => void;
  article: Article;
}

interface Article {
  title: string;
  author: string;
  year: number;
  claim: string;
  evidence: string;
  grade: string;
}

const AdminEditWindow: React.FC<AdminEditWindowProps> = ({ article, onClose }) => {
  const [editedArticle, setEditedArticle] = useState<Article>(article);

  const handleFieldChange = (field: string, value: string | number) => {
    setEditedArticle({ ...editedArticle, [field]: value });
  };

  const handlePopupSave = () => {

    onClose();
  };

  return (
<div className={styles.adminEditWindow}> {/* Apply the CSS class for the admin edit window */}
      <div className={styles.modalContent}> {/* Apply the CSS class for the content */}
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h3 className={styles.windowTitle}>Edit Article</h3>
        <form className="mt-6">
          <div className="mb-6">
            <label htmlFor="title" className="text-sm font-medium">Title:</label>
            <input
              type="text"
              id="title"
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-lg font-semibold"
              value={editedArticle.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="author" className="text-sm font-medium">Author:</label>
            <input
              type="text"
              id="author"
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-lg font-semibold"
              value={editedArticle.author}
              onChange={(e) => handleFieldChange("author", e.target.value)}
            />
          </div>
          <div className="mb-12">
            <label htmlFor="year" className="text-sm font-medium">Year:</label>
            <input
              type="number"
              id="year"
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-lg font-semibold"
              value={editedArticle.year}
              onChange={(e) => handleFieldChange("year", Number(e.target.value))}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="claim" className="text-sm font-medium">Claim:</label>
            <input
              type="text"
              id="claim"
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-lg font-semibold"
              value={editedArticle.claim}
              onChange={(e) => handleFieldChange("claim", e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="evidence" className="text-sm font-medium">Evidence:</label>
            <input
              type="text"
              id="evidence"
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-lg font-semibold"
              value={editedArticle.evidence}
              onChange={(e) => handleFieldChange("evidence", e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="grade" className="text-sm font-medium">Grade:</label>
            <select
              id="grade"
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-lg"
              value={editedArticle.grade}
              onChange={(e) => handleFieldChange("grade", e.target.value)}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePopupSave}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditWindow;

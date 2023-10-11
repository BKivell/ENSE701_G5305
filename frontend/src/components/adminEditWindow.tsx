import React, { useState } from "react";

interface AdminEditWindowProps {
  onClose: () => void;
  article: Article;
}

interface Article {
  title: string;
  content: string;
}

const AdminEditWindow: React.FC<AdminEditWindowProps> = ({ article, onClose }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("A"); // Default grade

  const handlePopupClose = () => {
    setShowPopup(false);
    onClose(); // Call the onClose function when the popup is closed
  };

  const handlePopupSave = () => {
    // Here, you can save the selected grade (selectedGrade) along with the article data.
    // You can send an API request or perform any necessary action to save the data.

    // For demonstration purposes, we'll log the selected grade to the console.
    console.log("Selected Grade:", selectedGrade);

    // Close the popup
    handlePopupClose();
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGrade(e.target.value);
  };

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div className="popup">
        <div className="popup-content">
          <h3>Edit Article</h3>
          <form>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" defaultValue={article.title} />
            <label htmlFor="content">Content:</label>
            <textarea id="content" defaultValue={article.content} />
            <label htmlFor="grade">Grade:</label>
            <select id="grade" value={selectedGrade} onChange={handleGradeChange}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
            <button type="submit" onClick={handlePopupSave}>
              Save
            </button>
            <button type="button" onClick={handlePopupClose}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditWindow;

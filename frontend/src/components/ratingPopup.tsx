import React, { useState } from "react";
import styles from '../styles/ratingPopup.module.css'; // Replace with your own styles import

interface Article {
    id: number;
    title: string;
    author: string;
    year: number;
    claim: string;
    evidence: string;
    grade: string; // Add a "Grade" property.
    content?: string;
  }

interface RatingPopupProps {
  article: Article; // You might need to adjust the type according to your Article interface
  onClose: () => void;
}

const RatingPopup: React.FC<RatingPopupProps> = ({ article, onClose }) => {
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the rating state when the input value changes
    const newRating = parseInt(event.target.value, 10);
    setRating(newRating);
  };

  const handleSubmit = () => {
    // Handle the submission of the rating. You can send it to your server or perform other actions.
    // For this example, we'll just log it to the console.
    console.log("Submitted rating:", rating);
    onClose(); // Close the popup
  };

  return (
    <div className={styles.ratingPopup}>
      <div className={styles.popupContent}>
      <h2 className={styles.ratingPopupTitle}>Add Rating for "{article.title}"</h2>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={rating || ""}
          onChange={handleRatingChange}
        />
        <button onClick={handleSubmit}>Submit Rating</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RatingPopup;

import React from 'react';

interface Props {
  showDuplicates: boolean;
  setShowDuplicates: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterDuplicatesCheckbox: React.FC<Props> = ({ showDuplicates, setShowDuplicates }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowDuplicates(e.target.checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        id="filterDuplicates"
        checked={showDuplicates}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="filterDuplicates">Hide Possible Duplicates</label>
    </div>
  );
};

export default FilterDuplicatesCheckbox;

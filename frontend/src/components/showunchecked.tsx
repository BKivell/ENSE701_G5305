import React from 'react';

interface Props {
  onChange: (checked: boolean) => void;
}

const ShowUncheckedCheckbox: React.FC<Props> = ({ onChange }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div>
      <input type="checkbox" id="showUnchecked" onChange={handleCheckboxChange} />
      <label htmlFor="showUnchecked">Show only unchecked articles</label>
    </div>
  );
};

export default ShowUncheckedCheckbox;

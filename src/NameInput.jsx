import React from 'react';

const NameInput = ({ inputName, setInputName, onGenerate, isShaking }) => {
  const handleInputChange = (e) => {
    const val = e.target.value;
    // Avoid modifying valid input synchronously (e.g. toUpperCase) to prevent 
    // Android mobile keyboard composition from resetting the input field.
    if (/[^a-zA-Z ]/.test(val)) {
      setInputName(val.replace(/[^a-zA-Z ]/g, ''));
    } else {
      setInputName(val);
    }
  };

  const charCount = inputName.replace(/[^a-zA-Z]/g, '').length;

  return (
    <div className="input-section">
      <div className="header">
        <h1 className="title">NAME ON EARTH</h1>
        <p className="subtitle">SPELL YOUR NAME IN IMAGES.</p>
      </div>
      <div className={`name-input-wrapper ${isShaking ? 'shake' : ''}`}>
        <input
          type="text"
          className="name-input"
          placeholder="TYPE YOUR NAME..."
          value={inputName}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onGenerate();
          }}
        />
        <div className="char-counter">{charCount} CHARACTERS</div>
      </div>
      <button className="btn-generate" onClick={onGenerate}>
        GENERATE
      </button>
    </div>
  );
};

export default NameInput;

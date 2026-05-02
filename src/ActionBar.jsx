import React from 'react';

const ActionBar = ({ generatedName, onRegenerate, onReset, onDownload }) => {
  if (!generatedName) return null;

  return (
    <div className="action-bar">
      <button onClick={onRegenerate}>REGENERATE</button>
      <button onClick={onReset}>RESET</button>
      <button onClick={onDownload}>DOWNLOAD</button>
    </div>
  );
};

export default ActionBar;

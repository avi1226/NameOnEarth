import React from 'react';

const MosaicDisplay = ({ generatedName, selectedVariants, mosaicRef }) => {
  if (!generatedName) return null;

  return (
    <div className="mosaic-section-wrapper">
      <div className="mosaic-section" ref={mosaicRef}>
        <div className="mosaic-container">
          {generatedName.split('').map((char, index) => {
            if (char === ' ') {
              return <div key={`space-${index}`} className="mosaic-gap"></div>;
            }

            const letter = char.toLowerCase();
            const variantIndex = selectedVariants[letter] !== undefined ? selectedVariants[letter] : 0;
            const imagePath = `/images/${letter}_${variantIndex}.jpg`;

            return (
              <div 
                key={`${letter}-${index}`} 
                className="mosaic-tile" 
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <img src={imagePath} alt={letter} className="mosaic-image" />
                <div className="mosaic-label">{char}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MosaicDisplay;

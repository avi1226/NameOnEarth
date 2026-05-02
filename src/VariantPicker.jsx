import React from 'react';
import { LETTER_VARIANTS } from './letterConfig';

const VariantPicker = ({ generatedName, selectedVariants, onSelectVariant }) => {
  if (!generatedName) return null;

  // Get unique letters from the generated name
  const uniqueLetters = [...new Set(
    generatedName.toLowerCase().replace(/[^a-z]/g, '').split('')
  )].sort();

  if (uniqueLetters.length === 0) return null;

  return (
    <div className="variant-section">
      {uniqueLetters.map(letter => {
        const numVariants = LETTER_VARIANTS[letter] || 1;
        const currentSelected = selectedVariants[letter] !== undefined ? selectedVariants[letter] : 0;

        return (
          <div key={letter} className="variant-row">
            <div className="variant-letter-label">{letter.toUpperCase()}</div>
            <div className="variant-thumbnails">
              {Array.from({ length: numVariants }).map((_, index) => {
                const imagePath = `/images/${letter}_${index}.jpg`;
                const isSelected = currentSelected === index;

                return (
                  <button
                    key={`${letter}-${index}`}
                    className={`thumbnail-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSelectVariant(letter, index)}
                    aria-label={`Select variant ${index + 1} for ${letter.toUpperCase()}`}
                  >
                    <img src={imagePath} alt={`${letter} variant ${index}`} className="thumbnail-image" />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantPicker;

import React, { useState, useRef } from 'react';
import NameInput from './NameInput';
import MosaicDisplay from './MosaicDisplay';
import VariantPicker from './VariantPicker';
import ActionBar from './ActionBar';
import { LETTER_VARIANTS } from './letterConfig';

function App() {
  const [inputName, setInputName] = useState('');
  const [generatedName, setGeneratedName] = useState('');
  const [selectedVariants, setSelectedVariants] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const mosaicRef = useRef(null);

  const handleGenerate = () => {
    const cleanName = inputName.trim().toUpperCase();
    if (!cleanName) {
      // Trigger shake animation
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    setGeneratedName(cleanName);

    // Initialize selected variants with index 0 for each unique letter
    const uniqueLetters = [...new Set(
      cleanName.toLowerCase().replace(/[^a-z]/g, '').split('')
    )];
    
    const initialVariants = {};
    uniqueLetters.forEach(letter => {
      initialVariants[letter] = 0; // Default to first variant
    });
    
    setSelectedVariants(initialVariants);
  };

  const handleSelectVariant = (letter, variantIndex) => {
    setSelectedVariants(prev => ({
      ...prev,
      [letter]: variantIndex
    }));
  };

  const handleRegenerate = () => {
    if (!generatedName) return;
    
    const uniqueLetters = [...new Set(
      generatedName.toLowerCase().replace(/[^a-z]/g, '').split('')
    )];
    
    const newVariants = {};
    uniqueLetters.forEach(letter => {
      const numVariants = LETTER_VARIANTS[letter] || 1;
      // Pick a random index
      const randomIndex = Math.floor(Math.random() * numVariants);
      newVariants[letter] = randomIndex;
    });
    
    setSelectedVariants(newVariants);
  };

  const handleReset = () => {
    setInputName('');
    setGeneratedName('');
    setSelectedVariants({});
  };

  const handleDownload = async () => {
    if (!mosaicRef.current) return;
    
    try {
      // Since html2canvas is loaded via CDN in index.html, it's available on window
      const html2canvas = window.html2canvas;
      if (!html2canvas) {
        console.error("html2canvas not loaded");
        return;
      }
      
      // Ensure high resolution on mobile by dynamically scaling up
      const currentWidth = mosaicRef.current.offsetWidth;
      // Target at least 1500px width for the downloaded image to be crisp
      const dynamicScale = Math.max(2, 1500 / currentWidth);
      
      const canvas = await html2canvas(mosaicRef.current, {
        backgroundColor: '#ffffff',
        scale: dynamicScale, // High quality, especially on mobile
        onclone: (clonedDoc) => {
          // Remove animations and force opacity on cloned elements
          // because html2canvas restarts CSS animations on clones
          const tiles = clonedDoc.querySelectorAll('.mosaic-tile');
          tiles.forEach(tile => {
            tile.style.animation = 'none';
            tile.style.opacity = '1';
            tile.style.transform = 'none';
          });
        }
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${generatedName.replace(/\s+/g, '_')}_mosaic.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div className="container">
      <NameInput 
        inputName={inputName} 
        setInputName={setInputName} 
        onGenerate={handleGenerate} 
        isShaking={isShaking}
      />
      
      <MosaicDisplay 
        generatedName={generatedName} 
        selectedVariants={selectedVariants}
        mosaicRef={mosaicRef}
      />
      
      <VariantPicker 
        generatedName={generatedName} 
        selectedVariants={selectedVariants} 
        onSelectVariant={handleSelectVariant}
      />
      
      <ActionBar 
        generatedName={generatedName} 
        onRegenerate={handleRegenerate}
        onReset={handleReset}
        onDownload={handleDownload}
      />
    </div>
  );
}

export default App;

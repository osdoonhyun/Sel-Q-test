import { useCallback, useEffect, useState } from 'react';
import { convertUnitToPx } from '../utils/fontSize';
import { FONT_SIZE_OPTIONS } from '../constant/options';

const calcFontSize = (fontSize, fontVariant) => {
  const fontSizeValue = convertUnitToPx(fontSize);
  let calcedFontSize;
  switch (fontVariant) {
    case 'small':
      calcedFontSize = `${fontSizeValue - 3}px`;
      break;
    case 'basic':
      calcedFontSize = fontSize;
      break;
    case 'large':
      calcedFontSize = `${fontSizeValue + 3}px`;
      break;
    default:
      calcedFontSize = fontSize;
      break;
  }

  return calcedFontSize;
};

export default function useFontSizing() {
  const [fontSizing, setFontSizing] = useState('basic');

  const handleFontSizing = useCallback(
    (selectedIndex) => {
      const updatedFontSize = FONT_SIZE_OPTIONS[selectedIndex]?.variant;
      setFontSizing(updatedFontSize);
      localStorage.setItem('fontSizeOption', updatedFontSize);
    },
    [setFontSizing]
  );

  useEffect(() => {
    const savedFontSizeOption = localStorage.getItem('fontSizeOption');
    if (savedFontSizeOption) {
      setFontSizing(savedFontSizeOption);
    }
  }, []);

  return {
    fontSizing,
    handleFontSizing,
    calcFontSize,
  };
}

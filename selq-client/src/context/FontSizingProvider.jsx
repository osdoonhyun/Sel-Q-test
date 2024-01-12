import { createContext, useContext } from 'react';
import useFontSizing from '../hooks/common/useFontSizing';

const defaultValue = {
  fontSizing: 'basic',
  handleFontSizing: () => {},
};

export const FontSizingContext = createContext(defaultValue);

export const useFontSize = () => {
  return useContext(FontSizingContext);
};

export default function FontSizingProvider({ children }) {
  const fontSizingProps = useFontSizing();

  return (
    <FontSizingContext.Provider value={fontSizingProps}>
      {children}
    </FontSizingContext.Provider>
  );
}

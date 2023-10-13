import { FONT_SIZE_OPTIONS } from '../constant/options';

function remToPx(remFont) {
  const baseFontSize = 16;
  const pxFont = remFont * baseFontSize;
  return pxFont;
}

export function convertUnitToPx(fontValue) {
  const unit = fontValue.match(/[a-z]+/);
  const fontSizeValue = parseFloat(fontValue);

  if (unit && unit[0] === 'rem') {
    const pxValue = remToPx(fontSizeValue);
    return pxValue;
  }

  return fontSizeValue;
}

export function getTargetIndex(target) {
  const targetIndex = FONT_SIZE_OPTIONS.findIndex(
    (option) => option.variant === target
  );

  return targetIndex;
}

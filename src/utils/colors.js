export const isColorBrighterThan = (hexColor, brightnessPercentage) => {
  const color = hexColor.replace("#", "");

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  
  let brightness = (r * 299 + g * 587 + b * 114) / 1000;
  brightness = brightness / 255 * 100;
  
  return brightness > brightnessPercentage;
}
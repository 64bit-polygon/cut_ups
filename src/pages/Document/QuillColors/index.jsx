import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { isColorBrighterThan } from "../../../utils/colors.js"

const baseColors = [
  "000000",
  "FF0000",
  "FF6E0B",
  "FFFF00",
  "00FF00",
  "0000FF",
  "FF00FF"
];

const whiteAddedColor = [0, 17, 34, 51, 68];
const whiteAddedTonal = [0, 25, 50, 75, 100];

function addPercentageWhite(hexColor, percentage) {
  let r = parseInt(hexColor.substring(0,2),16);
  let g = parseInt(hexColor.substring(2,4),16);
  let b = parseInt(hexColor.substring(4,6),16);

  const whiteToAdd = Math.round(255 * (percentage / 100));

  r = Math.min(255, r + whiteToAdd);
  g = Math.min(255, g + whiteToAdd);
  b = Math.min(255, b + whiteToAdd);

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const colors = baseColors.reduce((allColors, baseColor) => {
  const whiteAdded = baseColor === "000000" ? whiteAddedTonal : whiteAddedColor;
  const blendedColors = whiteAdded.map(
    whitePercent => addPercentageWhite(baseColor, whitePercent)
  );
  return [...allColors, ...blendedColors];
}, []);

export const QuillColors = ({quillClasses}) => (
  <div className={styles.colors}>
    {colors.map(color => (
      <div key={color + quillClasses} className={styles.buttonWrap}>
        <button
          type="button"
          name={quillClasses}
          value={color}
          className={cn(styles.button, quillClasses)}
        />
        <div
          className={cn(styles.color, {[styles.dark]: isColorBrighterThan(color, 70)})}
          style={{backgroundColor: color}}
        />
      </div>
    ))}
  </div>
);

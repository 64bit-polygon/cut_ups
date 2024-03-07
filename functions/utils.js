const makeSourceTag = index => `<span class="source${index} ql-font-romain ql-size-normal">`;
export const SOURCE_1_TAG = makeSourceTag(1);
export const SOURCE_2_TAG = makeSourceTag(2);
export const SOURCE_CLOSE_TAG = "</span>";

export const makeLines = text => {
  if (!text) return [];
  let source = text.trim();
  if (!source) return [];
  let isLastLine = false;
  const maxGlyphsPerLine = 85;
  const lines = [];

  do {
    const roughLine = source.slice(0, maxGlyphsPerLine);
    const lastSpace = roughLine.lastIndexOf(" ");
    isLastLine = roughLine.length === source.length;
    const line = isLastLine ? source : source.slice(0, lastSpace);
    lines.push(line.trim());
    source = source.slice(lastSpace, source.length);
  } while (!isLastLine);

  return lines;
}

export const combineSources = (source1, source2) => {
  const hasSource1 = !!source1?.length;
  const hasSource2 = !!source2?.length;
  if (!hasSource1 && !hasSource2) return [];
  if (hasSource1 && !hasSource2) return source1;
  if (!hasSource1 && hasSource2) return source2;

  const maxLength = Math.min(source1.length, source2.length);
  const source1Cropped = source1.slice(0, maxLength);
  const source2Cropped = source2.slice(0, maxLength);

  return source1Cropped.reduce((result, line, index) => {
    return [...result, line, source2Cropped[index]]
  }, [])
}

export const wrapLines = lines => {
  return lines.reduce((result, line, index) => {
    const openingTag = index % 2 ? SOURCE_2_TAG : SOURCE_1_TAG;
    return `${result}${openingTag}${line} ${SOURCE_CLOSE_TAG}`;
  }, "");
};

export const makeDocContent = (source1, source2) => {
  if (!source1 && !source2) {
    return '<span class="ql-font-romain ql-size-normal"> </span>';
  }
  const source1Lines = makeLines(source1);
  const source2Lines = makeLines(source2);
  const combinedSources = combineSources(source1Lines, source2Lines);
  return wrapLines(combinedSources);
}

const getRandomInt = max => Math.floor(Math.random() * max);

export const getLastSpaceIndex = (str, index) => {
  if (!str || !index) return -1;
  const cutIntoText = str.slice(0, index);
  return cutIntoText.lastIndexOf(" ");
}

export const cropStrAtSpace = (str, index) => {
  if (!str || !index) return str;
  return str.slice(0, getLastSpaceIndex(str, index));
}

export const randomizeContentStart = text => {
  const cutIndex = getLastSpaceIndex(text, getRandomInt(text.length));
  const firstChunk = text.slice(cutIndex, text.length);
  const secondChunk = text.slice(0, cutIndex);

  return `${firstChunk} ${secondChunk}`.trim();
}
import { promises as fs } from "fs";
import {
  makeLines,
  combineSources,
  wrapLines,
  getLastSpaceIndex,
  cropStrAtSpace,
  SOURCE_1_TAG,
  SOURCE_2_TAG,
  SOURCE_CLOSE_TAG
} from "./utils";
import {
  SOURCE_1,
  SOURCE_2,
  SOURCE_1_LINES,
  SOURCE_2_LINES,
  SOURCE_2_LINE_1,
  SOURCE_COMBINED_SOURCES
} from "./fixtures/utils.fixtures";

let REAL_WORLD_1;
let REAL_WORLD_2;

beforeAll(async () => {
  REAL_WORLD_1 = await fs.readFile("./fixtures/kafka.txt", "binary");
  REAL_WORLD_2 = await fs.readFile("./fixtures/poe.txt", "binary");
});

describe("makeLines", () => {
  it("it should return an empty array for falsy vals and empty strings", () => {
    const falsy1 = makeLines();
    const falsy2 = makeLines("");
    const falsy3 = makeLines(" ");
    const falsy4 = makeLines(null);

    expect(falsy1).toEqual([]);
    expect(falsy2).toEqual([]);
    expect(falsy3).toEqual([]);
    expect(falsy4).toEqual([]);
  });

  it("it should create lines in an expected manner", () => {
    const lines1 = makeLines(SOURCE_1);
    const lines2 = makeLines(SOURCE_2);
    lines1.forEach((line, index) => expect(line).toEqual(SOURCE_1_LINES[index]));
    lines2.forEach((line, index) => expect(line).toEqual(SOURCE_2_LINES[index]));
  });

  it("it should create lines with real world examples", () => {
    const realWorldLines1 = makeLines(REAL_WORLD_1);
    const realWorldLines2 = makeLines(REAL_WORLD_2);

    expect(realWorldLines1.join(" ")).toEqual(REAL_WORLD_1);
    expect(realWorldLines2.join(" ")).toEqual(REAL_WORLD_2);
  });
});

describe("combineSources", () => {
  it("it should combine two sources of equal length", () => {
    const combinedSources = combineSources(SOURCE_1_LINES, SOURCE_2_LINES);
    combinedSources.forEach((source, index) => expect(source).toEqual(SOURCE_COMBINED_SOURCES[index]));
  });

  it("it should combine two sources of unequal length", () => {
    const combinedSources = combineSources(SOURCE_1_LINES, [SOURCE_2_LINE_1]);
    const expectedResults = [SOURCE_1_LINES[0], SOURCE_2_LINE_1];
    combinedSources.forEach((source, index) => expect(source).toEqual(expectedResults[index]));
  });

  it("it should return a line list if only one source is given", () => {
    const combinedSources1 = combineSources(SOURCE_1_LINES, undefined);
    const combinedSources2 = combineSources(undefined, SOURCE_1_LINES);

    combinedSources1.forEach((source, index) => expect(source).toEqual(SOURCE_1_LINES[index]));
    combinedSources2.forEach((source, index) => expect(source).toEqual(SOURCE_1_LINES[index]));
  });

  it("it should return an empty array if no sources are given", () => {
    const result = combineSources();
    expect(result).toEqual([]);
  });
});

describe("wrapLines", () => {
  it("it should return wrapped values", () => {
    const base = ["one", "two"];
    const expectedResult = `${SOURCE_1_TAG}${base[0]}${SOURCE_CLOSE_TAG}${SOURCE_2_TAG}${base[1]}${SOURCE_CLOSE_TAG}`;
    const result = wrapLines(base);
    expect(result).toEqual(expectedResult);
  });

  it("it should return an empty string if given a empty array", () => {
    expect(wrapLines([])).toEqual("");
  });
});

describe("getLastSpaceIndex", () => {
  it("it should return the index of the last space before a given index", () => {
    const str = "0 2 4 6";
    expect(getLastSpaceIndex(str, 2)).toEqual(1);
    expect(getLastSpaceIndex(str, 4)).toEqual(3);
    expect(getLastSpaceIndex(str, 6)).toEqual(5);
  });

  it("it should return -1 if any params are falsy", () => {
    expect(getLastSpaceIndex()).toEqual(-1);
    expect(getLastSpaceIndex("")).toEqual(-1);
    expect(getLastSpaceIndex("some text", 0)).toEqual(-1);
  });
});

describe("cropStrAtSpace", () => {
  it("it should return a sub string cropped to the nearest space based on an index", () => {
    const str = "01 34 67 9";
    expect(cropStrAtSpace(str, 4)).toEqual("01");
    expect(cropStrAtSpace(str, 6)).toEqual("01 34");
    expect(cropStrAtSpace(str, 9)).toEqual("01 34 67");
  });

  it("it should the str param if any params are falsy", () => {
    const str1 = undefined;
    const str2 = "some text";

    expect(cropStrAtSpace(str1, 0)).toEqual(str1);
    expect(cropStrAtSpace(str2, undefined)).toEqual(str2);
  });
});
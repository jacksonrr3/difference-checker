import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const normalizePath = (filePath) => path.resolve(process.cwd(), filePath);

const getObjectFromJSON = (filePath) => JSON.parse(fs.readFileSync(filePath));

export const printDiff = (diffs) => {
  const toPrint = diffs.map((diff) => `  ${diff}`);
  console.log(`{\n${toPrint.join('\n')}\n}`);
};

export const genDiff = (pathTofile1, pathTofile2) => {
  const firstComparedObj = getObjectFromJSON(normalizePath(pathTofile1));
  const secondComparedObj = getObjectFromJSON(normalizePath(pathTofile2));
  const agregatedKeys = _.union(
    _.keys(firstComparedObj),
    _.keys(secondComparedObj),
  );

  return _.sortBy(agregatedKeys).reduce((acc, key) => {
    const isContainedByFirst = Object.hasOwn(firstComparedObj, key);
    const isContainedBySecond = Object.hasOwn(secondComparedObj, key);
    const firstValue = firstComparedObj[key];
    const secondValue = secondComparedObj[key];
    if (isContainedByFirst && !isContainedBySecond) {
      return [...acc, `- ${key}: ${firstValue}`];
    }
    if (!isContainedByFirst && isContainedBySecond) {
      return [...acc, `+ ${key}: ${secondValue}`];
    }
    if (firstValue !== secondValue) {
      return [...acc, `- ${key}: ${firstValue}`, `+ ${key}: ${secondValue}`];
    }
    return [...acc, `  ${key}: ${firstValue}`];
  }, []);
};

export default {
  genDiff,
  printDiff,
};

import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

const normalizePath = (filePath) => path.resolve(process.cwd(), filePath);

const getObjectFromJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const getObjectFromYAML = (filePath) => yaml.load(fs.readFileSync(filePath, 'utf8'));

const getObjectFromFile = (filePath) => {
  const ext = path.extname(filePath);

  if (ext === '.yml' || ext === '.yaml') {
    return getObjectFromYAML(filePath);
  }

  if (ext === '.json') {
    return getObjectFromJSON(filePath);
  }

  throw new Error('Undefined file format.');
};

export const printDiff = (diffs) => {
  const toPrint = diffs.map((diff) => `  ${diff}`);
  console.log(`{\n${toPrint.join('\n')}\n}`);
};

export const genDiff = (pathTofile1, pathTofile2) => {
  const firstComparedObj = getObjectFromFile(normalizePath(pathTofile1));
  const secondComparedObj = getObjectFromFile(normalizePath(pathTofile2));
  const agregatedKeys = _.union(
    _.keys(firstComparedObj),
    _.keys(secondComparedObj),
  );

  return _.sortBy(agregatedKeys).reduce((acc, key) => {
    const firstValue = firstComparedObj[key];
    const secondValue = secondComparedObj[key];
    if (secondValue === undefined) {
      return [...acc, `- ${key}: ${firstValue}`];
    }
    if (firstValue === undefined) {
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

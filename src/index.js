import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const normalizePath = (filePath) => path.resolve(process.cwd(), filePath);

const getObjectFromJSON = (filePath) =>
  JSON.parse(fs.readFileSync(filePath));

export const printDiff = (diffs) => { 
  console.log('{');
  diffs.forEach(diff => {
    console.log(`  ${diff}`);
  });
  console.log('}');
};  

export const genDiff = (pathTofile1, pathTofile2) => {
  const firstComparedObj = getObjectFromJSON(normalizePath(pathTofile1));
  const secondComparedObj = getObjectFromJSON(normalizePath(pathTofile2));

  const agregatedKeys = _.union(_.keys(firstComparedObj), _.keys(secondComparedObj));
  
  const diffObject = _.sortBy(agregatedKeys).reduce((acc, key) => { 
    const isContainedByFirst = Object.hasOwn(firstComparedObj, key);
    const isContainedBySecond = Object.hasOwn(secondComparedObj, key);
    const firstValue = firstComparedObj[key];
    const secondValue = secondComparedObj[key];
    if (isContainedByFirst && !isContainedBySecond) { 
      acc.push(`- ${key}: ${firstValue}`);
      return acc;
    }
    if (!isContainedByFirst && isContainedBySecond) {
      acc.push(`+ ${key}: ${secondValue}`);
      return acc;
    }
    if (firstValue !== secondValue) { 
      acc.push(`- ${key}: ${firstValue}`);
      acc.push(`+ ${key}: ${secondValue}`);
      return acc;
    }
    acc.push(`  ${key}: ${firstValue}`);
    return acc;
  }, []);

  return diffObject;
};

export default {
  genDiff,
  printDiff,
};

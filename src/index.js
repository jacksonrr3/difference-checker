import _ from 'lodash';
import fileUtils from './file_utils.js';

export const printDiff = (diffs) => {
  const toPrint = diffs.map((diff) => `  ${diff}`);
  console.log(`{\n${toPrint.join('\n')}\n}`);
};

const createDiffObject = (firstObject, secondObject) => {
  const agregatedKeys = _.union(_.keys(firstObject), _.keys(secondObject));

  return _.sortBy(agregatedKeys)
    .reduce((acc, key) => {
      const firstValue = firstObject[key];
      const secondValue = secondObject[key];
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

export const genDiff = (pathTofile1, pathTofile2) => {
  const firstComparedObj = fileUtils.getObjectFromFile(pathTofile1);
  const secondComparedObj = fileUtils.getObjectFromFile(pathTofile2);

  const diffObject = createDiffObject(firstComparedObj, secondComparedObj);

  printDiff(diffObject);

  return diffObject;
};

export default {
  genDiff,
  printDiff,
};

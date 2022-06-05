import _ from 'lodash';
import fileUtils from './file_utils.js';
import formatter from './formatters/index.js';

const createDiffCol = (firstObject, secondObject) => {
  const agregatedKeys = _.union(_.keys(firstObject), _.keys(secondObject));

  return _.sortBy(agregatedKeys)
    .map((key) => {
      const firstValue = firstObject[key];
      const secondValue = secondObject[key];

      if (secondValue === undefined) return { key, type: 'removed', oldValue: firstValue };
      if (firstValue === undefined) return { key, type: 'added', value: secondValue };
      if (firstValue === secondValue) return { key, type: 'unchanged', value: firstValue };
      if (_.isObject(firstValue) && _.isObject(secondValue)) {
        return { key, type: 'nested', children: createDiffCol(firstValue, secondValue) };
      }

      return {
        key, type: 'changed', oldValue: firstValue, value: secondValue,
      };
    });
};

export const genDiff = (pathTofile1, pathTofile2, formatName) => {
  const firstComparedObj = fileUtils.getObjectFromFile(pathTofile1);
  const secondComparedObj = fileUtils.getObjectFromFile(pathTofile2);

  const differences = createDiffCol(firstComparedObj, secondComparedObj);
  return formatter.formatToString(differences, formatName);
};

export default {
  genDiff,
};

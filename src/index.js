import _ from 'lodash';
import fileUtils from './file_utils.js';
import formatter from './formatters/index.js';
import {
  ADDED, REMOVED, CHANGED, NESTED, UNCHANGED,
} from './constants.js';

const createDiffCol = (firstObject, secondObject) => {
  const agregatedKeys = _.union(_.keys(firstObject), _.keys(secondObject));

  return _.sortBy(agregatedKeys)
    .map((key) => {
      const firstValue = firstObject[key];
      const secondValue = secondObject[key];

      if (secondValue === undefined) return { key, type: REMOVED, oldValue: firstValue };
      if (firstValue === undefined) return { key, type: ADDED, value: secondValue };
      if (firstValue === secondValue) return { key, type: UNCHANGED, value: firstValue };
      if (_.isObject(firstValue) && _.isObject(secondValue)) {
        return { key, type: NESTED, children: createDiffCol(firstValue, secondValue) };
      }

      return {
        key, type: CHANGED, oldValue: firstValue, value: secondValue,
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

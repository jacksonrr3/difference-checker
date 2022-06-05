import _ from 'lodash';
import fileUtils from './file_utils.js';
import formatter from './formatter/index.js';

const createDiffCol = (firstObject, secondObject) => {
  const agregatedKeys = _.union(_.keys(firstObject), _.keys(secondObject));

  return _.sortBy(agregatedKeys)
    .map((key) => {
      const firstValue = firstObject[key];
      const secondValue = secondObject[key];

      if (secondValue === undefined) {
        return { key, type: 'remove', oldValue: firstValue };
      }

      if (firstValue === undefined) {
        return { key, type: 'add', value: secondValue };
      }

      if (firstValue === secondValue) {
        return { key, type: 'same', value: firstValue };
      }

      if (_.isObject(firstValue) && _.isObject(secondValue)) {
        return { key, type: 'nested', children: createDiffCol(firstValue, secondValue) };
      }

      return {
        key, type: 'changed', oldValue: firstValue, value: secondValue,
      };
    });
};

export const genDiff = (pathTofile1, pathTofile2, format) => {
  const firstComparedObj = fileUtils.getObjectFromFile(pathTofile1);
  const secondComparedObj = fileUtils.getObjectFromFile(pathTofile2);

  const differences = createDiffCol(firstComparedObj, secondComparedObj);
  // console.log(differences);
  const resultString = formatter.formatToString(differences, format);
  // console.log(resultString);
  return resultString;
};

export default {
  genDiff,
};

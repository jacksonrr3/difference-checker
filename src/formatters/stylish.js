import _ from 'lodash';
import {
  ADDED, REMOVED, CHANGED, NESTED,
} from '../constants.js';

const replacer = ' ';
const replaceCount = 4;

const createIndents = (step, startIndent = '') => {
  const bracketIndent = `${startIndent}${replacer.repeat(
    replaceCount * (step - 1),
  )}`;
  const indent = `${startIndent}${replacer.repeat(replaceCount * step)}`;
  const opIndent = indent.slice(0, -2);
  return { bracketIndent, indent, opIndent };
};

const convertObjToString = (obj, startIndent = '') => {
  const iter = (data, step) => {
    if (!_.isObject(data)) return `${data}`;

    const { bracketIndent, indent } = createIndents(step, startIndent);

    const lines = Object.entries(data).flatMap(
      ([key, value]) => `${indent}${key}: ${iter(value, step + 1)}`,
    );

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(obj, 1);
};

const collectionToString = (collection) => {
  const iter = (col, step) => {
    const { bracketIndent, indent, opIndent } = createIndents(step);

    const result = col.flatMap(({
      key, type, value, oldValue, children,
    }) => {
      if (type === REMOVED) return `${opIndent}- ${key}: ${convertObjToString(oldValue, indent)}`;
      if (type === ADDED) return `${opIndent}+ ${key}: ${convertObjToString(value, indent)}`;
      if (type === CHANGED) {
        return [
          `${opIndent}- ${key}: ${convertObjToString(oldValue, indent)}`,
          `${opIndent}+ ${key}: ${convertObjToString(value, indent)}`,
        ];
      }
      if (type === NESTED) return `${indent}${key}: ${iter(children, step + 1)}`;
      return `${indent}${key}: ${convertObjToString(value, indent)}`;
    });

    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };

  return iter(collection, 1);
};

export default {
  collectionToString,
};

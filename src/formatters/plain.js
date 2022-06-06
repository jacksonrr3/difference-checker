import _ from 'lodash';
import {
  ADDED, REMOVED, CHANGED, UNCHANGED,
} from '../constants.js';

const valueToString = (value) => {
  if (_.isString(value)) return `'${value}'`;
  if (_.isObject(value)) return '[complex value]';
  return value;
};

const collectionToString = (collection) => {
  const iter = (coll, path) => {
    const result = coll.flatMap(({
      key, type, value, oldValue, children,
    }) => {
      if (type === UNCHANGED) return [];
      if (type === ADDED) return `Property '${path}${key}' was added with value: ${valueToString(value)}`;
      if (type === REMOVED) return `Property '${path}${key}' was removed`;
      if (type === CHANGED) {
        return `Property '${path}${key}' was updated. From ${valueToString(
          oldValue,
        )} to ${valueToString(value)}`;
      }
      return iter(children, `${path}${key}.`);
    });

    return result.join('\n');
  };

  return iter(collection, '');
};

export default {
  collectionToString,
};

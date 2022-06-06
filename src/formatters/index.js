import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormat = {
  stylish,
  plain,
  json,
};

const formatToString = (collection, formatName = 'stylish') => {
  const format = getFormat[formatName];
  return format.collectionToString(collection);
};

export default {
  formatToString,
};

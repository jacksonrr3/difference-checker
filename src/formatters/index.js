import stylish from './stylish.js';
import plain from './plain.js';

const getFormat = {
  stylish,
  plain,
};

const formatToString = (collection, formatName = 'stylish') => {
  const format = getFormat[formatName];
  return format.colToString(collection);
};

export default {
  formatToString,
};

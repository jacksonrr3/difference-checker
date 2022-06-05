import stylish from './stylish.js';

const formatStyles = {
  stylish,
};

const formatToString = (collection, formatStyle = 'stylish') => {
  const format = formatStyles[formatStyle];
  return format.colToString(collection);
};

export default {
  formatToString,
};

import _ from 'lodash';

const replacer = ' ';
const replaceCount = 4;

const convertObjToString = (obj, startInner = '') => {
  const iter = (data, step) => {
    if (!_.isObject(data)) return `${data}`;

    const bracketInner = `${startInner}${replacer.repeat(
      replaceCount * (step - 1),
    )}`;
    const currentInner = `${startInner}${replacer.repeat(replaceCount * step)}`;

    const lines = Object.entries(data).flatMap(
      ([key, value]) => `${currentInner}${key}: ${iter(value, step + 1)}`,
    );

    return ['{', ...lines, `${bracketInner}}`].join('\n');
  };

  return iter(obj, 1);
};

const colToString = (collection) => {
  const iter = (col, step) => {
    const bracketIndent = `${replacer.repeat(replaceCount * (step - 1))}`;
    const indent = replacer.repeat(replaceCount * step);
    const opIndent = indent.slice(0, -2);

    const result = col.flatMap(({
      key, type, value, oldValue, children,
    }) => {
      if (type === 'remove') {
        return `${opIndent}- ${key}: ${convertObjToString(oldValue, indent)}`;
      }
      if (type === 'add') {
        return `${opIndent}+ ${key}: ${convertObjToString(value, indent)}`;
      }
      if (type === 'changed') {
        return [
          `${opIndent}- ${key}: ${convertObjToString(oldValue, indent)}`,
          `${opIndent}+ ${key}: ${convertObjToString(value, indent)}`,
        ];
      }
      if (type === 'nested') {
        return `${indent}${key}: ${iter(children, step + 1)}`;
      }

      return `${indent}${key}: ${convertObjToString(value, indent)}`;
    });

    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };

  return iter(collection, 1);
};

export default {
  colToString,
};

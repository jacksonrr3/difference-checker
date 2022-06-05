// import _ from 'lodash';

// const convertObjToString = (obj, replacer = ' ', replaceCount = 1) => {
//   const iter = (data, step) => {
//     if (!_.isObject(data)) return `${data}`;

//     const bracketInner = replacer.repeat(replaceCount * (step - 1));
//     const currentInner = replacer.repeat(replaceCount * step);

//     const lines = Object
//       .entries(data)
//       .flatMap(([key, value]) => `${currentInner}${key}: ${iter(value, step + 1)}`);

//     return [
//       '{',
//       ...lines,
//       `${bracketInner}}`,
//     ];
//   };

//   return iter(obj, 1).join('\n');
// };

const colToString = (collection, replacer = ' ', replaceCount = 2) => {
  const iter = (col, step) => {
    const bracketInner = replacer.repeat(replaceCount * (step - 1));
    const currentInner = replacer.repeat(replaceCount * step);
    const result = collection.flatMap((el) => {
      const {
        key, type, value, oldValue,
      } = el;
      if (type === 'remove') {
        return `${currentInner}- ${key}: ${oldValue}`;
      }
      if (type === 'add') {
        return `${currentInner}+ ${key}: ${value}`;
      }
      if (type === 'changed') {
        return [
          `${currentInner}- ${key}: ${oldValue}`,
          `${currentInner}+ ${key}: ${value}`,
        ];
      }
      return `${currentInner}  ${key}: ${value}`;
    });

    return ['{', ...result, `${bracketInner}}`].join('\n');
  };

  return iter(collection, 1);
};

export default {
  colToString,
};

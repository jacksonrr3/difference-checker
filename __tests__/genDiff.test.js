import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const plainResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff compare plain JSON files, stylish format', () => {
  const firstFilePath = getFixturePath('test1_1.json');
  const secondFilePath = getFixturePath('test1_2.json');
  expect(genDiff(firstFilePath, secondFilePath)).toEqual(plainResult);
});

test('genDiff compare plain YAML files', () => {
  const firstFilePath = getFixturePath('test2_1.yml');
  const secondFilePath = getFixturePath('test2_2.yml');

  expect(genDiff(firstFilePath, secondFilePath)).toEqual(plainResult);
});

const nestedResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('genDiff compare JSON', () => {
  const firstFilePath = getFixturePath('test3_1.json');
  const secondFilePath = getFixturePath('test3_2.json');
  expect(genDiff(firstFilePath, secondFilePath)).toEqual(nestedResult);
});

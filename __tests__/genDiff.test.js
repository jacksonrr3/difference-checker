import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const plainResult = [
  '- follow: false',
  '  host: hexlet.io',
  '- proxy: 123.234.53.22',
  '- timeout: 50',
  '+ timeout: 20',
  '+ verbose: true',
];

test('genDiff compare plain JSON files', () => {
  const firstFilePath = getFixturePath('test1_1.json');
  const secondFilePath = getFixturePath('test1_2.json');
  expect(genDiff(firstFilePath, secondFilePath)).toEqual(plainResult);
});

test('genDiff compare plain YAML files', () => {
  const firstFilePath = getFixturePath('test2_1.yml');
  const secondFilePath = getFixturePath('test2_2.yml');

  expect(genDiff(firstFilePath, secondFilePath)).toEqual(plainResult);
});

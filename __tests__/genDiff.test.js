import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import {
  stylishResult, stylishNestedResult, plainResult, plainNestedResult,
} from './results.js';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('stylish format', () => {
  test('genDiff compare plain JSON files', () => {
    const firstFilePath = getFixturePath('test1_1.json');
    const secondFilePath = getFixturePath('test1_2.json');
    expect(genDiff(firstFilePath, secondFilePath)).toEqual(stylishResult);
  });

  test('genDiff compare plain YAML files', () => {
    const firstFilePath = getFixturePath('test2_1.yml');
    const secondFilePath = getFixturePath('test2_2.yml');

    expect(genDiff(firstFilePath, secondFilePath)).toEqual(stylishResult);
  });

  test('genDiff compare JSON', () => {
    const firstFilePath = getFixturePath('test3_1.json');
    const secondFilePath = getFixturePath('test3_2.json');
    expect(genDiff(firstFilePath, secondFilePath)).toEqual(stylishNestedResult);
  });

  test('genDiff compare YAML', () => {
    const firstFilePath = getFixturePath('test4_1.yml');
    const secondFilePath = getFixturePath('test4_2.yml');
    expect(genDiff(firstFilePath, secondFilePath)).toEqual(stylishNestedResult);
  });
});

describe('plain format', () => {
  test('genDiff compare JSON', () => {
    const firstFilePath = getFixturePath('test3_1.json');
    const secondFilePath = getFixturePath('test3_2.json');
    expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(plainResult);
  });

  test('genDiff compare YAML', () => {
    const firstFilePath = getFixturePath('test4_1.yml');
    const secondFilePath = getFixturePath('test4_2.yml');
    expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(plainNestedResult);
  });
});

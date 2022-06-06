import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('stylish format', () => {
  const stylishResult = fs.readFileSync(getFixturePath('stylish_result.txt'), 'utf8');
  const stylishNestedResult = fs.readFileSync(
    getFixturePath('stylish_nested_result.txt'),
    'utf8',
  );

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
  const plainResult = fs.readFileSync(
    getFixturePath('plain_result.txt'),
    'utf8',
  );
  const plainNestedResult = fs.readFileSync(
    getFixturePath('plain_nested_result.txt'),
    'utf8',
  );

  test('genDiff compare plain JSON', () => {
    const firstFilePath = getFixturePath('test1_1.json');
    const secondFilePath = getFixturePath('test1_2.json');
    expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(
      plainResult,
    );
  });

  test('genDiff compare plain YAML', () => {
    const firstFilePath = getFixturePath('test2_1.yml');
    const secondFilePath = getFixturePath('test2_2.yml');
    expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(
      plainResult,
    );
  });

  test('genDiff compare JSON', () => {
    const firstFilePath = getFixturePath('test3_1.json');
    const secondFilePath = getFixturePath('test3_2.json');
    expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(
      plainNestedResult,
    );
  });

  test('genDiff compare YAML', () => {
    const firstFilePath = getFixturePath('test4_1.yml');
    const secondFilePath = getFixturePath('test4_2.yml');
    expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(
      plainNestedResult,
    );
  });
});

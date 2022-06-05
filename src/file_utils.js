import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const normalizePath = (filePath) => path.resolve(process.cwd(), filePath);

const getObjectFromJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const getObjectFromYAML = (filePath) => yaml.load(fs.readFileSync(filePath, 'utf8'));

const getObjectFromFile = (filePath) => {
  const normalisedPath = normalizePath(filePath);

  const ext = path.extname(normalisedPath);

  if (ext === '.yml' || ext === '.yaml') {
    return getObjectFromYAML(normalisedPath);
  }

  if (ext === '.json') {
    return getObjectFromJSON(normalisedPath);
  }

  throw new Error('Undefined file format.');
};

export default {
  getObjectFromFile,
};

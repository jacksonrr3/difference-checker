import fs from 'fs';
import path from 'path';

const normalizePath = (filePath) => path.resolve(process.cwd(), filePath); 

const genDiff = (pathTofile1, pathTofile2) => {
  const normalPath1 = normalizePath(pathTofile1);
  const normalPath2 = normalizePath(pathTofile2); 

  const fileObject1 = JSON.parse(fs.readFileSync(normalPath1));
  const fileObject2 = JSON.parse(fs.readFileSync(normalPath2));

  Object.keys(fileObject1);
  Object.keys(fileObject2);

  console.log(Object.keys(fileObject2))
  console.log(Object.keys(fileObject1));

};

export default genDiff;

// genDiff(
//   './file1.json',
//   './file2.json'
// );
import fs from 'fs';
import path from 'path';

const normalizePath = (filePath) => path.resolve(process.cwd(), filePath); 

const genDiff = (pathTofile1, pathTofile2) => {
  const normalPath1 = normalizePath(pathTofile1);
  const normalPath2 = normalizePath(pathTofile2); 

  const fileObject1 = JSON.parse(fs.readFileSync(normalPath1));
  const fileObject2 = JSON.parse(fs.readFileSync(normalPath2));  
  console.log(fileObject1)
  console.log(fileObject2);

};

export default genDiff;

// genDiff(
//   './file1.json',
//   './file2.json'
// );
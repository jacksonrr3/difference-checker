#!/usr/bin/env node

import { program } from 'commander';
import { genDiff } from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    console.log(genDiff(filepath1, filepath2, format));
  });

program.parse();

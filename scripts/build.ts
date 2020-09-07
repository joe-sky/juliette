import { execSync } from 'child_process';
import { join } from 'path';
import { getDistPath, getProjectPath, rootPath } from './paths';

const projectName = process.argv[2] || 'juliette';

console.log(`Removing old ${projectName} build...`);
execSync(`rm -rf ${getDistPath(projectName)}`);

console.log(`Starting new ${projectName} build...`);

console.log('Compiling TypeScript...');
execSync(`cd ${getProjectPath(projectName)} && tsc`);

console.log('Copying package.json...');
execSync(`cp ${join(getProjectPath(projectName), 'package.json')} ${getDistPath(projectName)}`);

console.log('Copying README.md...');
const readmePath = join(
  projectName === 'juliette' ? rootPath : getProjectPath(projectName),
  'README.md',
);
execSync(`cp ${readmePath} ${getDistPath(projectName)}`);

console.log(`Built ${projectName}`);

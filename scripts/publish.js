const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const {
  projectInfoPath,
  julietteDistPackageJsonPath,
  julietteNgDistPackageJsonPath,
  readmePath,
  julietteDistPath,
  julietteNgDistPath,
  juliettePackageJsonPath,
} = require('./paths');

const isCommitted = execSync('git diff').toString().length === 0;
if (!isCommitted) throw new Error('Please commit or stash changes before publish!');

console.log('Copying README.md to libs...');
execSync(`cp -r ${readmePath} ${julietteDistPath} && cp -r ${readmePath} ${julietteNgDistPath}`, { stdio: 'inherit' });

console.log('Copying package.json to juliette dist...');
execSync(`cp -r ${juliettePackageJsonPath} ${julietteDistPath}`, { stdio: 'inherit' });

const projectInfo = require(projectInfoPath);
const julietteDistPackageJson = require(julietteDistPackageJsonPath);
const julietteNgDistPackageJson = require(julietteNgDistPackageJsonPath);

console.log('Copying project.info to juliette package.json...');
writeFileSync(julietteDistPackageJsonPath, JSON.stringify({ ...julietteDistPackageJson, ...projectInfo }, null, 2));

console.log('Copying project.info to juliette-ng package.json...');
writeFileSync(julietteNgDistPackageJsonPath, JSON.stringify({ ...julietteNgDistPackageJson, ...projectInfo }, null, 2));

console.log('Publishing libs...');
execSync(`cd ${julietteDistPath} && npm publish && cd ${julietteNgDistPath} && npm publish`, { stdio: 'inherit' });

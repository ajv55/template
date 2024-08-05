#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

const projectDir = path.resolve(process.cwd(), projectName);

// Adjust templateDir to be the root of the template project
const templateDir = path.resolve(__dirname, '..');

if (fs.existsSync(projectDir)) {
  console.error(`Directory ${projectName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(projectDir, { recursive: true });

// Copy the content from the template directory to the new project directory
console.log(`Copying files from ${templateDir} to ${projectDir}`);
fs.copySync(templateDir, projectDir, { overwrite: true });
console.log('Files copied successfully.');

process.chdir(projectDir);

console.log('Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('Dependencies installed successfully.');
} catch (error) {
  console.error('Failed to install dependencies:', error.message);
  process.exit(1);
}

console.log('Running Prisma generate...');

// Define the Prisma schema path relative to the new project directory
const prismaSchemaPath = path.join(projectDir, 'prisma', 'schema.prisma');

if (!fs.existsSync(prismaSchemaPath)) {
  console.error('Prisma schema file not found at:', prismaSchemaPath);
  process.exit(1);
}

try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma generate completed successfully.');
} catch (error) {
  console.error('Failed to execute Prisma generate:', error.message);
  process.exit(1);
}

console.log('Project setup completed.');
console.log(`Navigate to your project directory using: cd ${projectName}`);
console.log('Start your project with: npm run dev');
console.log('Happy coding!');













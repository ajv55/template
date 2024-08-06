#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

const templateDir = path.resolve(__dirname, '..'); // Assuming bin is one level down from template
const projectDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(projectDir)) {
  console.error(`Directory ${projectName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(projectDir, { recursive: true });

console.log(`Copying files from ${templateDir} to ${projectDir}`);

// Copy the contents of the template directory to the new project directory
fs.copySync(templateDir, projectDir, { filter: (src) => !src.includes(path.join(__dirname, '..', 'bin')) });

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

// Ensure the Prisma schema path is correct
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

console.log('Project setup completed. Go to your project and use `npm run dev` to start it. Happy coding!');













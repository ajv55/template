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

if (fs.existsSync(projectDir)) {
  console.error(`Directory ${projectName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(projectDir, { recursive: true });

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
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma generate completed successfully.');
} catch (error) {
  console.error('Failed to execute Prisma generate:', error.message);
  process.exit(1);
}

console.log('Checking for missing Prisma files...');
try {
  const prismaPath = path.resolve(projectDir, 'node_modules/.bin/prisma');
  fs.accessSync(prismaPath, fs.constants.F_OK);
  console.log('Prisma binary exists.');
} catch (error) {
  console.error('Prisma binary missing:', error.message);
}

console.log('Project setup completed.');











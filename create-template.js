#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra'); // Using fs-extra for file operations

// Get the project name from the command line arguments
const projectName = process.argv[2];

// Check if the argument is --help or -h and show help message if true
if (projectName === '--help' || projectName === '-h') {
  console.log('Usage: template-genius <project-name>');
  console.log('Creates a new project using the template.');
  console.log('Arguments:');
  console.log('  <project-name>  The name of the project directory to 
create.');
  process.exit(0);
}

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

// Define the template and project directories
const templateDir = path.resolve(__dirname, '..');
const projectDir = path.resolve(process.cwd(), projectName);

// Function to execute a shell command and print its output
const runCommand = (command, options = {}) => {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
};

// Create project directory
if (!fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir, { recursive: true });
} else {
  console.error(`Directory ${projectName} already exists.`);
  process.exit(1);
}

// Copy template files to the new project directory
const copyDirectory = (src, dest) => {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  fs.mkdirSync(dest, { recursive: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

try {
  // Copy files, ensuring not to copy into itself
  if (templateDir !== projectDir) {
    copyDirectory(templateDir, projectDir);
  }

  // Optionally handle specific files like .env or .env.local
  const envFiles = ['.env', '.env.local'];
  envFiles.forEach(file => {
    const srcFile = path.join(templateDir, file);
    const destFile = path.join(projectDir, file);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
    }
  });
} catch (error) {
  console.error('Error copying template files:', error.message);
  process.exit(1);
}

// Change to the new project directory
process.chdir(projectDir);

// Install dependencies
runCommand('npm install');

// Use local Prisma binary to generate Prisma client
const prismaBinary = path.resolve(projectDir, 'node_modules', '.bin', 
'prisma');

if (fs.existsSync(prismaBinary)) {
  console.log('Running Prisma generate...');
  runCommand(`${prismaBinary} generate`);
} else {
  console.error('Prisma binary not found.');
  process.exit(1);
}

// Display success message
console.log(`Project ${projectName} created successfully.`);
console.log(`Navigate to the project directory and start the development 
server:`);
console.log(`cd ${projectName}`);
console.log(`npm run dev`);


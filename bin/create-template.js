const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra'); // Using fs-extra for better file operations

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

const templateDir = path.resolve(__dirname, '..'); // Adjust this if the template is located elsewhere
const projectDir = path.resolve(process.cwd(), projectName);

// Ensure the project directory doesn't already exist
if (fs.existsSync(projectDir)) {
  console.error(`Directory ${projectName} already exists.`);
  process.exit(1);
}

// Create the project directory
fs.mkdirSync(projectDir, { recursive: true });

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
  copyDirectory(templateDir, projectDir);
} catch (error) {
  console.error('Error copying template files:', error.message);
  process.exit(1);
}

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
const prismaBinaryPath = path.resolve(process.cwd(), 'node_modules', 'prisma', 'build', 'index.js');
try {
  execSync(`node ${prismaBinaryPath} generate`, { stdio: 'inherit' });
  console.log('Prisma generate completed successfully.');
} catch (error) {
  console.error('Failed to execute Prisma generate:', error.message);
  process.exit(1);
}

console.log(`Project ${projectName} created successfully.`);
console.log(`Navigate to the project directory and start the development server:`);
console.log(`cd ${projectName}`);
console.log(`npm run dev`);










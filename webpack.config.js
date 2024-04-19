import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to find all JavaScript files in a directory and its subdirectories
function findJavaScriptFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(findJavaScriptFiles(filePath));
    } else if (file.endsWith(".js")) {
      results.push(filePath);
    }
  });
  return results;
}

// Function to generate entry points dynamically
function generateEntryPoints() {
  const entryPoints = {};
  const scriptDir = path.join(__dirname, "public", "scripts");
  const scriptFiles = findJavaScriptFiles(scriptDir);
  scriptFiles.forEach((file) => {
    const entryName = path.basename(file, ".js");
    entryPoints[entryName] = file;
  });
  return entryPoints;
}

// Generate entry points dynamically
const entryPoints = generateEntryPoints();

const config = {
  entry: entryPoints, // Entry point of your application
  output: {
    filename: "[name].js", // Output bundle filename
    path: path.resolve(__dirname, "public", "scripts", "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply babel-loader for .js files
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;

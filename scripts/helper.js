const { readdirSync, mkdirSync, copyFileSync, statSync, readFileSync } = require('fs');
const path = require('path');

const copy = (input, output, fileName) => {
  const inputFile = path.resolve(__dirname, `${input}/${fileName}`);
  const outputFile = path.resolve(__dirname, `${output}/${fileName}`);
  copyFileSync(inputFile, outputFile);
};

const checkElement = (input, name = '', dirCallback = (input, name) => {}, fileCallback = (input, name) => {}) => {
  const elementPath = name ? `${input}/${name}` : input;
  const stats = statSync(path.resolve(__dirname, elementPath), { throwIfNoEntry: false });
  if (!stats) {
    throw new Error(`No element ${elementPath}`);
  }

  if (stats.isDirectory()) {
    dirCallback(input, name);
  } else if (stats.isFile()) {
    fileCallback(input, name);
  }
};

const readFile = (fileName) => {
  try {
    return readFileSync(path.join(__dirname, fileName));
  } catch (e) {
    throw new Error(e);
  }
};

const getParameter = (key) => {
  const argv = process.argv.slice(2);
  const value = argv.find((item) => item.includes(key))?.split('=')[1] || '';
  return value.trim().replace(/"/g, '').replace(/'/g, '');
};

const getFolderPath = (filePath) => {
  const parts = filePath.split('/');
  if (parts[parts.length - 1].includes('.')) {
    return parts.slice(0, -1).join('/');
  }
  return filePath;
};

const checkExistingDir = (elementPath) => {
  const folder = getFolderPath(elementPath);
  let check = false;
  checkElement(folder, '', () => {
    check = true;
  });
  return check;
};

module.exports = { readFile, getParameter, checkExistingDir, checkElement };

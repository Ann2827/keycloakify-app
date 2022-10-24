const { readFile, getParameter, checkExistingDir, checkElement } = require('./helper');
const { readdirSync, writeFileSync } = require('fs');
const path = require('path');
const os = require('os');

const testingTemplate = readFile('./testing.ftl')?.toString('utf-8').split(/\n/);
let themePath = getParameter('--path')
if (!themePath) {
  throw new Error('Missing theme name, for example: --path=build_keycloak/src/main/resources/theme/keycloakify-app/login')
}

themePath = path.join('../', themePath);
const fileName = getParameter('--file')

const fileCallback = (input, name) => {
  if (name !== 'theme.properties') {
    const templateArray = readFile(`${input}/${name}`)?.toString('utf-8').split(/\n/);
    templateArray.splice(6, 0, ...testingTemplate);
    const template = templateArray.reduce((prev, item) => prev + item + '\n', '');

    writeFileSync(path.resolve(__dirname, `${input}/${name}`), template.replace(/\n/g, os.EOL) + os.EOL);
  }
}
if (checkExistingDir(themePath)) {
  if (fileName) {
    checkElement(themePath, fileName, () => {}, fileCallback);
  } else {
    readdirSync(path.resolve(__dirname, themePath)).forEach((name) => {
      checkElement(themePath, name, () => {}, fileCallback);
    });
  }
}

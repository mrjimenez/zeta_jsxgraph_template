# Application template

## NPM (package.json)

```bash
$ mkdir app
$ cd app
$ git init # cria o repositório git.
$ npm init # cria o package.json
...
Press ^C at any time to quit.
package name: (app_template)
version: (1.0.0)
description: Zeta Tecnologia Template App
entry point: (index.js)
test command:
git repository: github:mrjimenez/app_template
keywords: zeta_tecnologia jsxgraph
author: Marcelo Roberto Jimenez
license: (ISC) MIT
About to write to /home/mroberto/mrj/impa/jsxgraph/app_template/package.json:

{
  "name": "app_template",
  "version": "1.0.0",
  "description": "Zeta Tecnologia Template App",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/mrjimenez/app_template.git"
  },
  "keywords": [
    "zeta_tecnologia",
    "jsxgraph"
  ],
  "author": "Marcelo Roberto Jimenez",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/mrjimenez/app_template/issues"
  },
  "homepage": "https://github.com/mrjimenez/app_template#readme"
}


Is this OK? (yes)
...
$ touch README.md .gitignore
$ npm install webpack webpack-cli --save-dev
$ npm install -g live-server
installs...
$ npm list -g --depth=0
$ live-server
```

## Webpack (webpack.config.js)

[Webpack getting started](https://webpack.js.org/guides/getting-started/)

Na configuração default, carrega "/dist/index.html", que tem que incluir "/dist/main.js", que será gerado a partir do que estiver em "/src". "/src/index.js" vai ser o entry point.

```bash
npm install canvas
# "npx webpack" dá no mesmo que "npm run devel"
npm run devel
```

O webpack não precisa de configuração, mas se usar, o arquivo webpack.config.js default é:

```webpack
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

## [Babel](https://babeljs.io/docs/en/usage) (babel.config.js)

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env babel-loader
# npm install --save @babel/polyfill # Não fazer isso! Fazer a linha abaixo!
npm install core-js@3 --save
```

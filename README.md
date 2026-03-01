# 1. Application template <!-- omit in toc -->

- [1. Github Repo](#1-github-repo)
- [2. NPM (package.json)](#2-npm-packagejson)
- [3. Webpack](#3-webpack)
  - [3.1. Babel](#31-babel)
  - [3.2. CSS Loader](#32-css-loader)
  - [3.3. File Loader](#33-file-loader)
  - [3.4. Webpack-dev-server](#34-webpack-dev-server)
- [4. Vite](#4-vite)
  - [4.1. Installation](#41-installation)
  - [4.2. Configuration (vite.config.js)](#42-configuration-viteconfigjs)
  - [4.3. Scripts (package.json)](#43-scripts-packagejson)
  - [4.4. Files removed](#44-files-removed)
  - [4.5. .gitignore](#45-gitignore)

## 1. Github Repo

![master](https://github.com/mrjimenez/zeta_jsxgraph_template/workflows/Node%20CI%20Test/badge.svg)

## 2. NPM (package.json)

```bash
mkdir app
cd app
git init # cria o repositório git.
npm init # cria o package.json
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
touch README.md .gitignore
npm install webpack webpack-cli --save-dev
npm install -g live-server
installs...
npm list -g --depth=0
live-server
```

## 3. Webpack

<https://webpack.js.org/concepts> (webpack.config.js)

[Webpack getting started](https://webpack.js.org/guides/getting-started/)

Na configuração default, carrega "/dist/index.html", que tem que incluir "/dist/main.js", que será gerado a partir do que estiver em "/src". "/src/index.js" vai ser o entry point.

```bash
npm install canvas
# "npx webpack" dá no mesmo que "npm run devel"
npm run devel
```

O webpack não precisa de configuração, mas se usar, o arquivo webpack.config.js default é:

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

Na prática, para usar babel, carregar css, etc, precisa configurar os loaders no webpack. Então, exemplificando pro Babel, fica assim (webpack.config.js):

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
```

### 3.1. Babel

<https://babeljs.io/docs/en/usage>(babel.config.js)

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env babel-loader
# npm install --save @babel/polyfill # Não fazer isso! Fazer a linha abaixo!
npm install core-js@3 --save
```

**babel.config.js**:

```javascript
module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true, },
      },
    ],
  ]
  // const plugins = []

  return {
    presets,
    // plugins,
  }
}
```

### 3.2. CSS Loader

<https://webpack.js.org/loaders/css-loader>

```bash
npm install --save-dev css-loader style-loader
```

**file.css**:

```javascript
import css from 'file.css';
```

**webpack.config.js**:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

### 3.3. File Loader

```bash
npm install --save-dev file-loader
```

```javascript
import img from './file.png';
```

A variável **img** vai ter o nome do arquivo para acessar de dentro do javascript.

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
        },
      },
    ],
  },
};
```

### 3.4. Webpack-dev-server

<https://webpack.js.org/guides/development>

```bash
npm install --save-dev webpack-dev-server
```

**webpack.config.js**:

```javascript
   devServer: {
     contentBase: './dist'
   },
```

## 4. Vite

<https://vitejs.dev>

Vite replaces the entire Webpack + Babel + loaders + webpack-dev-server stack with a single, faster toolchain. Key differences:

- **No loaders needed**: CSS (`import './mycss.css'`), images, and SVGs are handled natively.
- **No Babel config**: Vite uses [esbuild](https://esbuild.github.io/) internally for transpilation — faster and zero-config.
- **`index.html` moves to the project root**: Vite uses it as the entry point directly, instead of living inside `dist/`. The script tag must use `type="module"` pointing to the source file:

```html
<script type="module" src="/src/index.js"></script>
```

### 4.1. Installation

```bash
npm install --save-dev vite
```

Remove the old Webpack/Babel packages (no longer needed):

```bash
npm uninstall @babel/cli @babel/core @babel/preset-env babel-loader \
  css-loader file-loader style-loader \
  webpack webpack-cli webpack-dev-server
```

### 4.2. Configuration (vite.config.js)

Replaces `webpack.config.js` and `babel.config.js`:

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 9000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

### 4.3. Scripts (package.json)

| Old (Webpack) | New (Vite) | Purpose |
| ------------- | ---------- | ------- |
| `npm run devel` | `npm run build` | One-time build |
| `npm run production` | `npm run build` | Production build |
| `npm run start` | `npm run dev` | Dev server with HMR |
| — | `npm run preview` | Preview production build |

```json
"scripts": {
  "dev":     "vite",
  "start":   "vite",
  "build":   "vite build",
  "preview": "vite preview"
}
```

HMR -> Hot Module Replacement — a feature of the dev server that automatically updates only the changed modules in the browser without a full page reload, preserving application state.

### 4.4. Files removed

- `webpack.config.js` — replaced by `vite.config.js`
- `babel.config.js` — no longer needed (esbuild handles transpilation)
- `dist/index.html` — moved to project root as `index.html`

### 4.5. .gitignore

With Webpack, `dist/index.html` was hand-crafted and committed to version control, so `.gitignore` selectively excluded only the generated artifacts inside `dist/`. With Vite, `dist/` is 100% build output — nothing hand-crafted lives there — so the entire folder should be ignored.

Old `.gitignore`:

```gitignore
node_modules
dist/main.js
dist/*.jpg
dist/*.svg
dist/*.png
```

New `.gitignore`:

```gitignore
node_modules
dist
```

Since `dist/index.html` was previously tracked by git, it must be explicitly untracked:

```bash
git rm --cached dist/index.html
```

# webpack-template

This repository is a template for front-end projects using webpack.

Run the following to install the dependencies:

```console
npm install
```

Run the following to remove any unneeded dependencies:

```console
npm uninstall dependency-name
```

replacing dependency-name with the name of the dependency

The following scripts are also included in the package.json file

```console
npm start
```

Starts the development server and runs the code

```console
npm run build
```

Creates the production build

```console
npm run deploy
```

Does a subtree push of the dist folder to the gh-pages branch.

Before running npm run deploy

1.  Remove dist from .gitignore
2.  Run the following commands:

```console
npm run build
```

```console
git add dist && git commit -m "commit-message"
```

replacing commit-message with the desired commit message.

[ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) have been added to the dependencies.

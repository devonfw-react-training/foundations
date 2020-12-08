# [React](https://reactjs.org/) Foundations Training powered by [devonfw](http://devonfw.com/)

## Getting started

### Install prerequisites

#### Git

Check if you have a Git client already installed:

```
git --version
```

If your OS can not recognize this command, install Git. For details please refer to [this page](http://git-scm.com).
When installing under Windows, please make sure you check the following option:

- Use git from Windows command prompt

#### Node.js

All examples have been implemented using [Node.js](https://nodejs.org/) `8.15.0`.

It is highly recommended to install the [Node Version Manager](https://github.com/creationix/nvm) which manages multiple active
[Node.js](https://nodejs.org/) versions on your machine. The latest windows version of nvm can be downloaded [here](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip).

Having the [Node Version Manager](https://github.com/creationix/nvm) installed, install Node.js:

```
nvm install 8.15.0
```

and set it to be used:

```
nvm use 8.15.0
```

#### npm

Having the Node.js installed you have also its package manager - [npm](https://www.npmjs.com/) installed. We have been using the `6.4.1` version of [npm](https://www.npmjs.com/).

Check your current [npm](https://www.npmjs.com/) version:

```
npm --version
```

If it's less than `6.4.1`, then:

```
npm install -g npm@6.4.1
```

### Clone, install dependencies and run

Clone this repository and go to the `00-start` branch:

```
git clone https://github.com/devonfw-react-training/foundations.git -b 00-start
```

Install dependencies using [npm](https://www.npmjs.com/):

```
cd foundations
npm install
```

This may take several minutes...

Start the application:

```
npm start
```

A `Hello World!` web page should open in your default browser.

## [Create React App](https://github.com/facebook/create-react-app)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### How we set up the app

This [React](https://reactjs.org/) project was initially created with:

```
npx create-react-app basics
```

In addition to the initial app we set up the following elements:

- [TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript)

- [Sass](https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet)

- [CSS (Sass) Modules](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)

- Polyfills from [Create React App](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md) and [core-js](https://github.com/zloirock/core-js) to make the app IE11 friendly :)

- [Bootstrap](https://getbootstrap.com/)

- [Enzyme](https://facebook.github.io/create-react-app/docs/running-tests)

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run pretty`

Formats the whole project with [Prettier](https://prettier.io/).

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

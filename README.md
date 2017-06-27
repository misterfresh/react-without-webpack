# React without Webpack

Using ES2015 native modules and HTTP2.

## Usage
```
git clone git@github.com:misterfresh/react-without-webpack.git
cd react-without-webpack
npm install
node server.js
```
Open
```
https://localhost:5000/
```
in a browser with ES2015 native modules enabled. 
Chrome Dev Channel is working, with the Experimental Web Platform flag activated. 

Proceed after the security warning to see the page.

You can edit and add files in the app folder. You can add modules from npm and then import them.

## Path aliasing for imports

If an import is not relative (ie does not start with a point), and does not start with a slash, it is automatically prefixed with "/app". 
```
import routes from 'routes/Routes'
```
becomes
```
import routes from '/app/routes/Routes'
```
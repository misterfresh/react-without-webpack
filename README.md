# React without Webpack

Write and Run. 
No build, no build configuration, no build waiting.
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
I'm using Chrome Canary with the Experimental Web Platform flag activated. Proceed after the security warning to see the page.

## How it works
Vendor dependencies are bundled in an IIFE using Rollup, before development starts.
Then Application code is transpiled on the fly with Babel, and loaded as a module script that imports the application files as native modules.

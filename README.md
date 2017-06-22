# React without Webpack

Write and Run. 
No build, no build configuration, no build waiting.
Using ES2015 native modules and HTTP2.

## Usage
```
git clone react-without-webpack
cd react-without-webpack
yarn install (or npm install )
node server.js
```

Then open localhost:5000 on a browser with ES2015 native modules enabled.
I'm using Chrome Canary with the Experimental Web Platform flag activated.

## How it works
Vendor dependencies are bundled in an IIFE using Rollup, before development starts.
Then Application code is transpiled on the fly with Babel, and loaded as a module script.

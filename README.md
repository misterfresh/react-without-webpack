# React without Webpack

Using ES2015 native modules and HTTP2. Updated with React 16, React-Router 4, Redux, and server side rendering.

![alt text](https://i.imgur.com/2x7DpYz.gif "Pre loading JS modules with HTTP2 push")

## Usage
```
git clone git@github.com:misterfresh/react-without-webpack.git
cd react-without-webpack
npm install
npm run dev
```
Add in etc/hosts file the following (we use a local domain instead of localhost, to put the api server on a subdomain instead of ports) :
```
127.0.0.1			myapp.local
127.0.0.1			api.myapp.local
```
Open
```
https://myapp.local
```
in a browser with ES2015 native modules enabled. 
Chrome Dev Channel is working, with the Experimental Web Platform flag activated. 

Proceed after the security warning to see the page. You will also need to go to api.myapp.local and accept a security exception so that the https backend can also work with the self-signed certificate.

You can edit and add files in the /app folder. You can add modules from npm and then import them.

## Path aliasing for imports

This is configured in the .babelrc file in the project root folder.

## How it works
Some details in this medium article : [React without Webpack](https://medium.com/@antoine.stollsteiner/react-without-webpack-a-dream-come-true-6cf24a1ff766)

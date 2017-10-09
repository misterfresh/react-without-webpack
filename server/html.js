let html = (head, data, initialState) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charSet="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        ${head.title.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
        <link rel="shortcut icon" type="image/x-icon" href="/icons/favicon.ico"/>
        ${head.meta.toString()}
        ${head.link.toString()}
        <link href='/css/bootstrap-reboot.css' rel='stylesheet'/>
        <link href='/css/font-awesome.css' rel='stylesheet'/>
        <script async src="/js/updater.js"></script>
        
        <style>${styles}</style>
        <style data-aphrodite>${data.css.content}</style>
    </head>
    <body>
        <div id="root">${data.html}</div>
        <script type="text/javascript" charset="utf-8">
          window.renderedClassNames = ${JSON.stringify(
            data.css.renderedClassNames
          )}
          window._INITIAL_STATE_ = ${JSON.stringify(initialState)}
        </script>
        <script id="app-entry" type="module" src="/app/entry.js" crossorigin></script>
    </body>
</html>
`
module.exports = html

let styles = `
  *{
      box-sizing: border-box;
  }
  html, body, #root{
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      position: relative;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
  }
`

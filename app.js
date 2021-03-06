var http = require('http');
var url = require('url');

function createPage(title, body) {
  return '\
<!DOCTYPE html>\n\
<html>\n\
  <head>\n\
    <title>' + title + '</title>\n\
  </head>\n\
  <body>' + body + '</body>\n\
</html>';
}

function createGaze(directions) {
  var body;
  if (directions) {
    body = 'どの方向に進む？<ul>';
    if (directions.up) {
      body += '<li><a href="' + directions.up + '">↑</a>'
    }
    if (directions.right) {
      body += '<li><a href="' + directions.right + '">→</a>'
    }
    if (directions.down) {
      body += '<li><a href="' + directions.down + '">↓</a>'
    }
    if (directions.left) {
      body += '<li><a href="' + directions.left + '">←</a>'
    }
    body += '</ul>';
  } else {
    body = 'ゴール！<br /><a href="index.html">トップページへ</a>'
  }
  return createPage('迷路ゲーム', body);
}

var pages = {
  index: createPage('My Web Apps',
    '<a href="maze1.html">迷路ゲーム</a>'),
  '/maze1.html': createGaze({
    down: 'maze2.html'
  }),
  '/maze2.html': createGaze({
    up: 'maze1.html',
    right: 'maze3.html',
    down: 'maze4.html',
    left: 'maze5.html'
  }),
  '/maze3.html': createGaze({
    right: 'maze6.html',
    left: 'maze2.html'
  }),
  '/maze4.html': createGaze({
    up: 'maze2.html',
  }),
  '/maze5.html': createGaze({
    right: 'maze2.html',
  }),
  '/maze6.html': createGaze()
}

var http = require('http');
var port = process.env.PORT || 3000;

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  res.writeHead(200, {'Content-Type': 'text/html'});
  if (pages[pathname]) {
    res.end(pages[pathname]);
  } else {
    res.end(pages.index);
  }
}).listen(port);

console.log('Server running at http://127.0.0.1:' + port + '/');

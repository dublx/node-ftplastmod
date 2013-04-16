Description
===========

A simple means to get a FTP file last modified time.

ftplastmod is a small [node.js](http://nodejs.org/) utility module that relies on [node-ftp](https://github.com/mscdex/node-ftp).

Requirements
============

* [node.js](http://nodejs.org/) -- v0.8.0 or newer
* [node-ftp](https://github.com/mscdex/node-ftp) -- v0.3.1

Install
=======

    npm install ftplastmod


Usage
========

* Use separate ftp options and filepath
```javascript
  var ftplastmod = require('ftplastmod');

  var ftplastmodCallback = function(err, lastModified) {
    if (err) {
      console.error(err);
    } else {
      console.info(lastModified);
    }
  };

  var ftp1 = new ftplastmod({
    ftpOptions: {
      host: 'some.url.net',
      port: 21,
      user: "username", //dont use for public FTP
      password: "Pa$$w0rd" //dont use for public FTP
    },
    filepath: '/path/to/file'
  }, ftplastmodCallback);
  ftp1.on('info', console.log);
  ftp1.on('error', console.error);
```

* Use ftp url with explicit authentication
```javascript
  var ftplastmod = require('ftplastmod');

  var ftplastmodCallback = function(err, lastModified) {
    if (err) {
      console.error(err);
    } else {
      console.info(lastModified);
    }
  };

  var ftp2 = new ftplastmod({
    filepath: 'ftp://username:Pa$$w0rd@some.url.net/path/to/file'
  }, ftplastmodCallback);
  ftp2.on('info', console.log);
  ftp2.on('error', console.error);
```


## License: MIT

```
Copyright (C) 2013 Luis Faustino

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
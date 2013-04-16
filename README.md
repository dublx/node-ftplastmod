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

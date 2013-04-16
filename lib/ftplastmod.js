var FTPClient = require('ftp'),
  url = require('url'),
  events = require('events'),
  util = require('util');

function ftplastmod(options, cb) {
  events.EventEmitter.call(this);
  var ftpOptions, filepath;
  var self = this;
  if (!options) {
    if (cb) return cb(new Error('Missing options object.'), null);
    this.emit('error', new Error('Missing options and callback.'));
  }

  if (!cb) {
    this.emit('error', new Error('Missing a callback.'));
    return;
  }

  if (options.ftpOptions === undefined || options.ftpOptions === null || options.ftpOptions === {}) {
    var parsedUrl = url.parse(options.filepath);
    var auth = parsedUrl.auth.split(':');
    filepath = parsedUrl.pathname;
    ftpOptions = {
      host: parsedUrl.host,
      port: (parsedUrl.port ? parsedUrl.port : 21),
      user: auth[0],
      password: auth[1]
    };
  } else {
    ftpOptions = options.ftpOptions;
    filepath = options.filepath;
  }

  var connOpen = false;
  var c = new FTPClient();
  c.on('error', function(err) {
    if(err.code === 500) return;
    self.emit('error', err);
  });
  c.on('close', function(hadErr) {
    connOpen = false;
    self.emit('info', 'ftp close' + (hadErr? ' (had error)':''));
  });
  c.on('end', function() {
    connOpen = false;
    self.emit('info', 'ftp end');
  });
  c.on('ready', function() {
    self.emit('info', 'ftp ready');
    // list();
    connOpen = true;
    lastMod();
  });

  function lastMod() {
    if (connOpen) {
      c.lastMod(filepath, function(err, lastModified) {
        self.emit('debug', util.format('lastMod callback arguments:', arguments));
        if (cb) cb(err, lastModified);
        if (connOpen) c.end();
      });
    } else {
      if (cb) cb(new Error('Connection closed.'), null);
    }
  }

  c.connect(ftpOptions);

}
util.inherits(ftplastmod, events.EventEmitter);

module.exports = ftplastmod;
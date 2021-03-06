// Generated by CoffeeScript 1.3.3
(function() {
  var connect, reloadStylesheets;

  reloadStylesheets = function() {
    var queryString;
    queryString = '?reload=' + new Date().getTime();
    return $('link[rel="stylesheet"]').each(function() {
      return this.href = this.href.replace(/\?.*|$/, queryString);
    });
  };

  connect = function(opts) {
    var connection;
    if (opts == null) {
      opts = {};
    }
    window.WebSocket || (window.WebSocket = window.MozWebSocket);
    connection = new WebSocket('ws://' + (opts.host || document.domain || 'localhost') + ':' + (opts.port || 8081));
    connection.onopen = function() {
      return console.log("Connected to watcher");
    };
    connection.onerror = function() {
      return console.log("Unable to connect to watcher");
    };
    return connection.onmessage = function(message) {
      switch (message.data) {
        case 'reload-css':
          return reloadStylesheets();
        case 'reload-js':
          return window.location.reload();
      }
    };
  };

  connect();

}).call(this);

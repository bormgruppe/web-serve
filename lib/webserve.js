var connect = require('connect');
var serveStatic = require('serve-static');
var open = require('open');

var getValidProperty = function(object, propertyName, defaultValue) {
    if (object && object.hasOwnProperty(propertyName)) {
        return object[propertyName];
    } else {
        return defaultValue;
    }
};

module.exports = {
    /**
     * Serves static files in a simple webserver and opens the browser
     * @param options specify where and how to serve the files
     * @param options.rootDir document root which will be served (Default: './')
     * @param options.openFilePath path relative to the rootDir which will be opened in the browser (Default: 'index.html')
     * @param options.port port on which the server will listen
     * @param options.callback function which will be called after the browser has been opened
     */
    serveAndOpen: function(options) {

        var rootDir = getValidProperty(options, 'rootDir', './');
        var openFilePath = getValidProperty(options, 'openFilePath', 'index.html');
        var port = getValidProperty(options, 'port', 8000);
        var callback = getValidProperty(options, 'callback', null);

        connect()
            .use(serveStatic(rootDir))
            .listen(port, function() {
                var openPath = 'http://localhost:' + port + '/' + openFilePath;
                open(openPath);
                if (callback) {
                    callback();
                }
            });
    }
};

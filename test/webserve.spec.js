var rewire = require('rewire');

var webserve = rewire('../lib/webserve.js');

describe('serveAndOpen', function(){

    var openFake, staticFake, connectFake, app;

    beforeEach(function(){
        openFake = jasmine.createSpy("open");

        app = {};
        connectFake = jasmine.createSpy("connect").andReturn(app);
        app.use = jasmine.createSpy("use").andReturn(app);
        app.listen = jasmine.createSpy("listen").andCallFake(function(port, callback) {
            callback();
            return app;
        });


        staticFake = jasmine.createSpy("static");

        webserve.__set__("open", openFake);
        webserve.__set__("connect", connectFake);
        webserve.__set__("static", staticFake);
    });


    it('should serve the current directory by default', function(){
        webserve.serveAndOpen();
        expect(staticFake).toHaveBeenCalledWith('./');
    });

    it('should serve the rootDir if specified', function(){
        var testDir = './some/other/dir';
        webserve.serveAndOpen({
           rootDir: testDir
        });
        expect(staticFake).toHaveBeenCalledWith(testDir);
    });

    it('should listen on port 8080 by default', function(){
        webserve.serveAndOpen();
        expect(app.listen.mostRecentCall.args[0]).toEqual(8080);
    });

    it('should listen on specified port if specified', function(){
        var testPort = 812304;
        webserve.serveAndOpen({
            port: testPort
        });
        expect(app.listen.mostRecentCall.args[0]).toEqual(testPort);
    });

    it('should open index.html by default', function(){
        webserve.serveAndOpen();
        expect(openFake).toHaveBeenCalledWith('http://localhost:8080/index.html');
    });

    it('should open the specified path if specified', function(){
        var testPath = 'some/other/path/somefile.php';
        webserve.serveAndOpen({
            openFilePath: testPath
        });
        expect(openFake).toHaveBeenCalledWith('http://localhost:8080/' + testPath);
    });

    it('should call the callback if specified', function(){
        var callback = jasmine.createSpy('fakeCallback');
        webserve.serveAndOpen({
            callback: callback
        });
        expect(callback).toHaveBeenCalled();
    });

});
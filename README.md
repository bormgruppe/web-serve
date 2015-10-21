# web-serve
Simplest way to run a web server and open the browser at a specific location

## Usage

    var webserve = require('web-serve');
    
    webserve();

This will serve the current directory on port 8080 and open `http://localhost:8080/index.html` in your standard browser.

## Options
    webserve({
        rootDir: './some/path', // relative path to the directory which shall be served (Default: './')
        openFilePath: 'some/path/example.php', // path to file which will be opened in the browser (relative to the rootDir) (Default: index.html)
        port: 8888, // port on which the server listens (Default: 8080)
        callback: function(){console.log('browser opened');} // executed after browser opened 
    }


## License
This library is licensed under the MIT license.
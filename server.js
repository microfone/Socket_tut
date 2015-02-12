var http = require("http");
var url = require('url');
var fs = require('fs');

var aux;

var server = http.createServer(function(request, response){
    console.log('Connection');
    var path = url.parse(request.url).pathname;

    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('hello world');
            break;
        case '/socket.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(500);
                    response.write("opps this doesn't exist - 404- 1");
                }
                else{
					response.writeHead(200, {'Content-Type': 'text/html'});
                    response.write(data);
					for (var i =0; i<data.length; i++){
						response.write(data[i]);
					}
					console.log(data);
                }
            });
            break;
		case '/socket.txt':
			fs.readFile(__dirname + path, function(error, data){
				if(error){
					response.writeHead(500);
					response.write("erro ao abrir " + path);
				}else{
					response.writeHead(200);
					aux = response.write(data);
					console.log(data.toString());
					console.log(aux);
				}
			});
			break;
        default:
            response.writeHead(500);
            response.write("opps this doesn't exist - 404- 2");
            break;
    }
    response.end();
});

server.listen(8001);
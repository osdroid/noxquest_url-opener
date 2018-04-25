const http = require('http');
const fs = require('fs');
const WebSocketServer = require('websocket').server;

const server = http.createServer((request, response) => {
    const url = request.url;
    if (url === '/' || url === '/index.html') {
	response.setHeader('Content-Type', 'text/html');
	fs.createReadStream('index.html').pipe(response);
    } else if (url === '/codigo.js') {
	response.setHeader('Content-Type', 'application/javascript');
	fs.createReadStream('codigo.js').pipe(response);
    } else {
	response.setHeader('Content-Type', 'text/html');
	var solicitud = null;
	if (url.startsWith("/abrir/?")) {
	    const reqUrl = url.substring(8);
	    solicitud = reqUrl;
	    if (!reqUrl.startsWith("http"))
		solicitud = "http://" + solicitud;
	} else if (url.startsWith("/google/?")) {
	    const reqGoogle = url.substring(9);
	    solicitud = "https://www.google.com.mx/search?q=" + reqGoogle;
	} else if (url.startsWith("/stack/?")) {
	    const reqStack = url.substring(8);
	    solicitud = "https://www.stackoverflow.com/search?q=" + reqStack;
	}
	if (solicitud) {
	    console.log((new Date()) + " > " + solicitud);
	    wsClients.forEach(e => e.sendUTF(JSON.stringify({url: solicitud})));
	}
	response.end('OK\n');
    }
});
const wsServer = new WebSocketServer({ httpServer: server });
var wsClients = [];
wsServer.on('request', request => {
    const wsClient = request.accept(null, request.origin);
    const clientIp = request.remoteAddress;
    wsClients.push(wsClient);
    console.log((new Date()) + " Connected [" + clientIp + "]");
    wsClient.on('close', () => {
	wsClients = wsClients.filter(e=>e !== wsClient);
	console.log((new Date()) + " Disconnected [" + clientIp + "]");
    });
});
console.log("Listening on port 20,000");
server.listen(20000);

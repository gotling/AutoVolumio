var io=require('socket.io-client');

var socket= io.connect('http://10.0.10.100:3000');

var event = process.argv[2];
var message = process.argv[3];

console.log("EVENT: "+event);
console.log("MESSAGE: "+message);

//Report successful connection
socket.on('connect', function () {
	console.log('Client Connected');
});

//Report disconnection
socket.on('disconnect', function () {
	console.log('Client Disconnected');
});

//Notify on player state changes, this includes volume changes, songs etc
socket.on('pushState', function (data) {
	console.log(data);
});

socket.emit('createPlaylist', 'Today');

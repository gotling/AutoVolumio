var io=require('socket.io-client');

var socket= io.connect('http://10.0.10.100:3000');

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//Report successful connection
socket.on('connect', function () {
	console.log('Client Connected');
});

//Report disconnection
socket.on('disconnect', function () {
	console.log('Client Disconnected');
});

//Notify on player state changes, this includes volume changes, songs etc
/*socket.on('pushState', function (data) {
	console.log(data);
});
*/
socket.on('pushState', function (data) {
	console.log(data.volume);
});

socket.on('pushCreatePlaylist', function (data) {
	console.log(data);
});
/*
socket.on('pushListPlaylist', function (data) {
	console.log(data);
});
*/

socket.on('pushBrowseLibrary', function (data) {
	var items = data.navigation.lists[0].items;
	console.log(typeof items, items);
	var item = items[0];
	console.log(typeof item, item);
	console.log(item.type);
	//var item = JSON.parse(data.navigation.lists[0].items[0]);
	//console.log(item);
	//console.log(item.type);
	/*

	if (items[0].type == 'song') {
		addToPlayList("Today", data.navigation.lists[0].items);
	} else {
		var random_index = getRandomInt(0, items.length);
		console.log("Random index: " + random_index);
		socket.emit('browseLibrary', {"uri": data.navigation.lists[0].items[random_index].uri});
	}*/
});

socket.on('pushBrowseSources', function (data) {
	console.log(data);
});
/*
socket.on('pushAddToPlaylist', function (data) {
	console.log(data);
});
*/


socket.emit('deletePlaylist', {"value": "Today"});
socket.emit('listPlaylist', '');
socket.emit('createPlaylist', {"name": "Today"});

// mnt/USB/DELTITNU/Music/
socket.emit('browseLibrary', {"uri": "music-library/USB/DELTITNU/Music/02-Lunch"});
//socket.emit('addToPlaylist', {"name": "Today", "service": "mpd", "uri": "music-library/USB/DELTITNU/Music/02-Lunch/Lisa Miskovsky/2013 - Umeå/11 - Lisa Miskovsky - Little Islet Cape.mp3"});
//socket.emit('playPlaylist', {"name": "Today"});


function addToPlayList(playlist_name, items) {
	for (var i = 0; i < items.length; i++) {
		socket.emit('addToPlaylist', {"name": playlist_name, "service": "mpd", "uri": items[i].uri});
	}
	console.log("Added %s songs to playlist", items.length);
}

//addToPlayList('Today', 'music-library/USB/DELTITNU/Music/02-Lunch/Lisa Miskovsky/2013 - Umeå');

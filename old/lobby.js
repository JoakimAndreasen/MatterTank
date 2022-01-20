// function createLobby() {
// 	// if (!isNaN(lobbyNumber)) {
// 	// 	socket.leave(lobbyNumber);
// 	// }

// 	let start = 10000;
// 	let range = 99999;

// 	lobbyNumber = Math.floor(Math.random() * (range - start) + start);
// 	lobbyNumber = lobbyNumber.toString();
// 	return lobbyNumber;
// }

// function joinLobby() {
// 	/* if (!isNaN(room)) {
//     console.log(`socket ${id} has joined room ${room}`);
//     lobbys[room].players.push(id);
//     io.sockets.to(id).emit("lobbyID", room);

//     io.sockets.to(id).emit("sendChat", lobbys[room].chat);

//     if (lobbys[room].players.length == 1) {
//       lobbys[room].player1 = id;
//       io.sockets.to(id).emit("spectator", false);
//       resetScore(room);
//     } else if (lobbys[room].players.length == 2) {
//       lobbys[room].player2 = id;
//       io.sockets.to(id).emit("spectator", false);
//       resetScore(room);
//     } else {
//       io.sockets.to(id).emit("spectator", true);
//     }
//   }
//   return; */
// }

// function leaveLobby(room, id) {
// 	/* console.log(`socket ${id} has left room ${room}`);
//   //remove player from player list
//   lobbys[room].players = lobbys[room].players.filter((val, index, arr) => {
//     return val != id;
//   });

//   if (
//     (id == lobbys[room].player1 || id == lobbys[room].player2) &&
//     lobbys[room].players.length > 1
//   ) {
//     lobbys[room].player1 = lobbys[room].players[0];
//     lobbys[room].player2 = lobbys[room].players[1];
//     io.sockets.to(lobbys[room].player1).emit("spectator", false);
//     io.sockets.to(lobbys[room].player2).emit("spectator", false);
//     resetScore(room);
//   } else if (id == lobbys[room].player1) {
//     lobbys[room].player1 = "";
//   } else if (id == lobbys[room].player2) {
//     lobbys[room].player2 = "";
//   }

//   //filter spectators to remove current player
//   let asArray = Object.entries(lobbys[room].spectators);
//   asArray = asArray.filter(([key, val]) => {
//     return (
//       key != id && !(key == lobbys[room].player1 || key == lobbys[room].player2)
//     );
//   });

//   lobbys[room].spectators = Object.fromEntries(asArray);
//   io.sockets
//     .to(room)
//     .emit("spectators", Object.values(lobbys[room].spectators)); */
// }

// function switchLobby(newLobby) {
// 	/* if (typeof lobbys[newLobby] !== "undefined") {
//     if (!isNaN(lobbyNumber)) {
//       socket.leave(lobbyNumber);
//     }
//     socket.join(newLobby);

//     lobbyNumber = newLobby;
//   } else {
//     console.log("Lobby does not exist");
//   } */
// }

// module.exports = {
// 	createLobby,
// 	joinLobby,
// 	leaveLobby,
// 	switchLobby,
// };

import express from "express";
import {Server as socket} from "socket.io";
import session from "express-session";
import { connectFour } from "/Users/niceo/Documents/connect-4-online/game.js";
import e from "express";
const app = express();
const port = 3000;
const server = app.listen(port);
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
const sessionMiddleware = session({
    secret: "changeit",
    resave: true,
    saveUninitialized: true
  });


let users = {};
let matches = [];

function hostHasRoom(host){
  for (const m of matches){
    if (m.host === host)
      return true;
  }
  return false;
}
function getRoomFromHost(host){
  for (const r of matches){
    if (r.host === host){
      return r;
    }
  }
  return undefined;
}
function getRoomFromId(id){
  for (const r of matches){
    if (r.id === id){
      return r;
    }
  }
  return undefined;
}
function removeRoom(sessionID){
  for (const [i,v] of matches.entries()){
    if (v.host === sessionID){
      matches.splice(i,1);
      break;
    }
  }
}

app.use(sessionMiddleware);
app.use(express.static('public'));
app.set("view engine", "ejs");

const io = new socket(server);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
    if (users[socket.request.sessionID] === undefined)
      users[socket.request.sessionID] = {name: ("Guest"+ Object.keys(users).length)}

    io.emit("updateuserlist", users);

    socket.on("disconnect", function() {
        //On disconnect remove user from users
        delete users[socket.request.sessionID]; 
        removeRoom(socket.request.sessionID);
        io.emit("updateuserlist", users);
    });

    socket.on("changesize", function(size) {
      if (hostHasRoom(socket.request.sessionID)){
        let room = getRoomFromHost(socket.request.sessionID);
        room.size = size;
        room.createGrid();
        io.emit("sizechanged", room);
      }
    });

    socket.on("getgrid" , function(id) {
      socket.emit("sizechanged", getRoomFromId(id));
    });

    socket.on("cellclicked", function(data){
      let {row, column, match} = data;
      let room = getRoomFromId(match);
      if (socket.request.sessionID === room.host && room.isHostMove()){
        console.log("host made a move");
        let move = room.move(row,column,"Y")
        let hasWon = room.checkWinner();
        if (hasWon !== 0){
          io.emit("winner", {winner: "Player 1", room: match});
        }
        if (move !== undefined)
        {
          io.emit("movemade", {r: move.r, c: move.c, color: "yellow", room: match});
          room.hostMove = false;
        }
      }
      else if(socket.request.sessionID === room.opponent && !room.isHostMove()){
        console.log("opponent made a move");
        let move = room.move(row,column,"R")
        let hasWon = room.checkWinner();
        if (hasWon !== 0){
          io.emit("winner", {winner: "Player 2", room: match});
        }
        if (move !== undefined)
        {
          io.emit("movemade", {r: move.r, c: move.c, color: "red", room: match});
          room.hostMove = true;
        }
      }
      else{
        console.log("not players move");
      }
    })
})

app.get("/", (req, res) => {
  res.render("pages/index");
});

//when create room button is pressed
app.post("/createroom", (req, res) => {
  if (!hostHasRoom(req.sessionID)){
    let match = new connectFour(req.sessionID,7);
    match.createGrid();
    matches.push(match);
    res.redirect(`room?id=${match.id}`);
  }
  else{
    let room = getRoomFromHost(req.sessionID);
    res.redirect(`room?id=${room.id}`);
  }
});


app.get("/room", (req, res) => {
  let room = getRoomFromId(req.query.id);
  if (room !== undefined){
    if (room.host === req.sessionID){
      res.render("pages/room", {grid: room.grid});
    }else if(room.opponent === undefined){
      room.opponent = req.sessionID;
      res.render("pages/roomuser", {grid: room.grid});
    }
    else{
      res.redirect("/");
    }
  }
  else{
    res.redirect("/");
  }
})





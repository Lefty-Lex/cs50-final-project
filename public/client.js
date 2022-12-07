let socket = io();

socket.on("updateuserlist", function(users) {
    let playerList = document.getElementsByClassName("player-list")[0];
    playerList.innerHTML = "";
    for (const [key, value] of Object.entries(users)) {
      let tmpUser = document.createElement("li");
      tmpUser.innerHTML = value.name;
      playerList.appendChild(tmpUser);
        //console.log("user : " + value.name);
      }
});

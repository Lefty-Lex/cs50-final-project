const params = new URLSearchParams(window.location.search)
socket.emit("getgrid", params.get("id"));

socket.on("hostleft", function (roomId) {
    if (params.get('id') === roomId){
      document.location.href = '/';
    }
});

socket.on("sizechanged", function (data) {
    if (params.get('id') === data._id){
        console.log("making grid");
        createBoard(data._grid);
    }
});

function findCoin(row, column){
    let parent = document.getElementsByClassName("board")[0].children;
    for (var i = 0; i < parent.length; i++) {
        var tableChild = parent[i];
        if (tableChild.id === "[" + row + "][" + column + "]"){
            return tableChild;
        }
      }
      return undefined
}

socket.on("movemade", function(data){
    if (params.get("id") === data.room){
        let coin = findCoin(data.r, data.c);
        coin.style.backgroundColor = data.color;
        let turn = document.getElementsByClassName("team")[0];
        if (data.color === "red"){
            turn.innerHTML = "Yellows turn";
        }else{
            turn.innerHTML = "Reds turn";
        }
    }
});

socket.on("winner", function(data){
    if (params.get("id") === data.room){
        alert(data.winner);
    }
});


function createBoard(board){
    let placeIn = document.getElementsByClassName("board")[0];
    placeIn.innerHTML = "";
    placeIn.style.setProperty("--grid-rows" , board.length);
    placeIn.style.setProperty("--grid-cols", board.length);
    for (const [i,r] of board.entries()){
        for (const [v,c] of r.entries()){
            let tmpCell = document.createElement("div");
            if (c === "Y"){
                tmpCell.style.backgroundColor = "yellow";
            }else if (c === "R"){
                tmpCell.style.backgroundColor = "red";
            }
            tmpCell.addEventListener("click", () => {
                socket.emit("cellclicked", {row: i, column: v, match: params.get("id")});
            });
            tmpCell.id = "[" + i + "][" + v + "]";
            placeIn.appendChild(tmpCell).className = "grid-item";
        }
    }
}


  
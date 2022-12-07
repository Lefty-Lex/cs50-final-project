import crypto from "crypto";

export class connectFour{
  constructor(host, size){
    this._status = "creating";
    this._hostMove = true;
    this._host = host;
    this._size = size;
    this._opponent = undefined;
    this._grid = [];
    this._id = crypto.randomBytes(20).toString('hex');
    this._creatingGrid = false;
  }

  checkLine(a,b,c,d) {
    if (a == 0){
      return false;
    }
    return ((a !== "E") && (a == b ) && (a == c) && (a == d));
  }

  checkWinner() {
    // Check down
    for (let r = 0; r < this._size - 3; r++)
        for (let c = 0; c < this._size; c++)
            if (this.checkLine(this._grid[r][c], this._grid[r+1][c], this._grid[r+2][c], this._grid[r+3][c]))
                return this._grid[r][c];

    // Check right
    for (let r = 0; r < this._size; r++)
        for (let c = 0; c < this._size - 3; c++)
            if (this.checkLine(this._grid[r][c], this._grid[r][c+1], this._grid[r][c+2], this._grid[r][c+3]))
                return this._grid[r][c];

    // Check down-right
    for (let r = 0; r < this._size - 3; r++)
        for (let c = 0; c < this._size - 3; c++)
            if (this.checkLine(this._grid[r][c], this._grid[r+1][c+1], this._grid[r+2][c+2], this._grid[r+3][c+3]))
                return this._grid[r][c];

    // Check down-left
    for (let r = 3; r < this._size; r++)
        for (let c = 0; c < this._size - 3; c++)
            if (this.checkLine(this._grid[r][c], this._grid[r-1][c+1], this._grid[r-2][c+2], this._grid[r-3][c+3]))
                return this._grid[r][c];

    return 0;
}

  move(row, column, color){
    for (const [i, r] of this._grid.entries())
    {
      for (const [v, c] of r.entries()){
        if (v == column){
        }
        if (v == column && (c === "Y" || c === "R")){
           if (i === 0){
            return undefined;
           }else{
            this._grid[i-1][v] = color;
            return {r: i-1, c: v};
           }
        }else if (v == column && (c === "E") && i === this._size - 1){
          this._grid[i][v] = color;
          return {r: i, c: v};
        }
      }
    }
  }

  get host(){
    return this._host;
  }
  get size(){
    return this._size;
  }
  get grid(){
    return this._grid;
  }
  set size(s){
    this._size = s;
  }
  get opponent(){
    return this._opponent;
  }
  set opponent(opp){
    this._opponent = opp;
  }
  get id(){
    return this._id;
  }
  get status(){
    return this._status;
  }
  isHostMove(){
    return this._hostMove;
  }
  set hostMove(v){
    this._hostMove = v;
  }


  createGrid(){
    this._creatingGrid = true;
    this._grid = [];
    for (let c = 0; c < this._size; c++){
      let tmpGrid = []
      for (let r = 0; r < this._size; r++){
        tmpGrid.push("E");
      }
      this._grid.push(tmpGrid);
    }
    this._creatingGrid = false;
  }


}
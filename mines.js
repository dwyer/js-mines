function Field(size, mines) {
  this.size = size;
  this.mines = mines;
  this.initTable();
  this.initMines();
  this.armMines(this.mines);
  this.initCheats();
}


Field.prototype.initTable = function () {
  this.table = document.createElement('table');
  for (var row = 0; row < this.size; row++) {
    this.table.insertRow(row);
    for (var col = 0; col < this.size; col++) {
      this.table.rows[row].insertCell(col);
    }
  }
  document.body.appendChild(this.table);
};


Field.prototype.initCheats = function () {
  var field = this;
  var showMinesButton = document.createElement('button');
  showMinesButton.innerHTML = 'Show mines';
  showMinesButton.onclick = function () {
    field.showMines();
  };
  document.body.appendChild(showMinesButton);
};


Field.prototype.initMines = function () {
  var field = this; // for mine.onclick
  for (var row = 0; row < this.size; row++) {
    for (var col = 0; col < this.size; col++) {
      var mine = document.createElement('button');
      mine.row = row;
      mine.col = col;
      mine.armed = false;
      mine.number = 0;
      mine.onclick = function () {
        if (this.armed) {
          alert('Game over!'); // TODO: handle game over
        } else {
          field.disarmMine(this.row, this.col);
        }
      };
      this.getCell(row, col).appendChild(mine);
    }
  }
};


Field.prototype.showMines = function () {
  for (var row = 0; row < this.size; row++) {
    for (var col = 0; col < this.size; col++) {
      if (!!this.getMine(row, col) && this.isArmed(row, col)) {
        this.getMine(row, col).innerHTML = '<span style="color:red;">&times;</span>';
      }
    }
  }
};


/**
 * Arm n random mines.
 */
Field.prototype.armMines = function (n) {
  while (n > 0) {
    var row = Math.floor(Math.random() * this.size);
    var col = Math.floor(Math.random() * this.size);
    if (!this.isArmed(row, col)) {
      this.armMine(row, col);
      n--;
    }
  }
};


Field.prototype.armMine = function (row, col) {
  for (var i = -1; i <= 1; i++) {
    if (this.inRange(row + i)) {
      for (var j = -1; j <= 1; j++) {
        if (this.inRange(col + j)) {
          var mine = this.getMine(row + i, col + j);
          if (i == 0 && j == 0) {
            mine.armed = true;
          } else {
            mine.number++;
          }
        }
      }
    }
  }
};


Field.prototype.inRange = function (n) {
  return n >= 0 && n < this.size;
};


Field.prototype.isArmed = function (row, col) {
  return this.getMine(row, col).armed;
};


Field.prototype.getCell = function (row, col) {
  return this.table.rows[row].cells[col];
};


Field.prototype.getMine = function (row, col) {
  return this.getCell(row, col).firstChild;
};


Field.prototype.disarmMine = function (row, col) {
  var mine = this.getMine(row, col);
  if (mine.number) {
    mine.parentNode.replaceChild(document.createTextNode(mine.number), mine);
  } else {
    mine.parentNode.removeChild(mine);
    for (var i = -1; i <= 1; i++) {
      if (this.inRange(row + i)) {
        for (var j = -1; j <= 1; j++) {
          if (this.inRange(col + j)) {
            if (!!this.getMine(row + i, col + j)) {
              //this.disarmMine(row + i, col + j);
            }
          }
        }
      }
    }
  }
};


window.onload = function () {
  var field = new Field(8, 10);
};


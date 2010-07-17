function Field(size, mines) {
  this.size = size;
  this.mines = mines;
  this.table = document.createElement('table');
  for (var row = 0; row < this.size; row++) {
    this.table.insertRow(row);
    for (var col = 0; col < this.size; col++) {
      this.table.rows[row].insertCell(col);
    }
  }
}


window.onload = function () {
  var field = new Field(8, 10);
  document.body.appendChild(field.table);
};


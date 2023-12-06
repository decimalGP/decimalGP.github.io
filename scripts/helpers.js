class Helper {
  static getRowAndTable(cell) {
    let row = cell.parentElement;
    let body = row.parentElement;
    let table = body.parentElement;
    return [row, table];
  }

  static getDropTable(elementList) {
    for (let i = 0; i < elementList.length; i++) {
      let cell = elementList[i];
      if (cell == null || cell.nodeName.toLowerCase() !== "td") continue;

      var [row, table] = this.getRowAndTable(cell);
      if (row.nodeName.toLowerCase() === "th") continue;

      if (table.classList.contains("droppableTable")) return [cell, row, table];
    }

    return null;
  }

  // Remove correct and incorrect style for row (for the reset button)
  static removeRowDisplay(row) {
    var cells = row.getElementsByTagName("td");
    for (var i = 0; i < cells.length - 1; i++) {
      cells[i].classList.remove("correct");
      cells[i].classList.remove("incorrect");
    }
  }

  /// Set the display of the row according to the value
  static setRowCorrect(row, value) {
    var cells = row.getElementsByTagName("td");
    if (value == true) {
      // Minus one to exclude the button column
      for (var i = 0; i < cells.length - 1; i++) {
        cells[i].classList.remove("incorrect");
        cells[i].classList.add("correct");
      }
    } else {
      for (var i = 0; i < cells.length - 1; i++) {
        cells[i].classList.remove("correct");
        cells[i].classList.add("incorrect");
      }
    }
  }
}

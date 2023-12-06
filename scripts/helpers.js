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
    row.classList.remove("correct");
    row.classList.remove("incorrect");
  }

  /// Set the display of the row according to the value
  static setRowCorrect(row, value) {
    if (value == true) {
      row.classList.remove("incorrect");
      row.classList.add("correct");
    } else {
      row.classList.remove("correct");
      row.classList.add("incorrect");
    }
  }
}

class TargetTable extends Table {
  constructor(table, sourceTables, manager) {
    super();

    this.manager = manager;
    manager.targetTable = this;

    this.sourceTables = sourceTables;
    let data = this.createDataTable(sourceTables);
    this.initHTML(data, table);
    this.resizeColumns();
  }

  // Resize the target table columns to match the source table columns
  resizeColumns() {
    let columnIndex = 0;
    for (let i = 0; i < this.sourceTables.length; ++i) {
      for (let j = 0; j < this.sourceTables[i].data[0].length; ++j) {
        const width = this.sourceTables[i].table.rows[1].cells[j].offsetWidth;
        let cell = this.table.rows[1].cells[columnIndex];
        cell.style.width = `${width}px`;

        columnIndex++;
      }
    }

    // Add button column at the end of the table
    var rows = this.table.getElementsByTagName("tr");
    // Start at 1 to ignore the header row
    for (var i = 1; i < rows.length; i++) {
      this.addResetButton(rows[i], i);
    }
  }

  addResetButton(row, id) {
    // Anonymous function can not access class reference directly :vv
    const self = this; 
    var cell = row.insertCell(-1);
    var button = document.createElement("button");
    button.className = "reset-button"; // For the button style
    button.innerHTML = "Reset";
    button.onclick = function () {
      var cells = row.getElementsByTagName("td");
      Helper.removeRowDisplay(row);
      self.manager.errorList.removeError(id)
      // Minus one to exclude the button column
      for (var i = 0; i < cells.length - 1; i++) {
        cells[i].innerHTML = "-";
      }
    };
    cell.appendChild(button);
  }

  // Needs to override in child classes
  createDataTable(sourceTables) {
    return [];
  }
}

class TargetTable extends Table {
  constructor(table, sourceTables) {
    super();

    this.sourceTables = sourceTables;
    let data = this.createDataTable(sourceTables);
    this.initHTML(data, table);
    this.resizeColumns();
  }

  // Resize the target table columns to match the source table columns
  resizeColumns() {
    let columnIndex = 0;
    for (let i=0; i<this.sourceTables.length; ++i) {
      for (let j=0; j<this.sourceTables[i].data[0].length; ++j) {
        const width = this.sourceTables[i].table.rows[1].cells[j].offsetWidth;
        let cell = this.table.rows[1].cells[columnIndex];
        cell.style.width = `${width}px`;

        columnIndex++;
      }
    }
  }

  /// Set the display of the row according to the value
  static setRowCorrect(row, value) {
    if (value == true) {
      row.classList.remove("incorrect");
      row.classList.add("correct");
    }
    else {
      row.classList.remove("correct");
      row.classList.add("incorrect");
    }
  }

  // Needs to override in child classes
  createDataTable(sourceTables) {
    return [];
  }
}
class FullOuterJoinSourceTable extends SourceTable {
  constructor(data, table, errorList, manager, compareColumns, startColumn) {
    super(data, table, errorList, manager);

    this.compareColumns = compareColumns;
    this.startColumn = startColumn;
  }

  updateTargetRow() {
    super.updateTargetRow();

    // Fill in the html values for the target table's row
    for (let i = this.startColumn; i < this.startColumn + this.data[0].length; ++i) {
      this.targetRow.cells[i].innerHTML = this.draggingElement.cells[i - this.startColumn].innerHTML;
    }

    const compareCell1 = this.targetRow.cells[this.compareColumns[0]].innerHTML;
    const compareCell2 = this.targetRow.cells[this.compareColumns[1]].innerHTML;
    if (compareCell1 === "-" || compareCell2 == "-") {
      this.targetRow.classList.remove("incorrect");
      this.targetRow.classList.remove("correct");
    }
    // If there is no match in the left source table, set row to true since it's full outer join
    if (!this.keyExistInOtherTable(compareCell2) && compareCell1 == "-" && this.sourceIndex == 1) {
      SourceTable.setRowCorrect(this.targetRow, true);
      this.errorList.removeError(this.targetRowID);
    }
    // If there is no match in the right source table, set row to true
    else if (!this.keyExistInOtherTable(compareCell1) && this.sourceIndex == 0) {
      SourceTable.setRowCorrect(this.targetRow, true);
      this.errorList.removeError(this.targetRowID);
    }
    // Standard matching id check 
    else {
      if (compareCell1 === compareCell2) {
        SourceTable.setRowCorrect(this.targetRow, true);
        this.errorList.removeError(this.targetRowID);
      }
      else if (this.sourceIndex == 0 && compareCell2 != "-" || this.sourceIndex == 1 && compareCell1 != "-") {
        SourceTable.setRowCorrect(this.targetRow, false);

        this.errorList.addError(
          this.targetRowID,
          "Error on row " + this.targetRowID + ": Employee.DepartmentID != Department.DepartmentID",
          "Press the reset button next to row " + this.targetRowID + " to try again"
        );
      }
    }
  }
  keyExistInOtherTable(key) {
    if (this.sourceIndex === 0) {
      for (let i = 1; i < this.manager.sourceTables[1].data.length; i++) {
        if (key == this.manager.sourceTables[1].data[i][0]) {
          return true
        }
      }
      return false
    }
    else {
      for (let i = 1; i < this.manager.sourceTables[0].data.length; i++) {
        if (key == this.manager.sourceTables[0].data[i][2]) {
          return true
        }
      }
      return false
    }
  }
}
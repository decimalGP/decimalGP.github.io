class InnerJoinSourceTable extends SourceTable {
  constructor(data, table, errorList, manager, compareColumns, startColumn) {
    super(data, table, errorList, manager);

    this.compareColumns = compareColumns;
    // The column where the columns in this table start in the target table
    this.startColumn = startColumn; 
  }

  updateTargetRow() {
    super.updateTargetRow();

    // Fill in the html values for the target table's row
    for (let i=this.startColumn; i<this.startColumn + this.data[0].length; ++i) {
      this.targetRow.cells[i].innerHTML = this.draggingElement.cells[i - this.startColumn].innerHTML;
    }

    const compareCell1 = this.targetRow.cells[this.compareColumns[0]].innerHTML;
    const compareCell2 = this.targetRow.cells[this.compareColumns[1]].innerHTML;
    if (compareCell1 === "-" || compareCell2 == "-") {
        this.targetRow.classList.remove("incorrect");
        this.targetRow.classList.remove("correct");
    }
    else {
      if (compareCell1 === compareCell2) {
        Helper.setRowCorrect(this.targetRow, true);

        this.errorList.removeError(this.targetRowID);
      }
      else {
        Helper.setRowCorrect(this.targetRow, false);

        this.errorList.addError(
          this.targetRowID,
          "Error on row " + this.targetRowID + ": Books.AuthorID != Authors.ID",
          "Press the reset button next to row " + this.targetRowID + " to reset the row"
        );
      }
    }
  }
}
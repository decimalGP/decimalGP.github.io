class InnerJoinSourceTable extends SourceTable {
  constructor(data, table, errorList, compareColumns, startColumn) {
    super(data, table, errorList);

    this.compareColumns = compareColumns;
    this.startColumn = startColumn;
  }

  updateTargetRow() {
    super.updateTargetRow();

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
        this.targetRow.classList.add("correct");
        this.targetRow.classList.remove("incorrect");

        this.errorList.removeError(this.targetRowID);
      }
      else {
        this.targetRow.classList.add("incorrect");
        this.targetRow.classList.remove("correct");

        this.errorList.addError(
          this.targetRowID,
          "Error on row " + this.targetRowID + ": Books.AuthorID != Authors.ID",
          "Find a row in Authors table with ID " + compareCell1
        );
      }
    }
  }
}
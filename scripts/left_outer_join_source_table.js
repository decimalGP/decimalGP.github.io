class LeftOuterJoinSourceTable extends SourceTable {
  constructor(data, table, errorList, manager, compareColumns, startColumn) {
    super(data, table, errorList, manager);

    this.compareColumns = compareColumns;
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
      if(!this.keyExistInOtherTable(compareCell1) && compareCell2 === "-")
      {
        SourceTable.setRowCorrect(this.targetRow, true);
  
        this.errorList.removeError(this.targetRowID);
      }
      else if (compareCell1 === compareCell2) {
        SourceTable.setRowCorrect(this.targetRow, true);

        this.errorList.removeError(this.targetRowID);
      }
      else {
        SourceTable.setRowCorrect(this.targetRow, false);

        this.errorList.addError(
          this.targetRowID,
          "Error on row " + this.targetRowID + ": Employee.EmployeeID != Department.DepartmentID or there is no matching row from the other source table" ,
          "Find a row in Authors table with ID " + compareCell1
        );
      }
    }    
  }
  keyExistInOtherTable(key)
  {
    console.log(this.manager.sourceTable[1].table.rowCount);
    for(let i = 0; i < this.manager.sourceTable[1].table.rowCount; i++)
    {
      console.log(this.manager.sourceTable[1].data[i][0])
      if(key === this.manager.sourceTable[1].data[i][0])
        return true
    }
    return false
  }
}
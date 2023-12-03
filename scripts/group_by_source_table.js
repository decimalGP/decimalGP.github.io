class GroupBySourceTable extends SourceTable {
  constructor(data, table, errorList, manager, groupByColumn) {
    super(data, table, errorList, manager);

    this.groupByColumn = groupByColumn;
  }

  updateTargetRow() {
    super.updateTargetRow();

    // Fill in the html values for the target table's row
    this.targetRow.cells[1].innerHTML = this.draggingElement.cells[this.groupByColumn].innerHTML;

    let index = this.getTargetRowIndex();

    let countText = document.createElement("SPAN");
    countText.id = "increase-cell-" + index;
    countText.style.paddingInline = "20px";
    countText.innerHTML = "0";

    console.log(countText.id);

    let increaseButton = document.createElement("button");
    increaseButton.innerHTML = "+";

    let decreaseButton = document.createElement("button");
    decreaseButton.innerHTML = "-";

    this.targetRow.cells[0].innerHTML = "";
    this.targetRow.cells[0].appendChild(decreaseButton);
    this.targetRow.cells[0].appendChild(countText);
    this.targetRow.cells[0].appendChild(increaseButton);

    let increaseFunction = function() {
      this.changeCellValue(index, 1);
    }

    increaseButton.onclick = increaseFunction.bind(this);
    // decreaseButton.onclick = this.changeCellValue(index, -1);
  }

  getTargetRowIndex() {
    return parseInt(this.targetRow.classList[0].substring(4,5));
  }
      
  /// Function used for the increase/decrease button
  changeCellValue(rowIndex, amount) {
    let textHTML = document.getElementById("increase-cell-" + rowIndex);
    let value = parseInt(textHTML.innerHTML);
    textHTML.innerHTML = value + amount;
    this.checkValue(rowIndex);
  }

  checkValue(rowIndex) {
    let countTextHTML = document.getElementById("increase-cell-" + rowIndex);
    let countValue = parseInt(countTextHTML.innerHTML);

    let targetTable = this.manager.targetTable;
    let groupByValue = targetTable.table.rows[rowIndex].cells[targetTable.groupByColumn].innerHTML;

    
    let rowCorrect = countValue == targetTable.groupByData[groupByValue];
    console.log(rowIndex + " " + countValue + " " + groupByValue + " " + rowCorrect);
    this.setRowCorrect(this.targetRow, rowCorrect);
  }
}
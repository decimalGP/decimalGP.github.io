class LeftOuterJoinSourceTable extends SourceTable {
  constructor(data, table, errorList, compareColumns, startColumn) {
    super(data, table, errorList);

    this.compareColumns = compareColumns;
    this.startColumn = startColumn;
  }

  updateTargetRow() {
    super.updateTargetRow();

    
  }
}
class HavingSourceTable extends GroupBySourceTable {
    constructor(data, table, errorList, manager, groupByColumn, compareValue) {
        super(data, table, errorList, manager, groupByColumn);

        this.compareValue = compareValue;
    }

    checkValue(rowIndex) {
        let targetTable = this.manager.targetTable;
        let groupByValue = targetTable.table.rows[rowIndex].cells[targetTable.groupByColumn].innerHTML;
        let resultCountValue = targetTable.groupByData[groupByValue];

        if (resultCountValue > this.compareValue) {
            super.checkValue(rowIndex);
        }
        else {
            this.errorList.addError(
                this.targetRowID,
                "Error on row " + this.targetRowID,
                "The CustomerCount of this row does not meet the requirement."
            );
        }
    }
}
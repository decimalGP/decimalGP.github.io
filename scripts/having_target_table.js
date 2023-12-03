class HavingTargetTable extends GroupByTargetTable {
    constructor(table, sourceTables, manager, groupByColumnInSource, countColumnName) {
        super(table, sourceTables, manager, groupByColumnInSource, countColumnName);
    }
}
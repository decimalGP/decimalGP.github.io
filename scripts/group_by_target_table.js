/// This group by target table will only have 2 columns: Count column and Group By column
/// Currently only support rows with only Group By column having the same values in multiple cells
class GroupByTargetTable extends Table {
    constructor(table, sourceTables, manager, groupByColumnInSource, countColumnName) {
        super();

        this.manager = manager;
        manager.targetTable = this;
    
        this.countColumn = 0;
        this.groupByColumn = 1;
        this.groupByColumnInSource = groupByColumnInSource;
        this.sourceTables = sourceTables;
        this.countColumnName = countColumnName;

        let data = this.createDataTable(sourceTables);
        this.initHTML(data, table);
        this.resizeColumns();
    }

    createDataTable(sourceTables) {
        this.calculateNumberOfRows();

        let data = [];
        for (let i = 0; i < this.dataRowCount; ++i) {
            let rowData = [];

            if (i == 0) {
                rowData[this.countColumn] = this.countColumnName;
                rowData[this.groupByColumn] = sourceTables[0].data[0][this.groupByColumnInSource];
            }
            else {
                for (let j = 0; j < this.dataColumnCount; ++j) {
                    rowData.push('-');
                }
            }

            data.push(rowData);
        }

        return data;
    }

    calculateNumberOfRows() {
        this.dataColumnCount = 2;
        this.dataRowCount = 1;

        this.groupByData = {};  // saved in format {count, cell value for Group By column}
        for (let i=1; i<this.sourceTables[0].data.length; ++i) {
            let key = this.sourceTables[0].data[i][this.groupByColumnInSource];
            if (!this.groupByData[key]) {
                this.groupByData[key] = 0;
            }
            let value = ++this.groupByData[key];
        }
        for (let key in this.groupByData) {
            this.dataRowCount++;
        }
    }

    /// Resize the target table columns to match the source table columns
    resizeColumns() {      
      const width = this.sourceTables[0].table.rows[1].cells[this.groupByColumnInSource].offsetWidth;
      let cell = this.table.rows[1].cells[this.groupByColumn];
      cell.style.width = `${width}px`;
    }
}   
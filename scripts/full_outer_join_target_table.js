class FullOuterJoinTargetTable extends TargetTable {
  constructor(table, sourceTables, manager) {
      super(table, sourceTables, manager);
  }

  createDataTable(sourceTables) {
    let dataColumnCount = 0;
    for (let i = 0; i < sourceTables.length; ++i) {
        dataColumnCount += sourceTables[i].data[0].length;
    }

    // Add 1 because it's full join which in our example needs 4 rows
    let dataRowCount = sourceTables[0].data.length + 1;

    let data = [];
    for (let i = 0; i < dataRowCount; ++i) {
        let rowData = [];

        if (i == 0) {
            for (let j = 0; j < sourceTables.length; ++j) {
                for (let k = 0; k < sourceTables[j].data[0].length; ++k) {
                    rowData.push(sourceTables[j].data[0][k]);
                }
            }
        }
        else {
            for (let j = 0; j < dataColumnCount; ++j) {
                rowData.push('-');
            }
        }

        data.push(rowData);
    }

    return data;
  }
}
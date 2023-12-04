class RightOuterJoinTargetTable extends TargetTable {
  constructor(table, sourceTables, manager) {
      super(table, sourceTables, manager);
  }

  createDataTable(sourceTables) {
    let dataColumnCount = 0;
    for (let i = 0; i < sourceTables.length; ++i) {
        dataColumnCount += sourceTables[i].data[0].length;
    }

    let dataRowCount = sourceTables[0].data.length;

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
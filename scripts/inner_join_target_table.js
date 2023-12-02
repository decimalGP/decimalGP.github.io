class InnerJoinTargetTable extends TargetTable {
    createDataTable(sourceTables) {
        let datacolumnCount = 0;
        for (let i=0; i<sourceTables.length; ++i) {
          datacolumnCount += sourceTables[i].data[0].length;
        }
        
        let dataRowCount = sourceTables[0].data.length;

        let data = [];
        for (let i=0; i<dataRowCount; ++i) {
            let rowData = [];
            
            if (i == 0) {
                for (let j=0; j<sourceTables.length; ++j) {
                for (let k=0; k<sourceTables[j].data[0].length; ++k) {
                    rowData.push(sourceTables[j].data[0][k]);
                }
                }
            }
            else {
                for (let j=0; j<datacolumnCount; ++j) {
                rowData.push('-');
                }
            }
        
            data.push(rowData);
        }
    
        return data;
    }
}
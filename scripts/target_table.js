class TargetTable extends Table {
  constructor(table, sourceTables) {
    let columnCount = 0;
    for (let i=0; i<sourceTables.length; ++i) {
      columnCount += sourceTables[i].data[0].length;
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
        for (let j=0; j<columnCount; ++j) {
          rowData.push('-');
        }
      }

      data.push(rowData);
    }

    super(data, table);
    
    this.sourceTables = sourceTables;
    
    this.initHTML();

    this.resizeColumns();
  }

  resizeColumns() {   
    let columnIndex = 0;
    for (let i=0; i<this.sourceTables.length; ++i) {
      for (let j=0; j<this.sourceTables[i].data[0].length; ++j) {
        const width = this.sourceTables[i].table.rows[1].cells[j].offsetWidth;
        let cell = this.table.rows[1].cells[columnIndex];
        cell.style.width = `${width}px`;

        columnIndex++;
      }
    }
  }
}
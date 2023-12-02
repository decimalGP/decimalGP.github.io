class Table {
  constructor() {}

  initHTML(data, table) {
    this.data = data;
    this.table = table;
    
    this.columnCount = this.data[0].length;
    this.rowCount = this.data.length;

    for (let i = 0; i < this.rowCount; ++i) {
      let row = this.table.insertRow(i);

      for (let j = 0; j < this.columnCount; ++j) {
        let cell = row.insertCell(j);
        let cellData = this.data[i][j];

        if (i == 0) {
          cell.outerHTML = `<th>${cellData}</th>`;
        }
        else {
          cell.outerHTML = `<td>${cellData}</td>`;
        }        
      }
    }

  }
}
class Table {
  constructor(data, table) {
    this.data = data;
    this.table = table;
  }

  initHTML() {
    for (let i=0; i<this.data.length; ++i) {
      let row = this.table.insertRow(i);

      for (let j=0; j<this.data[i].length; ++j) {
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
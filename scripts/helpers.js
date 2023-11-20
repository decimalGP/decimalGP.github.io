function getRowAndTable(cell) {
    let row = cell.parentElement;
    let body = row.parentElement;
    let table = body.parentElement;
    return [row, table];
}

function getDropTable(elementList) {
    for (let i = 0; i < elementList.length; i++) {
        let cell = elementList[i];
        if (cell == null || cell.nodeName.toLowerCase() !== 'td') continue;

        var [row, table] = getRowAndTable(cell);
        if (row.nodeName.toLowerCase() === 'th') continue;

        if (table.classList.contains('droppableTable')) 
            return [cell, row, table];
    }
  
    return null;
}
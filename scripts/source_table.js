class SourceTable extends Table {
  constructor(data, table, errorList) {
    super(data, table);

    this.initHTML();
    
    this.errorList = errorList;

    this.hasDraggingStarted = false;
    this.mouseToElementX = 0;
    this.mouseToElementY = 0;

    // Add event listeners
    this.mouseDownListener = this.mouseDownHandler.bind(this);
    this.mouseMoveListener = this.mouseMoveHandler.bind(this);
    this.mouseUpListener = this.mouseUpHandler.bind(this);

    let rows = table.querySelectorAll('tr');
    for (let i=0; i<rows.length; ++i) {
      // Ignore header
      if (i === 0) continue;

      rows[i].addEventListener('mousedown', this.mouseDownListener);
    }

    // Each cell updates its width dynamically, so we need to set each td width to the widest td in that column
    const columns = table.rows[0].cells.length;

    // Iterate through each column
    for (let i = 0; i < columns; i++) {
      let maxWidth = 0;

      // Find the maximum width in the column
      for (let j = 0; j < table.rows.length; j++) {
        const cellWidth = table.rows[j].cells[i].offsetWidth;
        maxWidth = Math.max(maxWidth, cellWidth);
      }

      // Set the width of all cells in the column
      for (let j = 0; j < table.rows.length; j++) {
        table.rows[j].cells[i].style.width = maxWidth + 'px';
      }
    }

    // Create clone table
    let rect = table.getBoundingClientRect();

    this.cloneTable = table.cloneNode(true); 

    this.cloneTable.style.position = 'absolute';
    this.cloneTable.style.left = `${rect.left}px`;
    this.cloneTable.style.top = `${rect.top}px`;
    this.cloneTable.style.visibility = 'hidden';

    table.parentNode.insertBefore(this.cloneTable, table);

    window.addEventListener("resize", (event) => {
      rect = table.getBoundingClientRect();
      this.cloneTable.style.left = `${rect.left}px`;
      this.cloneTable.style.top = `${rect.top}px`;
    });
  }

  mouseDownHandler(event) {
    this.draggingElement = event.target.parentElement;
  
    const rect = this.draggingElement.getBoundingClientRect();
    this.mouseToElementX = event.pageX - rect.left;
    this.mouseToElementY = event.pageY - rect.top; 
  
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
  }

  mouseMoveHandler(event) {
    if (!this.hasDraggingStarted) {
      this.hasDraggingStarted = true;

      this.toggleCloneTable(true);
    }

    this.draggingElement.style.position = 'absolute';
    this.draggingElement.style.top = `${event.pageY - this.mouseToElementY}px`;
    this.draggingElement.style.left = `${event.pageX - this.mouseToElementX}px`;
    this.draggingElement.style.cursor = 'grabbing';

    // Add highlighter to target row
    if (!this.updateTarget(event)) return;
    this.targetRow.classList.add('selectedRow');    
  }

  toggleCloneTable(isOn) {
    if (isOn) {
      this.cloneTable.style.visibility = 'visible';
      this.draggingElement.style.visibility = 'visible';
      this.table.style.visibility = 'collapse';
    }
    else {
      this.cloneTable.style.visibility = 'hidden';
      this.table.style.visibility = 'visible';      
    }
  }

  updateTarget(event) {
    if (this.targetRow != null) {
      this.targetRow.classList.remove('selectedRow');
    }

    this.targetCell = null;
    this.targetRow = null;
    this.targetTable = null;

    let elementList = document.elementsFromPoint(event.pageX, event.pageY);
    let tableTuple = getDropTable(elementList);
    if(tableTuple == null) return false;
    
    var [cell, row, table] = tableTuple;
    

    this.targetCell = cell;
    this.targetRow = row;
    this.targetTable = table;

    this.targetRowID = [].slice.call(this.table.querySelectorAll('tr')).indexOf(this.targetRow);

    return true;
  }

  mouseUpHandler(event) {
    this.toggleCloneTable(false);
    this.hasDraggingStarted = false;

    this.draggingElement.style.removeProperty('top');
    this.draggingElement.style.removeProperty('left');
    this.draggingElement.style.removeProperty('position');
    this.draggingElement.style.removeProperty('cursor');

    document.removeEventListener('mousemove', this.mouseMoveListener);
    document.removeEventListener('mouseup', this.mouseUpListener);

    if (!this.updateTarget(event)) return;

    this.updateTargetRow();

    this.mouseToElementX = null;
    this.mouseToElementY = null;
    this.draggingElement = null;
  }

  /// Override in child classes
  updateTargetRow() {}
}
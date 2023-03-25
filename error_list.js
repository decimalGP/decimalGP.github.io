class ErrorList {
  /// list = html list
  constructor(list, listTitle) {
    this.errors = [];
    this.list = list;
    this.listTitle = listTitle;

    this.generateErrorList();
  }

  addError(rowID, message, hint) {
    this.errors[rowID] = {};
    this.errors[rowID].message = message;
    this.errors[rowID].hint = hint;

    this.generateErrorList();
  }

  removeError(rowID) {
    this.errors[rowID] = null;

    this.generateErrorList();
  }

  generateErrorList() {
    this.list.innerHTML = '';

    if (this.errors.length == 0) {
      this.listTitle.innerHTML = "No error."
      this.listTitle.classList.remove("text-danger");
      this.listTitle.classList.add("text-success");
      return;
    }
    else {
      this.listTitle.innerHTML = "Error list:"
      this.listTitle.classList.remove("text-success");
      this.listTitle.classList.add("text-danger");
    }

    for (let rowID=0; rowID<this.errors.length; ++rowID) {
      if (this.errors[rowID] == null) continue;

      let message = this.errors[rowID].message;
      let hint = this.errors[rowID].hint;

      let messageNode = document.createElement("li");
      messageNode.innerHTML = message;

      let hintList = document.createElement("ul");
      let hintNode = document.createElement("li");
      hintList.appendChild(hintNode);
      hintNode.innerHTML = hint;

      messageNode.appendChild(hintList);
      this.list.appendChild(messageNode);
    }
  }
}
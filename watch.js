/*
 *	Watch class object constructor
 *
 *	tableId - the id attribute for the table in HTML
 */
function Watch(tableId) {
	// DECLARATION OF PROPERTIES
	this.name; // The name of the watch table (has to equal the id of the table tag in the HTML file)
	this.table; // A DOM reference to the table object/tag
	this.tbody; // A DOM refernce to the tbody object/tag

	// INITIALIZATION OF PROPERTIES
	this.name = tableId; // Save the table's name/id
	this.table = document.getElementById(tableId); // Obtain a refernce to the table object
	this.table.classList.add("watch"); // Assign the appropriate class attribute to the table
	this.table.innerHTML = "<thead><th>Variable</th><th>Value</th></thead><tbody></tbody>"; // Set up a watch table template
	this.tbody = this.table.getElementsByTagName("tbody")[0]; // Obtain a refernce to the tbody object
	
	// METHODS

	/*
	 *  add(name)
	 *	
	 *	Adds a new variable to the watch table (doesn't actually connect it with a variable, just prepares a table row for it)
	 *
	 *  	name - the name of the variable as it is to be displayed in the "Variable" column
	 */
	this.add = function (name) {
		var tr = document.createElement("tr"); // Create a table row
		var tdName = document.createElement("td"); // Create this first cell, which will hold the name of the variable
		var tdValue = document.createElement("td"); // Create the second sell, which will hold the value of the variable
		this.tbody.appendChild(tr); // Add the row to the table
		tr.appendChild(tdName); // Add the first cell to the row
		tr.appendChild(tdValue); // Add the second cell to the row
		tdName.innerHTML = name; // Put the name of the variable in the first cell
		tdValue.id = this.name + "." + name; // Set the 2nd cell's id to the watch table name followed by a dot followed by the variable name so it can be accessed later
	}

	/*
	 *  update(name, value)
	 *	
	 *	Updates the value of a variable in the table
	 *
	 *  	name - the name of the variable as it is displayed in the "Variable" column
	 *		value - the current value of the variable
	 */
	this.update = function (name, value) {
		var tdValue = document.getElementById(this.name + "." + name); // Find the right table cell
		tdValue.innerHTML = value; // Put the value in the cell
	}
}
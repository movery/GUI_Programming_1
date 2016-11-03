/*
  Name: Michael Overy
  Email: michael_overy@student.uml.edu
  Affiliation: Senior Undergraduate
  Creation Date: 27 October 2016
  Description: Create a dynamic and interactive multiplication table. You should
               format the page to look nicely using CSS and then generate and validate the table
               using Javascript.
*/

// Form Processing referenced from http://www.w3schools.com/js/tryit.asp?filename=tryjs_form_elements
function submitForm() {
    var pS = document.getElementById("plierStart").value;
    var pE = document.getElementById("plierEnd").value;
    var cS = document.getElementById("candStart").value;
    var cE = document.getElementById("candEnd").value;
    
    if (validateForm(pS, pE, cS, cE)) {
	displayTable(Number(pS), Number(pE), Number(cS), Number(cE));
    }
}

// Function referenced from http://stackoverflow.com/a/3886106
function isFloat(n){
    return n === n && n % 1 !== 0;
}

function validateForm(pS, pE, cS, cE) {
    // Clear existing errors
    document.getElementById("plierStartError").innerHTML = "";
    document.getElementById("plierEndError").innerHTML = "";
    document.getElementById("candStartError").innerHTML = "";
    document.getElementById("candEndError").innerHTML = "";

    plierError = candError = false;

    // Non-Number Validation
    if (pS.trim() == '' || isNaN(pS) || isFloat(Number(pS))) {
	document.getElementById("plierStartError").innerHTML =  "ERROR: Must enter an integer value";
	plierError = true;
    }

    if (pE.trim() == '' || isNaN(pE) || isFloat(Number(pE))) {
	document.getElementById("plierEndError").innerHTML =  "ERROR: Must enter an integer value";
	plierError = true;
    }

    if (cS.trim() == '' || isNaN(cS) || isFloat(Number(cS))) {
	document.getElementById("candStartError").innerHTML =  "ERROR: Must enter an integer value";
	candError = true;
    }

    if (cE.trim() == '' || isNaN(cE) || isFloat(Number(cE))) {
	document.getElementById("candEndError").innerHTML =  "ERROR: Must enter an integer value";
	candError = true;
    }
1
    // Range Validation
    if (!plierError && (Number(pS) > Number(pE))) {
	document.getElementById("plierStartError").innerHTML = "ERROR: Start cannot be greater than End";
	document.getElementById("plierEndError").innerHTML = "ERROR: End cannot be less than Start";
	plierError = true;
    }

    if (!candError && (Number(cS) > Number(cE))) {
	document.getElementById("candStartError").innerHTML = "ERROR: Start cannot be greater than End";
	document.getElementById("candEndError").innerHTML = "ERROR: End cannot be less than Start";
	candError = true;
    }

    // Large Range validation along with user confirmation box
    plierRange = Number(pE) - Number(pS);
    candRange  = Number(cE) - Number(cS);
    if (plierRange * candRange >= 10000 
	&& !confirm("You are about to create " + ((plierRange * candRange) + plierRange + candRange) + " cells. This may result in long loading times or page failure. Would you like to proceed?"))
	return false;

    // Return false if error is found, true otherwise.
    return !(plierError | candError);
}

// Simple creates the table by iterating through the range and generating HTML and assigning it to the table
function displayTable(pS, pE, cS, cE) {
    tableString = ""

    for (var c = cS - 1; c <= cE; c++) {
	tableString += "<tr>";

	// On first iteration, don't place multiplicand in left column/
	if (c == cS - 1)
	    tableString += "<th></th>";
	else
	    tableString += "<th scope='row'>" + c + "</th>";

	for (var p = pS; p <= pE; p++) {
	    // On first iteration, fill in the header row
	    if (c == cS - 1) {
		tableString += "<th>" + p + "</th>";
	    } else {
		tableString += "<td>" + c * p + "</td>";
	    }
	}
	
	tableString += "</tr>";
    }

    document.getElementById("multiplicationTable").innerHTML = tableString;

    return true;
}

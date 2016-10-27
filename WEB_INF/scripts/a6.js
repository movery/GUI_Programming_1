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

    // Return false if error is found, true otherwise.
    return !(plierError | candError);
}

function displayTable(pS, pE, cS, cE) {
    tableString = ""

    for (var c = cS - 1; c <= cE; c++) {
	tableString += "<tr>";

	// On first iteration, don't place multiplicand in left column/
	if (c == cS - 1)
	    tableString += "<td></td>";
	else
	    tableString += "<td>" + c + "</td>";

	for (var p = pS; p <= pE; p++) {
	    // On first iteration, fill in the header row
	    if (c == cS - 1) {
		tableString += "<td>" + p + "</td>";
	    } else {
		tableString += "<td>" + c * p + "</td>";
	    }
	}
	
	tableString += "</tr>";
    }

    document.getElementById("multiplicationTable").innerHTML = tableString;

    return true;
}

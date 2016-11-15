/*
  Name: Michael Overy
  Email: michael_overy@student.uml.edu
  Affiliation: Senior Undergraduate
  Creation Date: 27 October 2016
  Description: Create a dynamic and interactive multiplication table. You should
               format the page to look nicely using CSS and then generate and validate the table
               using Javascript.
*/

// Simple creates the table by iterating through the range and generating HTML and assigning it to the table
function displayTable() {
    var pS = Number(document.getElementById("plierStart").value);
    var pE = Number(document.getElementById("plierEnd").value);
    var cS = Number(document.getElementById("candStart").value);
    var cE = Number(document.getElementById("candEnd").value);

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

$(document).ready(function() {

    // Custom Methods to provide same functionality as in a6.
    $.validator.addMethod("isFloat", function (value, element) {
	n = parseFloat(value)
	return n % 1 == 0;
    });

    // Sourced from: http://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
    $.validator.addMethod("greaterThan", function (value, element, param) {
	var $otherElement = $(param);
	return (parseInt(value, 10) >= parseInt($otherElement.val(), 10) || $otherElement.val() == "");
    });

    $.validator.addMethod("lessThan", function (value, element, param) {
	var $otherElement = $(param);
	return (parseInt(value, 10) <= parseInt($otherElement.val(), 10) || $otherElement.val() == "")
    });

    // Referenced: https://jqueryvalidation.org/validate/
    $('#tableForm').validate({

	rules: {
	    plierStart: {
		number: true,
		required: true,
		lessThan: "#plierEnd",
		isFloat: true
	    },
	    plierEnd: {
		number: true,
		required: true,
		greaterThan: "#plierStart",
		isFloat: true
	    },
	    candStart: {
		number: true,
		required: true,
		lessThan: "#candEnd",
		isFloat: true
	    },
	    candEnd: {
		number: true,
		required: true,
		greaterThan: "#candStart",
		isFloat: true
	    }
	},
	
	messages: {
	    plierStart: {
		number: " ERROR: You must enter a valid integer number",
		required: " ERROR: This field is required",
		lessThan: " ERROR: Start cannot be greater than End",
		isFloat: " ERROR: Floats are not accepted"
	    },
	    plierEnd: {
		number: " ERROR: You must enter a valid integer number",
		required: " ERROR: This field is required",
		greaterThan: " ERROR: End cannot be less than Start",
		isFloat: " ERROR: Floats are not accepted"
	    },
	    candStart: {
		number: " ERROR: You must enter a valid integer number",
		required: " ERROR: This field is required",
		lessThan: " ERROR: Start cannot be greater than End",
		isFloat: " ERROR: Floats are not accepted"
	    },
	    candEnd: {
		number: " ERROR: You must enter a valid integer number",
		required: " ERROR: This field is required",
		greaterThan: " ERROR: End cannot be less than Start",
		isFloat: " ERROR: Floats are not accepted"
	    }
	},

	submitHandler: function() {
	    displayTable();
	    return false;
	}
    })
});

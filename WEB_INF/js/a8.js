/*
  Name: Michael Overy
  Email: michael_overy@student.uml.edu
  Affiliation: Senior Undergraduate
  Creation Date: 21 November 2016
  Assignment: Adjust A6 and A7 to have sliders and tabs that have two way binding, dynamically make table as 
              the values change, and store the values in tabs that can be deleted one at a time, or all at once.
*/

// Simple creates the table by iterating through the range and generating HTML and assigning it to the table
function displayTable() {
    var pS = Number(document.getElementById('plierStart').value);
    var pE = Number(document.getElementById('plierEnd').value);
    var cS = Number(document.getElementById('candStart').value);
    var cE = Number(document.getElementById('candEnd').value);

    tableString = ""

    for (var c = cS - 1; c <= cE; c++) {
	tableString += "<tr>";

	// On first iteration, don"t place multiplicand in left column/
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

    document.getElementById('multiplicationTable').innerHTML = tableString;

    return true;
}

// Used to submit the form when input is alterred
// https://stackoverflow.com/questions/1200266/submit-a-form-using-jquery
function submitIfValid() {
    if ($('form#tableForm').valid() == true)
	displayTable();
}

// Function to create a tab tied to button press
$("#saveTable").click(function() {
    createTab();
});

$("#deleteAll").click(function() {
    deleteAllTabs();
});


// Index for tabs
var index = 1;

// Tab Logic referenced from: https://stackoverflow.com/questions/18572586/append-to-dynamically-created-tab
function createTab() {

    $("#tabList").tabs();

    // Get values to label the tab
    var pS = Number(document.getElementById("plierStart").value);
    var pE = Number(document.getElementById("plierEnd").value);
    var cS = Number(document.getElementById("candStart").value);
    var cE = Number(document.getElementById("candEnd").value);
    index++;
    
    // Title the tab
    $("div#tabList ul").append("<li class='tab'><a href='#tab-" + index + "'>" 
	+ pS + " to " + pE + " by " + cS + " to " + cE + "</a>" +
        "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>");

    // Add the multiplication table to the tab
    $("div#tabList").append('<div id="tab-' + index + '">' + $("#containerCeption").html() + '</div>');

    // Refresh and activate the tab
    $("#tabList").tabs("refresh");
    $("#tabList").tabs("option", "active", -1);

    // Get the delete button working
    $( "#tabList" ).delegate( "span.ui-icon-close", "click", function() {
	var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
	$( "#" + panelID ).remove();

	// Must refresh when tab is deleted
	$("#tabList").tabs("refresh");
    })
}

// A really hacky way to delete all tabs.
// Destroy the tablist and reset the innerHTML of tabList -- HTML string copied from browser
function deleteAllTabs() {
    $("#tabList").tabs("destroy");
    document.getElementById('tabList').innerHTML = "<ul class='ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all' role='tablist'></ul>";
    
    index = 1;
}

$(document).ready(function() {

    // Slider Format referenced from http://jqueryui.com/slider/#slider-vertical
    
    //Begin: Plier Start Input
    $('#plierStartSlider').slider({
        orientation: 'horizontal',
        range: 'min',
        min: -100,
        max: 100,
        value: 0,
        slide: function (event, ui) {
            $('input#plierStart').val(ui.value);
	    submitIfValid();
        }
    });

    $('#plierStart').on('keyup', function() {
	$('#plierStartSlider').slider('value', this.value);
	submitIfValid();
    });
    //End: Plier Start Input

    //Begin: Plier End Input
    $('#plierEndSlider').slider({
        orientation: 'horizontal',
        range: 'min',
        min: -100,
        max: 100,
        value: 0,
        slide: function (event, ui) {
            $('input#plierEnd').val(ui.value);
	    submitIfValid();
        }
    });

    $('#plierEnd').on('keyup', function() {
	$('#plierEndSlider').slider('value', this.value);
	submitIfValid();
    });
    //End: Plier End Input

    //Begin: Cand Start Input
    $('#candStartSlider').slider({
        orientation: 'horizontal',
        range: 'min',
        min: -100,
        max: 100,
        value: 0,
        slide: function (event, ui) {
            $('input#candStart').val(ui.value);
	    submitIfValid();
        }
    });

    $('#candStart').on('keyup', function() {
	$('#candStartSlider').slider('value', this.value);
	submitIfValid();
    });
    //End: Cand Start Input

    //Begin: Cand End Input
    $('#candEndSlider').slider({
        orientation: 'horizontal',
        range: 'min',
        min: -100,
        max: 100,
        value: 0,
        slide: function (event, ui) {
            $('input#candEnd').val(ui.value);
	    submitIfValid();
        }
    });

    $('#candEnd').on('keyup', function() {
	$('#candEndSlider').slider('value', this.value);
	submitIfValid();
    });
    //End: Cand End Input

    // Custom Methods to provide same functionality as in a6.
    // Poorly named. Returns True if not a float, False if is a float.
    $.validator.addMethod('isFloat', function (value, element) {
	n = parseFloat(value)
	return n % 1 == 0;
    });

    // Sourced from: http://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
    $.validator.addMethod('greaterThan', function (value, element, param) {
	var $otherElement = $(param);
	return (parseInt(value, 10) >= parseInt($otherElement.val(), 10) || $otherElement.val() == '');
    });

    $.validator.addMethod('lessThan', function (value, element, param) {
	var $otherElement = $(param);
	return (parseInt(value, 10) <= parseInt($otherElement.val(), 10) || $otherElement.val() == '')
    });

    $.validator.addMethod('checkRange', function(value, element) {
	return Math.abs(parseInt(value, 10)) <= 100;
    });

    // Referenced: https://jqueryvalidation.org/validate/
    $('#tableForm').validate({

	rules: {
	    plierStart: {
		number: true,
		required: true,
		lessThan: '#plierEnd',
		isFloat: true,
		checkRange: true
	    },
	    plierEnd: {
		number: true,
		required: true,
		greaterThan: '#plierStart',
		isFloat: true,
		checkRange: true
	    },
	    candStart: {
		number: true,
		required: true,
		lessThan: '#candEnd',
		isFloat: true,
		checkRange: true
	    },
	    candEnd: {
		number: true,
		required: true,
		greaterThan: '#candStart',
		isFloat: true,
		checkRange: true
	    }
	},
	
	// Error messages
	messages: {
	    plierStart: {
		number: " ERROR: You must enter a valid integer number",
		required: " ERROR: This field is required",
		lessThan: " ERROR: Start cannot be greater than End",
		isFloat: " ERROR: Floats are not accepted",
		checkRange: " ERROR: Value falls outside the required range (-100 to 100)"
	    },
	    plierEnd: {
		number: " ERROR: You must enter a valid integer number",
		required: " ERROR: This field is required",
		greaterThan: " ERROR: End cannot be less than Start",
		isFloat: " ERROR: Floats are not accepted",
		checkRange: " ERROR: Value falls outside the required range (-100 to 100)"
	    },
	    candStart: {
		number: " ERROR: You must enter a valid integer number",
		required: " ERROR: This field is required",
		lessThan: " ERROR: Start cannot be greater than End",
		isFloat: " ERROR: Floats are not accepted",
		checkRange: " ERROR: Value falls outside the required range (-100 to 100)"
	    },
	    candEnd: {
		number: " ERROR: You must enter a valid integer number",
		required: " ERROR: This field is required",
		greaterThan: " ERROR: End cannot be less than Start",
		isFloat: " ERROR: Floats are not accepted",
		checkRange: " ERROR: Value falls outside the required range (-100 to 100)"
	    }
	},
    })
});

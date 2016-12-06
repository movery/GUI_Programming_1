var scrabbleTiles = [
    {"letter" : "A", "value": 1,  "max" : 9,  "current" : 9  },
    {"letter" : "B", "value": 3,  "max" : 2,  "current" : 2  },
    {"letter" : "C", "value": 3,  "max" : 2,  "current" : 2  },
    {"letter" : "D", "value": 2,  "max" : 4,  "current" : 4  },
    {"letter" : "E", "value": 1,  "max" : 12, "current" : 12 },
    {"letter" : "F", "value": 4,  "max" : 2,  "current" : 2  },
    {"letter" : "G", "value": 2,  "max" : 3,  "current" : 3  },
    {"letter" : "H", "value": 4,  "max" : 2,  "current" : 2  },
    {"letter" : "I", "value": 1,  "max" : 9,  "current" : 9  },
    {"letter" : "J", "value": 8,  "max" : 1,  "current" : 1  },
    {"letter" : "K", "value": 5,  "max" : 1,  "current" : 1  },
    {"letter" : "L", "value": 1,  "max" : 4,  "current" : 4  },
    {"letter" : "M", "value": 3,  "max" : 2,  "current" : 2  },
    {"letter" : "N", "value": 1,  "max" : 6,  "current" : 6  },
    {"letter" : "O", "value": 1,  "max" : 8,  "current" : 8  },
    {"letter" : "P", "value": 3,  "max" : 2,  "current" : 2  },
    {"letter" : "Q", "value": 10, "max" : 1,  "current" : 1  },
    {"letter" : "R", "value": 1,  "max" : 6,  "current" : 6  },
    {"letter" : "S", "value": 1,  "max" : 4,  "current" : 4  },
    {"letter" : "T", "value": 1,  "max" : 6,  "current" : 6  },
    {"letter" : "U", "value": 1,  "max" : 4,  "current" : 4  },
    {"letter" : "V", "value": 4,  "max" : 2,  "current" : 2  },
    {"letter" : "W", "value": 4,  "max" : 2,  "current" : 2  },
    {"letter" : "X", "value": 18, "max" : 1,  "current" : 1  },
    {"letter" : "Y", "value": 4,  "max" : 2,  "current" : 2  },
    {"letter" : "Z", "value": 10, "max" : 1,  "current" : 1  },
    {"letter" : "_", "value": 0,  "max" : 2,  "current" : 2  },
];

var deckOfTiles = []
function initializeDeckOfTiles() {
    deckOfTiles = [];

    /* Push all tiles into an array to "Draw" from */
    for (var i = 0; i < scrabbleTiles.length; ++i) {
	for (var j = 0; j < scrabbleTiles[i].max; ++j) {
	    var tile =  {"letter"   : scrabbleTiles[i].letter, 
			 "value"    : scrabbleTiles[i].value,
			 "modifier" : "",
			 "id"       : scrabbleTiles[i].letter + j};			
	    deckOfTiles.push(tile);
	}
    }

    /* Shuffle an array: https://www.frankmitchell.org/2015/01/fisher-yates/ */
    for (var i = deckOfTiles.length - 1; i > 0; --i) {
	var j = Math.floor(Math.random() * (i + 1));
	var temp = deckOfTiles[i];
	deckOfTiles[i] = deckOfTiles[j];
	deckOfTiles[j] = temp;
    }
}

var handOfTiles = []
function drawTiles() {
    for (var i = 0; i < 7; ++i) {

	/* Only draw cards into your hand where there is an empty slot */
	if(($("#scrabbleRack td:nth-child("+ (i+1) + ")").html() == "")) {
	    var tile = deckOfTiles.pop();
	    
	    /* Tile Images used here shamelessly taken from Jason Downings github */
	    var img = "<img class='tile' id='" + tile.id + "' src='WEB_INF/img/Scrabble/Scrabble_Tile_" + tile.letter + ".jpg'></img>";
	    
	    $("#scrabbleRack td:nth-child("+ (i+1) + ")").append(img);
	    
	    $("#" + tile.id).css({top: 2, left: 0});
	    
	    $("#" + tile.id).draggable({
		revert: "invalid",
	    });
	    
	    handOfTiles.push(tile);
	}
    }
}

var tilesInPlay = []
function initializeDropLocations() {

    $("#scrabbleBoard td").droppable({
	accept: ".tile",

	/* Referenced: http://stackoverflow.com/a/6003729 */
	drop: function(ev, ui) {

	    if ($(this).html() == "") {
		$(ui.draggable).detach().css({top: 2,left: 2}).appendTo(this);
		
		/* Check if tile comes from hand. If so, adjust storage devices */
		for(var i = 0; i < handOfTiles.length; ++i) {
		    if (handOfTiles[i].id == ui.draggable.attr("id")) {
			tilesInPlay.push(handOfTiles[i]);
			handOfTiles.splice(i, 1);
		    }
		}
		
		/* Adjust the modifier for this tiles */
		for(var i = 0; i < tilesInPlay.length; ++i) 
		    if (tilesInPlay[i].id == ui.draggable.attr("id")) 
			tilesInPlay[i].modifier = $(this).attr("class");
		
		adjustScore();
	    } else {
		ui.draggable.draggable("option", "revert", true);
	    }
	}
    });
    
    $("#scrabbleRack td").droppable({
	accept: ".tile",
	
	drop: function(ev, ui) {
	    /* Can only put in a cell if it is empty */
	    if ($(this).html() == "") {
		$(ui.draggable).detach().css({top: 2,left: 0}).appendTo(this);
		
		/* Check if tile comes in play. If so, adjust storage devices */
		for(var i = 0; i < tilesInPlay.length; ++i) {
		    if (tilesInPlay[i].id == ui.draggable.attr("id")) {
			handOfTiles.push(tilesInPlay[i]);
			tilesInPlay.splice(i, 1);
		    }
		}
		adjustScore();
	    } else {
		ui.draggable.draggable("option", "revert", true);
	    }
	}
    });				
}

var totalScore = 0;
function adjustScore() {
    var score = 0;
    var doubleWordCount = 0;
    var tripleWordCount = 0;

    for(var i = 0; i < tilesInPlay.length; ++i) {
	switch(tilesInPlay[i].modifier) {
	case "doubleLetter ui-droppable":
	    score += tilesInPlay[i].value * 2;
	    break;
	case "tripleLetter ui-droppable":
	    score += tilesInPlay[i].value * 3;
	    break;
	case "doubleWord ui-droppable":
	    score += tilesInPlay[i].value;
	    doubleWordCount += 1;	    
	    break;
	case "tripleWord ui-droppable":
	    score += tilesInPlay[i].value;
	    tripleWordCount += 1;
	    break;
	default:
	    score += tilesInPlay[i].value;
	    break;
	}
    }

    for (var i = 0; i < doubleWordCount; ++i)
	score *= 2;

    for (var i = 0; i < tripleWordCount; ++i)
	score *= 3;
    
    $("#currentWordScore").text("Current Word: " + score);

    return score;
}

tilesPlayed = []
function submitTiles() {
    totalScore += adjustScore();

    $("#totalScore").text("Total Score: " + totalScore);
    $("#currentWordScore").text("Current Word: 0");

    for (var i = 0; i < tilesInPlay.length; ++i) {
	$("#" + tilesInPlay[i].id).draggable("destroy");
	tilesPlayed.push(tilesInPlay[i]);
    }
    tilesInPlay = []

    drawTiles();
}

function resetGame() {
    for (var i = 0; i < tilesPlayed.length; ++i) { 
	$("#" + tilesPlayed[i].id).remove();
    }

    for (var i = 0; i < tilesInPlay.length; ++i) { 
	$("#" + tilesInPlay[i].id).remove();
    }

    for (var i = 0; i < handOfTiles.length; ++i) { 
	$("#" + handOfTiles[i].id).remove();
    }

    tilesPlayed = [];
    handOfTiles = [];
    totalScore  = 0;

    $("#totalScore").text("Total Score: 0");
    $("#currentWordScore").text("Current Word: 0");

    initializeDeckOfTiles();
    drawTiles();
}

$(document).ready(function() {
    initializeDeckOfTiles();
    initializeDropLocations();
    drawTiles();
});

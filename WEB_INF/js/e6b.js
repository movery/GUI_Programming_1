$(function() {
	$('ul').before("<p>Just Updated</p>");
	
	$('li.hot').prepend("+ ");
	
	$('ul:last-child').after("<li><em>gluten free</em> soy sauce</li>");
});
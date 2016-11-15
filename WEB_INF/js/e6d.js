$(function() {
	var backgroundColor = $('li:first-child').css('backgroundColor');
	
	$('ul:last-child').append("<p>Color was " + backgroundColor + "</p>");
	
	$('li').each(function() {
		$(this).css('backgroundColor', '#c5a996');
		$(this).css('border', 'solid white 1px');
		$(this).css('color', 'black');
		$(this).css('text-shadow', 'none');
		$(this).css('fontFamily', 'Georgia');
	});
});
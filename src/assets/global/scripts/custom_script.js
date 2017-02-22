var fullScreen = function() {
	$('.navbar-custom').hide();
	$('.page-sidebar-wrapper').hide();
	$('.page-container').css('margin-top', 0);
	$('.page-content').addClass('page-content-fullscreen');
	$('.page-fullscreen').show();
}
var unfullScreen = function() {
	$('.navbar-custom').show();
	$('.page-sidebar-wrapper').show();
	$('.page-container').css('margin-top', '75px');
	$('.page-content').removeClass('page-content-fullscreen');
	$('.page-fullscreen').hide();
}
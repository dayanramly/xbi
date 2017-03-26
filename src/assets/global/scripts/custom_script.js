var fullScreen = function() {
	$('.page-sidebar-wrapper').hide();
	$('.page-head').hide();
	$('.page-breadcrumb').hide();
	$('.page-content').addClass('page-content-fullscreen');
	$('.page-fullscreen').show();
	$('.fullscreen-full').attr("onclick","unfullScreen()");
	localStorage.setItem("fullscreen", true);
}
var unfullScreen = function() {
	$('.page-sidebar-wrapper').show();
	$('.page-head').show();
	$('.page-breadcrumb').show();
	$('.page-content').removeClass('page-content-fullscreen');
	$('.page-fullscreen').hide();
	$('.fullscreen-full').attr("onclick","fullScreen()");
	localStorage.removeItem("fullscreen");
}
var options = {
	auto_height: true,
	cellHeight: 66,
	verticalMargin: 5
};
$('.grid-stack').gridstack(options);

$('.filter-dropdown').click(function(e) {
	if ($(e.target).is('[data-toggle=modal]')) {
		$($(e.target).data('target')).modal("show")
	}
});
if(localStorage.fullscreen){
	fullScreen();
} else {
	unfullScreen();
}

// sidebartoggle
var body = $('body');
var sidebarMenu = $('.page-sidebar-menu');

$('body').on('click', '.sidebar-toggler', function(e) {
	if (body.hasClass("page-sidebar-closed")) {
		$('.input-group-filter').show();
		$('.open-bar').hide();
	} else{
		$('.input-group-filter').hide();
		$('.open-bar').show();
	}
});

$('.open-bar').on('click', function(){
	body.removeClass("page-sidebar-closed");
	sidebarMenu.removeClass("page-sidebar-menu-closed");
	$('.input-group-filter').show();
	$('.open-bar').hide();
});

// var btnKpi= $('.btn-kpi-filter');
// var grid = $('.grid-stack').data('gridstack');

// $('.btn-kpi-filter').on('click', function(){
// 	if(btnKpi.hasClass("open")) {
// 		$('.grid-stack-item').removeClass("test");
// 	} else{
// 		$(this).closest('.grid-stack-item').attr("data-gs-height", 4);
// 	}
// });
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

$('#sampleTable').dataTable( {
	"sDom": 'Rlfrtip',
	"headerContextMenu":true,
	"oColReorder": {
		"bAddFixed":false
	}
} );

// function DummyLinkFormatter(row, cell, value, columnDef, dataContext) {
// 	return '<a href="#">' + value + '</a>';
// }

var grid;
var columnsSortable = [
{id: "id", name: "", field: "id", width: 20, sortable: true},
{id: "customer_1", name: "Customer 1", field: "customer_1", sortable: true},
{id: "customer_2", name: "Customer 2", field: "customer_2", sortable: true},
{id: "customer_3", name: "Customer 3", field: "customer_3", sortable: true},
{id: "address_1", name: "Address 1", field: "address_1", sortable: true},
{id: "address_2", name: "Address 2", field: "address_2", sortable: true},
{id: "category", name: "Category Cat", field: "category", sortable: true},
{id: "city", name: "City", field: "city", sortable: true},
{id: "country", name: "Country", field: "country", sortable: true},
{id: "county", name: "County", field: "county", sortable: true},
{id: "state", name: "State", field: "state", sortable: true}
];


var dataFull = [];
for (var i = 0; i < 50; i++) {
	dataFull[i] = {
      id: i, // needed for DataView
      customer_1: "100" + i,
      customer_2: "American " + i,
      customer_3: "Check",
      address_1: "East Stret" + i,
      address_2: i,
      category: Math.round(Math.random() * 100),
      city: "01/01/2009",
      country: "01/05/2009",
      county: (i % 5 == 0),
      state: "NZ"
  };
}

var columns;
var data;

 // Example 2: fewer rows, no vertical scrollbar
 columns = columnsSortable.slice();
 data = dataFull.slice();
 $("#myGrid").slickgrid({
 	columns: columns,
 	data: data,
 	slickGridOptions: {
 		enableCellNavigation: true,
 		enableColumnReorder: true,
 		forceFitColumns: true,
 		syncColumnCellResize: true,
 		rerenderOnResize: true,
 		rowHeight: 36
 	},
    // handleCreate takes some extra options:
    sortCol: undefined,
    sortDir: true,
    handleCreate: function () {
    	var o = this.wrapperOptions;

      // configure grid with client-side data view
      var dataView = new Slick.Data.DataView();
      var grid = new Slick.Grid(this.element, dataView,
      	o.columns, o.slickGridOptions);

      // sorting
      var sortCol = o.sortCol;
      var sortDir = o.sortDir;
      function comparer(a, b) {
      	var x = a[sortCol], y = b[sortCol];
      	return (x == y ? 0 : (x > y ? 1 : -1));
      }

      grid.onSort.subscribe(function (e, args) {
      	sortDir = args.sortAsc;
      	sortCol = args.sortCol.field;
      	dataView.sort(comparer, sortDir);
      	grid.invalidateAllRows();
      	grid.render();
      });

      // set the initial sorting to be shown in the header
      if (sortCol) {
      	grid.setSortColumn(sortCol, sortDir);
      }

       // initialize the model after all the events have been hooked up
       dataView.beginUpdate();
       dataView.setItems(o.data);
       dataView.endUpdate();

       grid.resizeCanvas();

   }
});

// var columns = [
// {id: "title", name: "Title", field: "title"},
// {id: "duration", name: "Duration", field: "duration"},
// {id: "%", name: "% Complete", field: "percentComplete"},
// {id: "start", name: "Start", field: "start"},
// {id: "finish", name: "Finish", field: "finish"},
// {id: "effort-driven", name: "Effort Driven", field: "effortDriven"}
// ];
// var options = {
// 	enableCellNavigation: true,
// 	enableColumnReorder: true,
// 	forceFitColumns: true,
// 	rowHeight: 50
// };

// $(function () {
// 	var data = [];
// 	for (var i = 0; i < 50; i++) {
// 		data[i] = {
// 			title: "Task " + i,
// 			duration: "5 days",
// 			percentComplete: Math.round(Math.random() * 100),
// 			start: "01/01/2009",
// 			finish: "01/05/2009",
// 			effortDriven: (i % 5 == 0)
// 		};
// 	}

// 	grid = new Slick.Grid("#myGrid", data, columns, options);
// });
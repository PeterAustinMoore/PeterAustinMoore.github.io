var resource =  'https://data.eindhoven.nl/resource/m2kn-cytx.json';

var table_totals_query = resource + "?$select=count(*)&$where=derived_view='false'";
var view_total_query = resource + "?$select=count(*)&$where=derived_view='true'";
$.get(table_totals_query, function(table_data){
    $.get(view_total_query, function(view_data){
        datasets = '<h1>'+table_data[0]['count'].toString()+'</h1>';
        views = '<h1>'+view_data[0]['count'].toString()+'</h1>';
        $('#datasets').html(datasets);
        $('#views').html(views);
    });
});
var today = new Date();
var last_week = new Date();
var last_month = new Date();
var yesterday = new Date();

last_week.setDate(today.getDate()-7);
last_month.setDate(today.getDate()-365);
yesterday.setDate(today.getDate()-1);

var dd = last_week.getDate();
var mm = last_week.getMonth()+1; //January is 0!
var yyyy = last_week.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

last_week = mm+'-'+dd+'-'+yyyy;

var dd = last_month.getDate();
var mm = last_month.getMonth()+1; //January is 0!
var yyyy = last_month.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

last_month = mm+'-'+dd+'-'+yyyy;

var dd = yesterday.getDate();
var mm = yesterday.getMonth()+1; //January is 0!
var yyyy = yesterday.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

yesterday = mm+'-'+dd+'-'+yyyy;
console.log(yesterday)

var new_week_query = resource + "?$select=count(*)&$where=creation_date>'"+last_week.toString()+"' AND derived_view = 'false'";
var new_month_query = resource + "?$select=count(*)&$where=creation_date>'"+last_month.toString()+"' AND derived_view = 'false'";

var all_datasets = resource + "?$select=count(*)&$where=derived_view='false'"

var update_yesterday_query = resource + "?$select=count(*)&$where=last_update_date_data>'"+yesterday.toString()+"' AND derived_view = 'false'";
var update_week_query = resource + "?$select=count(*)&$where=last_update_date_data>'"+last_week.toString()+"' AND derived_view = 'false'";
var update_month_query = resource + "?$select=count(*)&$where=last_update_date_data>'"+last_month.toString()+"' AND derived_view = 'false'";

$.get(all_datasets, function(all_data){
    console.log(all_data);
    $.get(new_week_query, function(data){
        console.log();
        var chart = c3.generate({
        	bindto: '#new_week',
            data: {
                columns: [
                    ['New Datasets', data[0]['count']],
                    ['Older Datasets', all_data[0]['count']-data[0]['count']],
                ],
                type : 'donut',
                onclick: function (d, i) {  },
                onmouseover: function (d, i) {  },
                onmouseout: function (d, i) {  }
            },
            donut: {
                title: "New Datasets - week: "+data[0]['count'].toString(),
                label: {
                    format: function(value) {return value;}
                }
            }
        });
    });
    $.get(new_month_query, function(data){
        var chart = c3.generate({
        	bindto: '#new_month',
            data: {
                columns: [
                    ['New Datasets', data[0]['count']],
                    ['Older Datasets', all_data[0]['count']-data[0]['count']],
                ],
                type : 'donut',
                onclick: function (d, i) {  },
                onmouseover: function (d, i) { },
                onmouseout: function (d, i) {  }
            },
            donut: {
                title: "New Datasets - Year: "+data[0]['count'].toString(),
                label: {
                        format: function(value) {return value;}
                    }
            }
        });
    });
    
    var bar_chart = c3.generate({
        bindto: '#updates',
        data: {
            columns: [
            ],
            type : 'bar',
            onclick: function (d, i) {  },
            onmouseover: function (d, i) {  },
            onmouseout: function (d, i) {  }
        },
        bar: {
            title: "Views This Week"
        },
        axis:{
            x: {
                tick: {
                    count:0
                }
            },
            y: {
                label: 'Number of Updates'
            }
        },
        tooltip:{
            format:{
                title: function(x) { return 'Number of Updates'; }
            }
        }
    });
    $.get(update_week_query, function(data){
        bar_chart.load({
            columns:[
            ['Week', data[0]['count']]
            ]
        });
    });
    $.get(update_month_query, function(data){
        bar_chart.load({
            columns:[
            ['Month', data[0]['count']]
            ]
        });
    });
    $.get(update_yesterday_query, function(data){
        bar_chart.load({
            columns:[
            ['One Day', data[0]['count']]
            ]
        });
    });
});
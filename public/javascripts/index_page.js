// DOM Ready =============================================================
$(document).ready(function() {


  // Populate the user table on initial page load
  populateTable_wedstrijden_nu();
  populateTable_wedstrijden_straks();
  populateTable_wedstrijden_admin();
  populateTable_poule("E1");
  populateTable_dag("Zaterdag");

  window.setInterval(updateClientTables, 15000);
});

function updateClientTables(){
  populateTable_wedstrijden_nu();
  populateTable_wedstrijden_straks();
}

// Functions =============================================================
function changePoule(pouleName){
  populateTable_poule(pouleName);
}

function changeDag(dagName){
  populateTable_dag(dagName);
}

function buttonEnabler(btn){
  let btn_values = btn.id.split('_');
  let incr = 0;
  if(btn_values[0] === "plus"){
    incr = 1;
  }else if(btn_values[0] === "min"){
    incr = -1;
  }else{
    incr = 0;
  }
  let postURL = "/admin/updatescore?wedstrijd="+btn_values[2]+"&team=punten_"+btn_values[1]+"&increment="+incr;
  $.ajax({
    type: 'PUT', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
    dataType: 'json', // Set datatype - affects Accept header
    url: postURL, // A valid URL
    headers: {"X-HTTP-Method-Override": "PUT"}, // X-HTTP-Method-Override set to PUT.
    data: '{}' // Some data e.g. Valid JSON as a string
  });
  populateTable_wedstrijden_admin();
  populateTable_wedstrijden_admin();


}
// Fill table with data
function populateTable_wedstrijden_nu() {

  // Empty content string
  var tableContent = '';
  // jQuery AJAX call for JSON
  //$.getJSON( '/wedstrijden/wedstrijden_nu', function( data ) {
  $.getJSON( '/wedstrijden/wedstrijdenlist', function( data ) {
      // For each item in our JSON, add a table row and cells to the content string
      $.each(data, function(){
        var beginTime = new Date(this.begin_tijd);
        var endTime = new Date(this.eind_tijd);
        tableContent += '<tr>';
        tableContent += '<td>' + this.poule + '</td>';
        tableContent += '<td>' + this.thuis + '</td>';
        tableContent += '<td>' + this.gasten + '</td>';
        tableContent += '<td>' + this.punten_thuis + " - " + this.punten_gasten +'</td>';
        tableContent += '<td>' + this.dag + '</td>';
        tableContent += '<td>' + beginTime.getUTCHours() + ":" +beginTime.getUTCMinutes() + '</td>';
        tableContent += '<td>' + endTime.getUTCHours() + ":" +endTime.getUTCMinutes() + '</td>';
        tableContent += '<td>' + this.veld + '</td>';


        //tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
        tableContent += '</tr>';
      });
      // Inject the whole content string into our existing HTML table
      $('#wedstrijden_nuList table tbody').html(tableContent);
    });

}

function populateTable_wedstrijden_straks() {

  // Empty content string
  var tableContent = '';
  // jQuery AJAX call for JSON
  $.getJSON( '/wedstrijden/wedstrijden_straks', function( data ) {
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      var beginTime = new Date(this.begin_tijd);
      var endTime = new Date(this.eind_tijd);
      tableContent += '<tr>';
      tableContent += '<td>' + this.poule + '</td>';
      tableContent += '<td>' + this.thuis + '</td>';
      tableContent += '<td>' + this.gasten + '</td>';
      tableContent += '<td>' + this.punten_thuis + " - " + this.punten_gasten +'</td>';
      tableContent += '<td>' + this.dag + '</td>';
      tableContent += '<td>' + beginTime.getUTCHours() + ":" +beginTime.getUTCMinutes() + '</td>';
      tableContent += '<td>' + endTime.getUTCHours() + ":" +endTime.getUTCMinutes() + '</td>';
      tableContent += '<td>' + this.veld + '</td>';
      //tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });
    // Inject the whole content string into our existing HTML table
    $('#wedstrijden_straksList table tbody').html(tableContent);
  });
}

function populateTable_dag(dag) {
  // Empty content string
  var tableContent = '';
  // jQuery AJAX call for JSON
  $.getJSON( '/wedstrijden/wedstrijdenperdag?dag='+dag, function( data ) {
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      var beginTime = new Date(this.begin_tijd);
      var endTime = new Date(this.eind_tijd);
      tableContent += '<tr>';
      tableContent += '<td>' + this.poule + '</td>';
      tableContent += '<td>' + this.thuis + '</td>';
      tableContent += '<td>' + this.gasten + '</td>';
      tableContent += '<td>' + this.punten_thuis + " - " + this.punten_gasten +'</td>';
      tableContent += '<td>' + this.dag + '</td>';
      tableContent += '<td>' + beginTime.getUTCHours() + ":" +beginTime.getUTCMinutes() + '</td>';
      tableContent += '<td>' + endTime.getUTCHours() + ":" +endTime.getUTCMinutes() + '</td>';
      tableContent += '<td>' + this.veld + '</td>';
      //tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });
    // Inject the whole content string into our existing HTML table
    $('#wedstrijden_dagList table tbody').html(tableContent);
  });
}

function populateTable_poule(poule) {
  // Empty content string
  var tableContent = '';
  // jQuery AJAX call for JSON
  $.getJSON( '/wedstrijden/wedstrijdenperpoule?poule='+poule, function( data ) {
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      var beginTime = new Date(this.begin_tijd);
      var endTime = new Date(this.eind_tijd);
      tableContent += '<tr>';
      tableContent += '<td>' + this.poule + '</td>';
      tableContent += '<td>' + this.thuis + '</td>';
      tableContent += '<td>' + this.gasten + '</td>';
      tableContent += '<td>' + this.punten_thuis + " - " + this.punten_gasten +'</td>';
      tableContent += '<td>' + this.dag + '</td>';
      tableContent += '<td>' + beginTime.getUTCHours() + ":" +beginTime.getUTCMinutes() + '</td>';
      tableContent += '<td>' + endTime.getUTCHours() + ":" +endTime.getUTCMinutes() + '</td>';
      tableContent += '<td>' + this.veld + '</td>';
      //tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });
    // Inject the whole content string into our existing HTML table
    $('#wedstrijden_pouleList table tbody').html(tableContent);
  });
}

function populateTable_wedstrijden_admin() {

  // Empty content string
  var tableContent = '';
  // jQuery AJAX call for JSON
  $.getJSON( '/wedstrijden/wedstrijden_admin', function( data ) {
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      var beginTime = new Date(this.begin_tijd);
      var endTime = new Date(this.eind_tijd);
      tableContent += '<tr>';
      tableContent += '<td>' + this.thuis + '</td>';
      tableContent += '<td>' + this.gasten + '</td>';
      tableContent += '<td>' + '<button onclick="buttonEnabler(this)" class="minusbtn" id="min_thuis_' + this.wedstrijd_id + '">-</button> ' + this.punten_thuis + ' <button class="plusbtn" onclick="buttonEnabler(this)" id="plus_thuis_' + this.wedstrijd_id + '">+</button>' + '</td>';
      tableContent += '<td>' + '<button onclick="buttonEnabler(this)" class="minusbtn" id="min_gasten_' + this.wedstrijd_id + '">-</button> ' + this.punten_gasten +' <button class="plusbtn" onclick="buttonEnabler(this)" id="plus_gasten_' + this.wedstrijd_id + '">+</button>' +  '</td>';
      tableContent += '<td>' + beginTime.getUTCHours() + ":" +beginTime.getUTCMinutes() + '</td>';
      tableContent += '<td>' + endTime.getUTCHours() + ":" +endTime.getUTCMinutes() + '</td>';
      //tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });
    // Inject the whole content string into our existing HTML table
    $('#wedstrijden_adminList table tbody').html(tableContent);
  });
}
// Wedstrijdenlist data array for filling in info box
var wedstrijdenListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {
  // Empty content string
  var tableContent = '';
  // jQuery AJAX call for JSON
  $.getJSON( '/wedstrijden/wedstrijdenperdag?dag=Zaterdag', function( data ) {
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td>' + this.dag + '</td>';
      tableContent += '<td>' + this.poule + '</td>';
      tableContent += '<td>' + this.begin_tijd + '</td>';
      tableContent += '<td>' + this.eind_tijd + '</td>';
      tableContent += '<td>' + this.veld + '</td>';
      tableContent += '<td>' + this.thuis + '</td>';
      tableContent += '<td>' + this.gasten + '</td>';
      tableContent += '<td>' + this.punten_thuis + '</td>';
      tableContent += '<td>' + this.punten_gasten + '</td>';
      //tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });
    // Inject the whole content string into our existing HTML table
    $('#wedstrijdenList table tbody').html(tableContent);
  });
};
// ==UserScript==
// @name        DLO groups export to Testvision
// @namespace   dlo.mijnhva.nl
// @include     https://dlo.mijnhva.nl/*
// @include     https://*.youseeu.com/*
// @require  		http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==

$(function() {
  console.log('GREASE MONKEY INIT');
  
  var exportUsersInterface = function() {
    console.log($(".ddial_c_frame").contents());
    
  };
  
  
  var isGroupsListPage = (window.location.href.includes("group_list.d2l") !== false);
  
  if(isGroupsListPage) {
    
    $('body').on('click', '#testvision-export', function() {
      
      var frame = $('.ddial_c_frame').contents();
      
      var rows = $('d2l-table-wrapper table tr:not([header])', frame);
      
      var usernames = [["aanmeldnaam", "wachtwoord", "naam", "emailadres", "initialen", "voornaam", "tussenvoegsel", "achternaam", "geboortedatum", "geslacht", "taal", "groep", "extratijd", "voorlezen"]];
      
      
      $.each(rows, function(index, row) {
        
        var usernameMatch = $(row).text().match(/.*?, .*?, (.*?)@hva.nl/);
        if(usernameMatch.length == 2) {
         
          var username = usernameMatch[1];
          
          usernames.push([username, '', '', '', '', '', '', '', '', '', '', '', '', '']);
          
        }
      });
      
      var groupName = $('h2.vui-heading-2', frame).text();
      
      let csvContent = "data:text/csv;charset=utf-8," + usernames.map(e => e.join(",")).join("\n");
      
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "dlo_testvision_export_" + groupName + ".csv");
      document.body.appendChild(link); // Required for FF

      link.click();

    });
        
    $('body').on('DOMSubtreeModified', '.d2l-dialog-loading-spinner', function(){
      console.log('changed');
      $('.d2l-dialog-buttons td').first().append("<button id='testvision-export' class='d2l-button'>Export Testvision</button>");
    });
    
  }
    
});

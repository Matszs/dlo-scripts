// ==UserScript==
// @name        DLO image preview tests
// @namespace   dlo.mijnhva.nl
// @include     https://dlo.mijnhva.nl/*
// @include     https://*.youseeu.com/*
// @require  		http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==

$(function() {
  console.log('GREASE MONKEY INIT');
  
  $.each($('table.dcs a[href*="viewFile"]'), function(index, obj) {
    var link = $(obj).attr('href');

    $(obj).before('<img src="' + link + '" style="max-width: 300px;" />');
  });
});

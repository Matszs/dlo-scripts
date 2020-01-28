// ==UserScript==
// @name        DLO email copy script
// @namespace   dlo.mijnhva.nl
// @include     https://dlo.mijnhva.nl/*
// @require  		http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==

$(function() {
  var email_read_regex = /\<(.*)>/;

  $('body').on('dblclick', '.d2l-multiselect-choice', function() {

    var content = $(this).text();
    var emailRegex = email_read_regex.exec(content);
    var email = emailRegex[1];

    console.log(email);

    var textArea = document.createElement("textarea");
    textArea.value = email;
    textArea.style.height = "0px";
    textArea.style.width = "0px";
    textArea.style.opacity = "0";
    
    $('body')[0].appendChild(textArea);

    /* Select the text field */
    textArea.select();
    textArea.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

  });
});

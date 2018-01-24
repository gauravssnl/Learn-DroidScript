<html>
<head>
    <meta name="viewport" content="width=device-width">
    <script src='file:///android_asset/app.js'></script>
</head>

	
<script>
     
     
    //Called after application is started.
    function OnStart()
    {
       // app.ShowPopup( "HTML Rocks!" ); it
       var header = document.querySelector("header");
     var selection = document.querySelector("section");
     var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
     var request = new XMLHttpRequest();
     request.open('GET', requestURL);
     request.responseType = 'json';
     request.send();
     request.onload = function ()
{
	var superHeroes = request.response;
	alert(JSON.stringify(superHeroes));
}

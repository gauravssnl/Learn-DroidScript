<html>
<script>
    function OnStart() {
        app.ShowPopup( "HTML Rocks!" );
        for(var element of document.getElementsByTagName('a')) {
            element.onclick = () => alert(element);
        }
    }
</script>
    
<script>
    function OnStart() {
        app.ShowPopup( "HTML Rocks!" );
        for(var element of document.getElementsByTagName('a')) {
            element.onclick = () => alert("You click on a link!");
        }
    }
</script>

<style>
    body { background-color: #ffffff; }
    .hello 
    { 
        font-size: 42; 
        width: 100%;
        margin-top: 2em;
        text-align: center;
        color: blue;
    }
</style>

<body onload="app.Start()">

    <div class=hello> Hello World!<br><a href='http://google.com'>Google</a> </div>
    
</body>
</html>
function OnStart() 
{ 
    //Create a layout with objects vertically centered. 
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );   
    lay.SetBackground( "/Sys/Img/StarField.jpg" ); 

    var data =  
        "Luke Skywalker:Actor^c^ <font color='#77CECF'>Mark Hamill</font><br>" +  
        "<i>(Cool dude with a Lightsaber)</i>:null" + 
        ",R2D2:<h1>Actor^c^ <font color='#77CECF'><u><i>Kenny Baker</i></u></font> </h1> " +  
        "<i><big>(Luke's loyal robot companion)</big></i>:null"; 
    lst = app.CreateList( data, 0.8, 0.25, "Html" ); 
    lst.SetMargins( 0, 0.02, 0, 0 ); 
    lst.SetBackColor( "#77444444" ); 
    lst.SetTextColor( "#cccccc" ); 
    lst.SetEllipsize1( "end" ); 
    lst.SetTextSize( 18 ); 
    lst.SetTextShadow1( 2, 2,4, "#000000" ); 
    lst.SetTextShadow2( 1.5, 2,4, "#000000" ); 
    lst.SetDivider( 0.002, "#222222" );
    lay.AddChild( lst ); 
     
    //Add layout to app.     
    app.AddLayout( lay ); 
} 

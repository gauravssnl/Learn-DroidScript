
//Called when application is started.
function OnStart()
{
	lay = app.CreateLayout( "linear", "Top,FillXY" );	
	txt = app.CreateText( "Bibhuti Barun" );
	txt.SetTextSize( 18 );
	txt.SetTextColor( "#22ff22" );
	lay.AddChild( txt );
	img = app.CreateImage( "Img/BibhutiBarun1.jpg", 1.0,);
	img.SetMargins( 0.01, 0.01, 0.01, 0.01 );
	
	lay.AddChild( img );
	
	aboutBtn = app.CreateButton( "About" ,-1,-1, "Alum,FillX");
	aboutBtn.SetOnTouch( aboutBtn_OnTouch );
	lay.AddChild( aboutBtn );
	skillsBtn = app.CreateButton( "Skills", -1, -1,"FillX,Alum");
	skillsBtn.SetOnTouch( skillsBtn_OnTouch );
	lay.AddChild( skillsBtn);
	emailBtn= app.CreateButton( "Send Email" ,-1,-1, "Alum,FillX");
	emailBtn.SetOnTouch( emailBtn_OnTouch );
	lay.AddChild( emailBtn );
	
	layA= app.CreateLayout( "Linear", "Horizontal" );
	lay.AddChild( layA );
	author = app.CreateText( "Developer: Bibhuti Barun + Gaurav" );
	layA.AddChild( author );
	//Add layout to app.	
	app.AddLayout( lay );
	app.SetOrientation( "Portrait" );
}

function aboutBtn_OnTouch ()
{
  dlg = app.CreateDialog( "Bibhuti Barun" );
  layDlg = app.CreateLayout( "Linear", "Vertical" );
  layDlg.SetSize( 1.0, 0.9);
  dlg.AddLayout( layDlg );
  txt = "Bibhuti Barun: Development Engineer at DBS Bank";
  text = app.CreateText( txt );
  text.SetTextColor( "#22ff22" );
  layDlg.AddChild( text);
  text2 = app.CreateText( "Work Experience:" );
  layDlg.AddChild( text2 );
  lst1 = app.CreateList( "Development Engineer: DBS Bank:Img/d.png, Associate Consultant: Capgemini:Img/c.png");
  lst1.SetMargins( 0.01, 0.01, 0.01, 0.01 );
  layDlg.AddChild( lst1 );
  txt3 = app.CreateText( "In the RINGO project team ,my  responsibilities:");
 expData ="Analyze business requirements,Help create and refine the use case, Identify acceptance criteria for the usecase,	Estimate the user story using poker method,Participate in the Sprint for implementing the use case,	Create skeleton for the Usecase,	Create Consumer stubs for the webservices,Implement business logic and code to render the page,Performing Junit for unit testing the code,	Performing DevBox testing,Debugging and bug fixing";
  expL = app.CreateList( expData );
  layDlg.AddChild( txt3 );
  layDlg.AddChild( expL );
  dlg.Show();
}

function skillsBtn_OnTouch()
{
	listLay = app.CreateLayout( "Linear", "Vertical" );
	listView = app.CreateListView( "Java, Servlets,Spring,Hibernate, Core Java, JSP, Struts, Eclipse, Oracle,SQL, XML,JavaScript,Requirements Analysis,Tomcat,Ant,EJB,JUnit,Web Services,Agile Methodologies,Scrum,Websphere,Object Oriented Design,Software Development,Unix,Spring Framework", " My Technical Skills");
	listView.Show();
}

function emailBtn_OnTouch()
{
	var packageName = "com.google.android.gm";
    var className = "com.google.android.gm.ComposeActivityGmailExternal";
    var action = "android.intent.action.VIEW";
    var category = null;
    var uri = "myfriend@gmail.com";
    var type = "message/rfc822";
    
    var extras = [ 
        {name:"android.intent.extra.EMAIL", type:"list", value:"Bibhutibarun@gmail.com"},
        {name:"android.intent.extra.SUBJECT", type:"string", value:"My subject"},
        {name:"android.intent.extra.TEXT", type:"string", value:"Hello!"} 
    ];
    extras = JSON.stringify( extras );

    app.SendIntent( packageName, className, action, category, uri, type, extras ); 

}
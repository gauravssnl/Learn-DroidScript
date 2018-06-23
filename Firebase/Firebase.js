//Firebase Chat Demo for AndroidScript by cokeramirez - weapps.cl
//v0.01 26/07/2014

//Load the firebase script
app.LoadScript("https://cdn.firebase.com/js/client/1.0.17/firebase.js");

//set a random "username"
name = "User "+ Math.floor(Math.random()*999);



//Called when application is started.
function OnStart()
{
    //Force orientation
    app.SetOrientation( "Portrait" );   
    
    //create a new reference to Firebase
    myDataRef = new Firebase('https://chat-demo-androidscript.firebaseio.com/');
    
    //Everytime there is a new child on Firebase, 
    //we will execute the addChatMessage function.
    var query = myDataRef.limit(10);
    query.on('child_added', function(snapshot) {
        var message = snapshot.val();
        addChatMessage(message.name, message.text, message.time);
    });

	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "FillXY" );	

    //Create title text
	txtTittle = app.CreateText( "Demo Chat App",1 );
	txtTittle.SetTextSize( 30 );
	txtTittle.SetTextColor( "black" );
	txtTittle.SetBackColor( "#F5A623" );
	lay.AddChild( txtTittle );

    //Create a text Input 
    txtInput = app.CreateTextEdit( "" , 0.8 ); 
    txtInput.SetTextSize( 16 ); 
    txtInput.SetMargins(0,0.01,0,0.01);
    lay.AddChild( txtInput ); 

    //Check if the user entered a new line
    txtInput.SetOnChange( checkInput );

	//Create the chat area
    txtChatArea = app.CreateText( "This is a real chat app written in less than 100 lines. \n You need an internet conection for this to work.\n\nLoading the messages from server..." , 0.9, 0.8, "Left,Multiline" ); 
    txtChatArea.SetTextSize( 16 ); 
    lay.AddChild( txtChatArea );

	//Add layout to app.	
	app.AddLayout( lay );
}

//this function is executed everytime there is a new message on the server
function addChatMessage(name,message,time){
    var date = new Date(time);
    
    txtChatArea.SetText( date.getHours() + ":" + date.getMinutes() + " " + name + ": " + message + "\n" + txtChatArea.GetText());
}

//checks for a new line and submit the text
function checkInput(){
    //app.Alert(txtInput.GetLineCount());
    if (txtInput.GetLineCount() > 1){
        submitChatMessage();
    }
}

//function that sends the message to the server
function submitChatMessage(){
    myDataRef.push({name: name, text: txtInput.GetText(), time: Firebase.ServerValue.TIMESTAMP });
    txtInput.SetText('');
}


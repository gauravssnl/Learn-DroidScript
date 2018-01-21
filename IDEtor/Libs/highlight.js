function highlight(txt, textfield)
// function written by octazid - 2015-01-05
// last changings by octazid: 2015-01-28
// txt is JS source code
// Note:
// Be carfull, this function does maybe not working right, if txt contains some html tags

//'g' = global modifier = to replace all occurances of the match
//$1 = backreference to the part of the match inside the brackets (....)

{
    var re;

    app.ShowProgress("...Please wait some seconds...");

    //change some signs and the space to htmlcode

    txt = txt.replace(/ /g, "&nbsp;" ); //&nbsp; oder &#160;
    txt = txt.replace(/</g, "&lt;" ); //&lt; oder &#60;
    txt = txt.replace(/>/g, "&gt;" ); //&gt; oder &#62;

    //read list of reserved Javascript words from seperate file
    //so the user can manually change the list
    var JsWords = app.ReadFile( "Libs/JsWords.txt" ); //change the source file
    JsWords = JsWords.split(",");

    //read list of reserved Droidscript words from seperate file
    //so the user can manually change the list
    var DsWords = app.ReadFile( "Libs/DsMethods.txt" ); //change the source file
    DsWords = DsWords.split(",");

    //change color of the numbers
    txt = txt.replace(/(\d+)/g, "<font face='Courier New' color='#00ffff'>$1</font>"); //Blue

    //change color of the strings - text inside quotes
    txt = txt.replace(/([\"].*?[\"])/g, "<font face='Courier New' color='#ff0000'>$1</font>"); //red


    //highlighting special characters. "(", ")", "[" and "]" are escaped using a backslash
    //commented out, because waiting time is to long
    //txt = txt.replace(/(=|%|\/|\*|-|,|;|\+|<|>)/g, "<font face='Courier New' color='#b40486'>$1</font>");

    //change color of some special characters (brackets)
    //commented out, because waiting time is to long
    //txt = txt.replace(/(\(|\)|{|}|\[|\])/g, "<font face='Courier New' color='#b40486'>$1</font>"); // violett

    //change color of reserved Javascript keywords
    for (var i = 0; i < JsWords.length; i++)
    {
        //since the replace function does
        //not accept a string as a regex pattern,
        //we use a regex object
        re = new RegExp("\\b"+JsWords[i]+"\\b", "g");
        txt = txt.replace(re, "<font face='Courier New' color='#00ffff'>" + JsWords[i] + "</font>"); //light blue
    }

    //change color of the Droidscript keywords
    for (var i = 0; i <= DsWords.length; i++)
    {
        re = new RegExp("\\b"+DsWords[i]+"\\b", "g");
        txt = txt.replace(re, "<font face='Courier New' color='#0000ff'>" + DsWords[i] + "</font>"); //blue
    }

    //change the color of the comments starting with '//'
    txt = txt.replace(/(\/\/.*?\n)/g, "<font face='Courier New' color='#00ff00'>$1</font>" ); // + "<font face='Courier New' color='#ffffff'>&nbsp;</font>" ); //lightgreen


    //change the color of the comments starting with '/*'
    //txt = txt.replace(/(\/\*.*?\*\/)/g, "<font face='Courier New' color='#00ff00'>$1</font>" ); //lightgreen

    //Change linebreak to html
    txt = txt.replace(/(\n)/g,"<br>" );

    //injecting the code into the textedit

    textfield.SetHtml(txt);
    app.HideProgress();
}




// TODO: no function at the moment
function activehighlight(txt, textfield, originaltxt, start, end)
// function changed by octazid - 2015-01-19
// txt is JS source code
// Note:
// Be carfull, this function does maybe not working right, if txt contains some html tags

//'g' = global modifier = to replace all occurances of the match
//$1 = backreference to the part of the match inside the brackets (....)

{

    old = txt
    var re;

    //app.ShowProgress("...Please wait some seconds...");

    //change some signs and the space to htmlcode
    txt = txt.replace(/ /g, "&nbsp;" ); //&nbsp; oder &#160;
    txt = txt.replace(/</g, "&lt;" ); //&lt; oder &#60;
    txt = txt.replace(/>/g, "&gt;" ); //&gt; oder &#62;

    //read list of reserved Javascript words from seperate file
    //so the user can manually change the list
    var JsWords = app.ReadFile( "Libs/JsWords.txt" ); //change the source file
    JsWords = JsWords.split(",");

    //read list of reserved Droidscript words from seperate file
    //so the user can manually change the list
    var DsWords = app.ReadFile( "Libs/DsMethods.txt" ); //change the source file
    DsWords = DsWords.split(",");

    //change color of the numbers
    txt = txt.replace(/(\d+)/g, "<font face='Courier New' color='#00ffff'>$1</font>"); //Blue

    //change color of the strings - text inside quotes
    txt = txt.replace(/([\"].*?[\"])/g, "<font face='Courier New' color='#ff0000'>$1</font>"); //Red

    //highlighting special characters. "(", ")", "[" and "]" are escaped using a backslash
    //txt = txt.replace(/(=|%|\/|\*|-|,|;|\+|<|>)/g, "<font face='Courier New' color='#b404860'>$1</font>");

    //change color of some special characters (brackets)
    //txt = txt.replace(/(\(|\)|{|}|\[|\])/g, "<font face='Courier New' color='#b40486'>$1</font>"); // violett

    //change color of reserved Javascript keywords
    for (var i = 0; i < JsWords.length; i++)
    {
        //since the replace function does
        //not accept a string as a regex pattern,
        //we use a regex object
        re = new RegExp("\\b"+JsWords[i]+"\\b", "g");
        txt = txt.replace(re, "<font face='Courier New' color='#00ffff'>" + JsWords[i] + "</font>"); //light blue
    }

    //change color of the Droidscript keywords
    for (var i = 0; i < DsWords.length; i++)
    {
        re = new RegExp("\\b"+DsWords[i]+"\\b", "g");
        txt = txt.replace(re, "<font face='Courier New' color='#0000ff'>" + DsWords[i] + "</font>"); //blue
    }

    //change the color of the comments starting with '//'
    txt = txt.replace(/(\/\/.*?\n)/g, "<font face='Courier New' color='#00ff00'>$1</font>" ); //lightgreen

    //change the color of the comments starting with '/*'
        //txt = txt.replace(/([\/\*].*?[\*\/])/g, "<font face='Courier New' color='#00ff00'>$1</font>" ); //lightgreen

    //Change linebreak to html
    txt = txt.replace(/(\n)/g,"<br>" );

    //injecting the code into the textedit

    originaltxt.replace(old,txt);
    textfield.SetHtml(originaltxt);
    //app.HideProgress();
}

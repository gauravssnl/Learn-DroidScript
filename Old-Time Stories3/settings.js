var originalBodyHTML="";

function getBodyHTML(){
   var origbod=document.getElementsByTagName("body");
   var bod=origbod[0];
   bod.onload="";
   originalBodyHTML=bod.innerHTML;
   return originalBodyHTML;
 }

function restorePeyj(){
  //console.log("restorePeyj");
  var bd=document.getElementsByTagName("body");
  bd[0].innerHTML=originalBodyHTML;
  }

var settings={
    "lower-cutoff":0,
    "upper-cutoff":200000,
    "layout":"S",
    "ngrams": {
      "magicE":"false",
      "greyVowels":"false",
      "pirate":"false",
      "õẉ": "false",
      "oẉ": "false",
      "ed": "false",
      "eo": "false",
      "ei": "false",
      "wr": "false",
      "ck": "false",
      "aẉ": "false",
      "wḥ": "true",
      "wa": "false",
      "oa": "false",
      "eẉ": "false",
      "oy": "true",
      "oi": "true",
      "ey": "false",
      "aụ": "false",
      "oo": "false",
      "ôẉ": "false",
      "iṛ": "false",
      "ãy": "false",
      "ia": "false",
      "ry": "false",
      "õụ": "false",
      "oụ": "false",
      "ai": "false",
      "ee": "false",
      "ie": "false",
      "ea": "false",
      "uṛ": "false",
      "aṛ": "false",
      "oṛ": "false",
      "ng": "false",
      "tion":"false",
      "eṛ": "false",
      "ch": "true",
      "sh": "true",
      "th": "true",
  //':"th": "true",
      "τḥ": "true",
      "colorVoiced":"true"
      },
      "diacritics":{
        "silentVowels"    :"dmask",
        "schwas"          :"dmask",
        "vowelNames"      :"dmask",
        "â":"true",
        "ê":"true",
        "î":"true",
        "ô":"true",
        "û":"true",
        "à":"true",
        "è":"true",
        "ì":"true",
        "ò":"true",
        "ù":"true",
        "á":"true",
        "é":"true",
        "í":"true",
        "ó":"true",
        "ú":"true",
        "ā":"true",
        "ã":"true",
        "å":"true",
        "ė":"true",
        "ë":"true",
        "ï":"true",
        "ö":"true",
        "ō":"true",
        "σ":"true",
        "õ":"true",
        "ø":"true",
        "ő":"true",
        "ū":"true",
        "ü":"true",
        "ŕ":"true",
        "ý":"true",
        "ŷ":"true",
        "ẏ":"true",
        "ĉ":"true",
        "ŝ":"true",
        "x":"true",
        "j":"true",
        "ç":"true",
        "ć":"true",
        "ð":"true",
        "ĝ":"true",
        "ĩ":"true",
        "ñ":"true",
        "þ":"true",
        "ś":"true",
        "ţ":"true",
        "ť":"true",
        "υ":'true'

      }
};

function ClearSettings(){
  settings={
    "lower-cutoff":0,
    "upper-cutoff":200000,
    "layout":"sequential",
    "ngrams": {
      "magicE":"false",
      "greyVowels":"false",
      "pirate":"false",
      "õυ":"false",
//      "ou":"false",
      "wh":"false",
      "ãi":"false",
      "ãy":"false",
      "th":"false",
      "oy":"false",
      "oi":"false",
      "ng":"false",
      "ew":"false",
      "τh":"false",
      "er":"false",
      "õw":"false",
      "ôw":"false",
      "or":"false",
      "sh":"false",
      "y":"false",
      "ed":"false",
      "ch":"false",
      "colorVoiced":"false"
      }
    }
}

function AugmentPage(manualSettings){
//   getBodyHTML();
//   alert('manual sets' + manualSettings+'\settings '+settings.stringify);
   console.log('settings.js::diacritics file: '+people[1].name);
    if(originalBodyHTML==""){
        originalBodyHTML=getBodyHTML();}
    else{restorePeyj();getBodyHTML()};
        
   switch(manualSettings){
     case 0: break;
     case 1: ClearSettings(); SetPreferences();break;
       default: SetFilter(manualSettings);console.log('settings.js:AugmentPage-manual settings default switch case');break;
     }

   var nodes = getTextNodes();

   switch (settings.layout){
     case "R": parseTextNodes(nodes,augment,reverse,1);break;
     case "S": parseTextNodes(nodes,formatAndAugment,parallelTextSequential,1);break;
     case "C": parseTextNodes(nodes,formatAndAugment,parallelTextColumns,1);break;
     default : parseTextNodes(nodes,formatAndAugment,normal,1);break;
     }
  }

 function SetPreferences(){
   settings["lower-cutoff"]=prompt("Enter no of most common words to exclude!","200")*1;
   //var digraphs=prompt("Which  patterns shall we recognise?\n\nmagicE\t\t õù->õυ\t\t wħ->wh\n âì->ãi\t\t ây0->ãy\t\t σy0->oy\n σì->oi\t\t ñg0->ng\t\t ëw0->ëw\n τħ->τh\t\t πħ->th\t\t õw0->õw\n ôw0->ôw\t\t ør->or\t\t ŝħ->sh\n ý->y\t\t èð->ed\t\t ĉħ->ch\n èŕ->er\t\t greyVowels","magicE,τh,th,sh,y,ch,greyVowels,colorVowels");

   var digraphs=prompt("Which digraphs shall we recognise?\n\nmagicE\t\t õù->õυ\t\t wħ->wh\n âì->ãi\t\t ây0->ãy\t\t σy0->oy\n σì->oi\t\t ñg0->ng\t\t ëw0->ëw\n τħ->τh\t\t πħ->th\t\t õw0->õw\n ôw0->ôw\t\t ør->or\t\t ŝħ->sh\n ý->y\t\t èð->ed\t\t ĉħ->ch\n èŕ->er\t\t greyVowels\n colorVoiced - Vowels:red, voiced:blue\n\n  ","τh,th,er,õw,ôw,or,\nsh,,ed,ch,greyVowels,colorVoiced");
   SetFilter(digraphs);
   settings.layout=prompt("Enter Scheme [N]ormal, [R]everse, parallel[S]equential, or parallel[C]olumns","N");
 }

function filterString2Setting(t){
  for(p in patterns){
    if(t.match(patterns[p].ltr))
      {settings.ngrams[patterns[p].ltr]="true"}
      else
      {settings.ngrams[patterns[p].ltr]="false"};
//    console.log("settings.js::SetFilter: patterns ltr,aug: "+patterns[p].ltr+", "+ patterns[p].aug);
//    console.log("\nsettings.js::SetFilter: settings.ngrams ltr: " + settings.ngrams[patterns[p].ltr])
  }
  }
 
function filterString2SettingDiacritics(t,diType){
  for(dT in diType){
    aug=diType[dT].aug;
    ltr=diType[dT].ltr;
    
    if(t.match("mask"+aug))
      {settings.diacritics[aug]="mask"}
      else
      {settings.diacritics[aug]=aug};
      
    if(t.match(ltr+aug)){settings.diacritics[aug]=ltr};
  }
  }
  
  
function SetFilter(t){

//patterns/digraphs

  filterString2Setting(t);
//layout
  console.log(t);
  if(t.match("PIRATE")){settings.ngrams.pirate="true"}   else
    {settings.ngrams.pirate="false"}
  if(t.match("GREYVowels")){settings.ngrams.greyVowels="true"}   else {settings.ngrams.greyVowels="false"}
  if(t.match("COLORVOICED")){settings.ngrams.colorVoiced="true"} else {settings.ngrams.colorVoiced="false"}
  if(t.match("MAGICE")){settings.ngrams.magicE="true"}           else {settings.ngrams.magicE="false"}
//diacritics

  filterString2SettingDiacritics(t,namedVowels);
  filterString2SettingDiacritics(t,silentVowels);
  filterString2SettingDiacritics(t,schwas);
  filterString2SettingDiacritics(t,Vowels);
  filterString2SettingDiacritics(t,consonants);

    
}



function getTextNodes()
{
  return document.evaluate(
    "html/body//text()",document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function parseTextNodes(nodes,OrthogFunc,DisplayFunc,processAtWordLevel)
{
  //  var oldText="";
  //  var newText="";
    for(var i=0;i<nodes.snapshotLength;i++){
      
    //FIND WORDS AND PROCESS THEM
      var node=nodes.snapshotItem(i);
      var oldText= node.nodeValue;
      var whitespacefreeText=oldText.replace(/\s/g,"");
      if(whitespacefreeText.length>0 && node.parentNode.nodeName!="SCRIPT"){
        //OrthogFunc e.g.  reformed spelling, augmented spelling, no Vowels
        var newText= oldText.replace(/[a-zA-Z][a-zA-Z0]*/g,OrthogFunc);
   
        //CREATE NEW NODES WITH PROCESSED WORDS
        var newnode=document.createElement("span");
        //DisplayFunc e.g. parallel text
        oldText = oldText.replace(/([a-zA-Z]*)(xx|yy)/g,"$1");
        newnode.innerHTML=DisplayFunc(oldText,newText);
        var pnode=node.parentNode;
        var displaystyle=window.getComputedStyle(node.parentNode,null).getPropertyValue('display');
//        console.log(window.getComputedStyle(node,null).getPropertyValue('display'));
//          console.log('\nvalue: ' + node.nodeValue + ', parentDisplay: ' +displaystyle +node.parentNode.nodeName);
        pnode.replaceChild(newnode,node);
        //console.log(oldText);
      }
    }
}

function replaceDiacritics(t,diType){
  for(dT in diType){
    var aug=diType[dT].aug;
    var ltr=diType[dT].ltr;
    var stg=settings.diacritics[aug];
//    stg=stg.replace("0","");
    var re=new RegExp(aug,"g");
    
    if(stg=="mask"){
      t=t.replace(re,"х");
    }
    if(stg==ltr){
      t=t.replace(re,ltr);
    }
  }
  return t;
}


function replacePatterns(t){
  for(dT in patterns){
    var aug=patterns[dT].aug;
    var ltr=patterns[dT].ltr;
    var stg=settings.ngrams[ltr];
//    stg=stg.replace("0","");
//      console.log("\n\nreplacePatterns (aug,ltr,stg): " + aug +", " +ltr +", "+stg);
//    console.log("yo");
    var re=new RegExp(aug,"g");
    
    if(stg=="true"){
      t=t.replace(re,ltr);
    }
  }
  return t;
}


function augmentationFilter(t){
   if(settings.ngrams.magicE=="true"){
     t=t.replace(/â(.)è/g,"a$1e");
     t=t.replace(/ê(.)è/g,"e$1e");
     t=t.replace(/î(.)è/g,"i$1e");
     t=t.replace(/ô(.)è/g,"o$1e");
     t=t.replace(/û(.)è/g,"u$1e");
   }
   var sn=settings.ngrams;
/*
   if(settings.ngrams.õυ=="true"){t=t.replace(/õù/g,"õυ")}
   if(settings.ngrams.wh=="true"){t=t.replace(/wħ/g,"wh")}
   if(settings.ngrams.ãi=="true"){t=t.replace(/âì/g,"ãi")}
   if(settings.ngrams.ãy=="true"){t=t.replace(/ây0/g,"ãy")}
   if(settings.ngrams.oy=="true"){t=t.replace(/σy0/g,"oy")}
   if(settings.ngrams.oi=="true"){t=t.replace(/σì/g,"oi")}
   if(settings.ngrams.ng=="true"){t=t.replace(/ñg0/g,"ng")}
   if(settings.ngrams.ew=="true"){t=t.replace(/ëw0/g,"ëw")}
   if(settings.ngrams.τh=="true"){t=t.replace(/τħ/g,"τḥ")}
   if(settings.ngrams.th=="true"){t=t.replace(/πħ/g,"th")}
   if(settings.ngrams.er=="true"){t=t.replace(/èŕ/g,"er")}
   if(settings.ngrams.õw=="true"){t=t.replace(/õw0/g,"õw")}
   if(settings.ngrams.ôw=="true"){t=t.replace(/ôw0/g,"ôw")}
   if(settings.ngrams.or=="true"){t=t.replace(/ør/g,"or")}
   if(settings.ngrams.sh=="true"){t=t.replace(/ŝħ/g,"sh")}
   if(settings.ngrams.y== "true"){t=t.replace(/ý/g,"y")}
   if(settings.ngrams.ed=="true"){t=t.replace(/èd/g,"ed")}
   if(settings.ngrams.ch=="true"){t=t.replace(/ĉħ/g,"ch")}
*/
   if(settings.diacritics.schwas        =="mask"){t=t.replace(/[áéíóú]/g,"х")}
   if(settings.diacritics.silentVowels  =="mask"){t=t.replace(/[àèìòù]/g,"x0")}
   if(settings.diacritics.vowelNames    =="mask"){t=t.replace(/[âêîôû]/g,"х")}
/*
   if(settings.diacritics.â             =="mask"){t=t.replace(/â/g,"х")}
   if(settings.diacritics.â             =="a")   {t=t.replace(/â/g,"a")}
   if(settings.diacritics.ê             =="mask"){t=t.replace(/ê/g,"х")}
   if(settings.diacritics.ê             =="e")   {t=t.replace(/ê/g,"e")}
   if(settings.diacritics.î             =="mask"){t=t.replace(/î/g,"х")}
   if(settings.diacritics.î             =="i")   {t=t.replace(/î/g,"i")}
   if(settings.diacritics.ô             =="mask"){t=t.replace(/ô/g,"х")}
   if(settings.diacritics.ô             =="o")   {t=t.replace(/ô/g,"o")}
   if(settings.diacritics.û             =="mask"){t=t.replace(/û/g,"х")}
   if(settings.diacritics.û             =="u")   {t=t.replace(/û/g,"u")}
   if(settings.diacritics.σ             =="mask"){t=t.replace(/σ/g,"х")}
   if(settings.diacritics.σ             =="o")   {t=t.replace(/σ/g,"o")}
   if(settings.diacritics.õ             =="mask"){t=t.replace(/õ/g,"х")}
   if(settings.diacritics.õ             =="o")   {t=t.replace(/õ/g,"o")}
 */
   t=replacePatterns(t);
   t=replaceDiacritics(t,namedVowels);
   t=replaceDiacritics(t,silentVowels);
   t=replaceDiacritics(t,schwas);
   t=replaceDiacritics(t,Vowels);
   t=replaceDiacritics(t,consonants);
   //console.log("augfilter");
   return t;
}


// Display functions
// Display functions
// Display functions

function reverse(oldT,newT){
  return "<SPAN TITLE='"+newT+"'>"+oldT+"<SPAN>";
  }

function normal(oldT,newT){
  return "<SPAN TITLE='"+oldT+"'>"+newT+"<SPAN>";
  }

function parallelTextSequential(oldT,newT){
  return "\n<P CLASS=\"ABOVE\">"+oldT+"</P>\n<P CLASS=\"BELOW\">"+newT+"<P>";
  }

function parallelTextColumns(oldT,newT){
  return "\n<TABLE ALIGN='CENTER'  CELLSPACING='3%' >\n<TR>\n<TD WIDTH='44%'>"+oldT+"</TD>\n<TD WIDTH='8%'></TD>\<TD WIDTH='44%'>"+newT+"</TD></TR></TABLE>";
  }

//Tidying up functions
//Tidying up functions
//Tidying up functions

function greySilentLetters(txt){
 
  txt=txt.replace(/(å|ô|õ|ë)w0/gi,"$1ẉ0");
  txt=txt.replace(/(ô|õ|ë)ù/gi,"$1ụ");
  
  if(settings.ngrams.pirate=="false"){
//    txt=txt.replace(/([āø])([rŕ])\#/gi,"$1<3 2=\"$999\">$2<\/3>");}
    txt=txt.replace(/([ao][rŕ])#/gi,"$1");
    txt=txt.replace(/([rŕ])#/gi,"$10");}

  if(settings.ngrams.greyVowels=="true"){
    txt=txt.replace(/([àèìòù])/gi,"<3 2=\"$999\">$1<\/3>");}
  
  if(settings.ngrams.colorVoiced=="true"){
    txt=txt.replace(/([aeiouáéíóúâêîôûŕāöσõøōãåėëïőūüýŷųẏṛụẉ]|х)(?!0)/gi,"<3 2=\"$911\">$1<\/3>");
    txt=txt.replace(/([ḥbdgjlmnñrτvwyzĝĩśυ])(?!0)/gi,"<3 2=\"$$119\">$1<\/3>");
  }
    
  txt=txt.replace(/[ẉ]/g,"w");
  txt=txt.replace(/[ụ]/g,"υ");
  txt=txt.replace(/[ḥ]/g,"h");
  txt=txt.replace(/[ṛ]/g,"r");
  txt=txt.replace(/[Ḥ]/g,"H");
  txt=txt.replace(/([^0-9,])0/g,"<3 2=\"$999\">$1<\/3>");
  return txt;
}

function addSuperScripts(txt){
  return txt.replace(/[!]([^ ]*)/g,"<4>$1</4>");
}

function removeShit(txt){
         txt = txt.replace(/o\#/g,"o");  //tomeytoe/tomartoe DIALECT WOES
       //txt = txt.replace(/r\#/g,"");
         txt = txt.replace(/3/g,"font");
         txt = txt.replace(/2/g,"color");
         txt = txt.replace(/4/g,"sup");
         txt = txt.replace(/5/g,"span");
         txt = txt.replace(/6/g,"button");
         txt = txt.replace(/7/g,"onclick=\"var dv=this.innerHTML;this.parentNode.innerHTML=dv;");
         txt = txt.replace(/999/g,"666");
         txt = txt.replace(/9/g,"a");
         txt = txt.replace(/\#/g,"");
         return txt.replace(/\$/g,"#");

}

function revertWackyUpperCaseLettersToLower(word){
word=word.replace(/Σ/,"σ");
word=word.replace(/Υ/,"υ");
word=word.replace(/Τ/,"τ");
word=word.replace(/Π/,"π");
word=word.replace(/Δ/,"D");
word=word.replace(/ų/,"ẏ");

return word;
}


function identifyHeteronyms(txt){
    return txt.replace(/([^ ]*)\-(\-HETERONYM\-|\-htrnym\-|heterɔnjm)\-([^ ]*)/g,"\n <5><6 7\">$1</6>\n<6 7\">$3</6></5>");

 }








//Case functions
//Case functions
//Case functions
 
//IS THIS REALLY THE MOST EFFICIENT WAY TO ACHIEVE THIS?
function revertToOriginalCase(lcword,wcase){
    //alert("hi from revert to Originall Case\nlcword:= " + lcword + "\nwcase:= " + wcase);
    var wordlength=lcword.length;
    switch (wcase)
        {
         case "uppercase":
          var word=lcword.toUpperCase();
          return(word);
          break
         case "titlecase":
          var letter1=lcword.charAt(0);
          var letter1Upper=letter1.toUpperCase();
	 
          var rest=lcword.substr(1,wordlength-1);
          var word=letter1Upper+rest;
          return(word);
          break
         default:
          var word=lcword;
          return(word);
        }

}

//IS THIS REALLY THE MOST EFFICIENT WAY TO ACHIEVE THIS?
function wordCase(t){
   // alert("hi from word case");
  var output="not sure yet";
  var tlength=t.length;
  var firstletter=t.charAt(0);
  var lastletter=t.charAt(tlength-1);
  var secondlastletter=t.charAt(tlength-2);
  if( lastletter.match("0")){
    lastletter = secondlastletter;
}
  
    
  if(firstletter.match(/[A-ZÀÈÌÒÙĦÃĖŲẎŐŌŪÊÏÝÂÎŶÖÜËÛÔÕŔĀØÅÐĈŤĜÞÇŜŢΠΤŚĨÑΥÁÉÍÓÚ]/)){
    output="uppercase";
    if (tlength > 1){if (lastletter.match(/[a-zàèìòùħãėẏőōūêïýâîŷöüëûôõŕāøåðĉťĝþçŝţπτśĩñυáéíóú]/)){ output="titlecase"}}
  }
  else output="lowercase";
//alert(output);
 if(firstletter=="&"){output="titlecase"}
return (output);
}




//Orthographic functions
//Orthographic functions
//Orthographic functions

function removeInternalVowels(t)
{
  return t.replace(/([^ ])([aeiou][aeiou]*)/gi,"$1");
}



function getEntry(word){

  word=word.toLowerCase();
//  var result={augmented:word+"*",freq:999999} ;
  var result={a:word+"*",f:999999} ;
  if(typeof(lexicon[word])!=="undefined"){
      result=lexicon[word];
  }
//     var a=window.localStorage['AAa'+word];
//     var f=window.localStorage['AAf'+word];
//  if(a !=="undefined")
  //   result = {'a':a,'f':f};
  return result;
}

function clean(text){
  if(text.toocommon=='true')
  {return text.word}else
  {return  removeShit(greySilentLetters(addSuperScripts(identifyHeteronyms(text.word))));}
}

function augment(word){
  var ceys=wordCase(word);
  var augmentedword=getEntry(word);
//  var result=word;
  var result=word.replace(/([a-zA-Z]*)(xx|yy)/g,"$1");
  var toocommon= "true";
  //console.log(settings["lower-cutoff"]+' '+augmentedword.freq);
  if(augmentedword.f*1>settings["lower-cutoff"]*1){
    result= augmentedword.a;
//  if(augmentedword.freq*1>settings["lower-cutoff"]*1){
    //result= augmentedword.augmented;
//      console.log(settings["lower-cutoff"]+' '+augmentedword.freq);

    toocommon= "false";
  //console.log(word+": "+augmentedword.freq+"\n"+"settings.lower-cutoff: "+settings["lower-cutoff"]+"\n"+"result: "+result);
    result = augmentationFilter(result);
 //   result = removeShit(greySilentLetters(addSuperScripts(identifyHeteronyms(revertWackyUpperCaseLettersToLower(revertToOriginalCase(result,ceys))))));
  }//5-dec-16
     result = revertWackyUpperCaseLettersToLower(revertToOriginalCase(result,ceys));
 //5-dec-16 }
  return {'word':result,'toocommon':toocommon};
//  return revertToOriginalCase(result,ceys);
}

function formatAndAugment(word){
  return clean(augment(word));
}
//alert(localStorage['lower-cutoff']);
//AugmentPage(0);
//ClearSettings();
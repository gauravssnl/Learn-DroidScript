
var debug="true";

function load() {
//alert('good vibrations, wellness, equanimity and luv');
//multichoice layout settings
//  var LowerCutOff  =$('#lower-cutoff')[0];
  var Layout       =$('#layout')[0];

//letter pattern binary settings
  var Voiced       =$('#colorVoiced')[0];
  var GreyVowels   =$('#greyVowels')[0];
  var magicE       =$('#magicE')[0];
  var Pirate       =$('#pirate')[0];

  //Layout, Letter Patterns, and Sounds
  var PatternsBtn        = $('#PatternsBtn')[0];
  var LayoutBtn          = $('#LayoutBtn')[0];
  var SoundsBtn          = $('#SoundsBtn')[0];
  var ExtrasBtn          = $('#ExtrasBtn')[0];
  var AugmentationsBtn   = $('#AugmentationsBtn')[0];

  var VowelsHere    = $('#VowelsHere');
  var NamedVowelsHere    = $('#NamedVowelsHere');
  var SchwasHere    = $('#SchwasHere');
  var SilentVowelsHere    = $('#SilentVowelsHere');
  var ConsonantsHere    = $('#ConsonantsHere');
  
  makePatternControls();
  
 //alert('make augmentations  controls');
 
makeDiacriticsSelects(NamedVowelsHere,namedVowels);
makeDiacriticsSelects(SilentVowelsHere,silentVowels);
makeDiacriticsSelects(SchwasHere,schwas);
makeDiacriticsSelects(VowelsHere,Vowels);
makeDiacriticsSelects(ConsonantsHere,consonants);
  
setSounds();

    var debug                ='false';

  var currentLowerCutOff =  window.localStorage["lower-cutoff"];
// alert('options.js: lower-cutoff:= ' + currentLowerCutOff);

  var currentLayout =  window.localStorage.layout;
//  alert('current layout:= ' + currentLayout);
  if(currentLayout===undefined)
    {var LayoutItem=document.getElementById('N'); }
     else
     {var LayoutItem=document.getElementById(currentLayout);}
//        alert('layout control still not yet set');
    
     LayoutItem.selected="true";
//        alert('layout control set');
  Layout.addEventListener('change', function() {
      window.localStorage.layout=Layout.value;
        if(debug){console.log('layout: '+ Layout.value);}
       
  }, false);
 
 $("#ExtrasBtn").click(function(){AccordianOpen('ExtrasSection');});
 $("#SoundsBtn").click(function(){AccordianOpen('SoundsSection');});
 $("#PatternsBtn").click(function(){AccordianOpen('PatternsSection');});
 $("#LayoutBtn").click(function(){AccordianOpen('LayoutSection');});
 $("#AugmentationsBtn").click(function(){AccordianOpen('AugmentationsSection');});
/**/


AddChkBxListnrz(Pirate);
AddChkBxListnrz(GreyVowels);
AddChkBxListnrz(Voiced);
AddChkBxListnrz(magicE);

}

function setSounds() {

  var wavs     =['wavs/@.wav','wavs/lcurly.wav','wavs/e.wav',"wavs/I.wav","wavs/o.wav","wavs/VV.wav","wavs/eI.wav","wavs/idots.wav","wavs/aI.wav","wavs/@U.wav","wavs/U.wav","wavs/OI.wav","wavs/UU.wav","wavs/aU.wav","wavs/Odots.wav","wavs/udots.wav","wavs/3dots.wav","wavs/Adots.wav","wavs/I@.wav","wavs/e@.wav","wavs/U@.wav","wavs/b.wav","wavs/k.wav","wavs/tS.wav","wavs/d.wav","wavs/f.wav","wavs/g.wav","wavs/h.wav","wavs/dZ.wav","wavs/l.wav","wavs/m.wav","wavs/n.wav","wavs/NN.wav","wavs/p.wav","wavs/r.wav","wavs/s.wav","wavs/SS.wav","wavs/t.wav","wavs/TT.wav","wavs/DD.wav","wavs/v.wav","wavs/w.wav","wavs/j.wav","wavs/z.wav","wavs/ZZ.wav"];
 
 var WAVElements =[];
 
 
   function augSound(e){
    console.log(e);
    var snd = new Audio(e); // buffers automatically when created
    snd.play();
   }

 
//  for (i=0;i<wavs.length;i++){
  for (i in wavs){
    var sndfyl = wavs[i];
    WAVElements[sndfyl] = document.getElementById(sndfyl);
    WAVElements[sndfyl].addEventListener('click', function(){
      augSound(this.id);
      });
    }
//alert('sounds set');
}

//Makes diacritics controls with makeDivSelect then adds event listener
//then checks local storage to populates controls
function makeDiacriticsSelects(dompoint,lettertype){
  for(i=0;i<lettertype.length;i++){
    var aug=lettertype[i].aug;
    var ltr=lettertype[i].ltr;
    var def=lettertype[i].state;
    
    var augString = makeDivSelect(aug,ltr);
    
    dompoint.after(augString);

    $('#'+aug).change(function() {
      window.localStorage[this.id]=this.value;
      if(debug){console.log(this.id+'aug: '+ window.localStorage[this.id]);}
      });
   
    var currentAug =  window.localStorage[aug];
//    alert('current aug:= ' +currentAug);
 //   var targ=$('#'+aug);
     var targ=$('#'+aug).find('#'+currentAug)[0];
//     alert("\nLooking for current\n i:= " + i +"\naug:= " + aug +"\nltr:= " + ltr +"\ndef:= " + def + ltr +"\ncAug:= " +currentAug );
    if(currentAug===undefined){
      var targ=$('#'+aug).find('#'+aug)[0];
//      alert('Aug undefined - about to set diacritic selection optionTrue' +aug);
      var att = document.createAttribute("selected");
      att.value="true";
      targ.setAttributeNode(att);
//      targ.setAttribute('selected',null);
      window.localStorage[aug]=def;
      }else{
//      alert('Aug defined - about to set diacritic selection optionTrue ' +aug +', ' + def + ', '+ltr);
      var att = document.createAttribute("selected");
      att.value="true";
      targ.setAttributeNode(att);
//      targ.setAttribute('selected',null);
       }
    
  }
//alert('diacritic controls made');
}



//toggles Layout, Letter Patterns Augmentations Sounds and Extras Accordians open and expanded
function AccordianOpen(id) {
    var x = document.getElementById(id);
    //alert('x.parentNode.innerHTML');
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}



//Makes the augmentation drop down controls
function makeDivSelect(aug,ltr){
    
    var dvo     ="<div class='w3-col l2 m2 s6 w3-padding w3-border'>";
    var lbl     = "<label class='w3-third w3-center w3-xlarge' for='" +aug +"'>" +aug +"</label>";
    var selecto = "<select class='w3-twothird ' id='" + aug +"'>";
    var opt1    =   "<option id='mask' value='mask'>mask</option>";
    var opt3    =   "<option id='"+aug+"' value='"+aug+"' selected>"+aug+"</option>";
    var opt2    =   "<option id='"+ltr+"' value='"+ltr+"'>"+ltr+"</option>";
    var selectc = "</select>";
    var dvc     ="</div>";
    
    return  dvo + lbl + selecto + opt1 + opt2 + opt3 + selectc + dvc;
   
 }



//This function adds eventListeners to all check boxes
//
function AddChkBxListnrz(ChkBxVrbl){
    if((window.localStorage[ChkBxVrbl.value]===undefined) || (window.localStorage[ChkBxVrbl.value]==='') )
    {ChkBxVrbl.checked=false;}
    else
     {window.localStorage[ChkBxVrbl.value]=ChkBxVrbl.value;
     ChkBxVrbl.checked=true;}
    
    ChkBxVrbl.addEventListener('change', function() {
      var state='';
      if(ChkBxVrbl.checked){state=ChkBxVrbl.value;}
      window.localStorage[ChkBxVrbl.value]=state;
      console.log(window.localStorage[ChkBxVrbl.value] + "set to " +ChkBxVrbl.value);
//      if(debug){console.log(ChkBxVrbl.value + ' changed: '+ state + ', localStorage[' +ChkBxVrbl.value+']: ' + window.localStorage[ChkBxVrbl.value]);}
      }, false);
    }


//This function adds the check boxes that turn multi-letter pattern recognition on and off
// ie. recognising tion ing er or
function makePatternControls() {
for(p in patterns){
    var chkd="";
    var rpl   = patterns[p].ltr;
    var orig  = patterns[p].aug;
    if(patterns[p].state!=='' && window.localStorage[rpl]===undefined)
   {chkd=' checked ';window.localStorage[rpl]=rpl}
    orig=orig.replace(/(.)0/,"<span class='silent'>$1</span>")
/**/
    var text  = orig +"→"+rpl;
    var dvo   = "<div class='w3-xlarge w3-padding-medium w3-col  l3 m6 s6 '>";
 //   var inpt  = "<input class='w3-check ' type='checkbox' id='" + rpl+"' value='"+rpl+"'>";
var inpt  = "<input class='w3-check ' type='checkbox' id='" + rpl+"' value='"+rpl+"'"+chkd+">";
    var lbl   = "<label for='" +rpl +"'>" +text +"</label>";
    var dvc  = "</div>";
 
   $("#PatternsBoxes").after(dvo+inpt+lbl+dvc);
  AddChkBxListnrz($("#"+rpl)[0]);

 }
// alert('pattern controls made');
}


document.addEventListener('DOMContentLoaded', load);
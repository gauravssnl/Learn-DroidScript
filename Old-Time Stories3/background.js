// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.



function getFiltrSbStr(diType){
  var res="";
  for(dT in diType){
    aug=diType[dT].aug;
    res=res + ", " + getSetting(aug)+aug;
  }
  return res;
}

function getPatternsStr(){
  var result="";
  for(p in patterns){
    result=result +", "+ getSetting(patterns[p].ltr);
  }
  return result;
}


function getCodeStr(){
  var lowerc       =getSetting("lower-cutoff");
  var voiced       =getSetting("COLORVOICED");
  var pirate         =getSetting("PIRATE");
  var layout        =getSetting("layout");
  var greyVowels  =getSetting("GREYVowels");
  var magicE     =getSetting("MAGICE");
     
  var filtrstr=voiced    + ', '  + pirate + ', '+ greyVowels + ', ' + magicE;

      filtrstr=filtrstr + getPatternsStr();
      filtrstr=filtrstr + getFiltrSbStr(namedVowels);
      filtrstr=filtrstr + getFiltrSbStr(silentVowels);
      filtrstr=filtrstr + getFiltrSbStr(schwas);
      filtrstr=filtrstr + getFiltrSbStr(Vowels);
      filtrstr=filtrstr + getFiltrSbStr(consonants);

      console.log(getFiltrSbStr(Vowels));
      console.log(getFiltrSbStr(namedVowels));
      console.log(getFiltrSbStr(silentVowels));
      console.log(getFiltrSbStr(schwas)); 
      
 
//   var codestr="settings['lower-cutoff']='"+ lowerc +"';";
//       codestr= codestr + "settings['layout']=\'"+ layout +"';";
//       codestr= codestr + 'AugmentPage(\"' + filtrstr + 'no\");';
//       app.Debug(codestr);
   var   codestr= "'" + filtrstr + "'";
       app.Debug(codestr);

       return codestr;
}



function getSetting(s){
  if (window.localStorage == null)
          return "empty";
  if (window.localStorage[s] == null)
      return "empty";
//  console.log(s +': ' + window.localStorage[s]);
  return window.localStorage[s];
}
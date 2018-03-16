 var namedVowels =
 [
   {'aug':'â',    'ltr':'a', 'state':'â'},
   {'aug':'ê',    'ltr':'e', 'state':'ê'},
   {'aug':'î',    'ltr':'i', 'state':'î'},
   {'aug':'ô',    'ltr':'o', 'state':'ô'},
   {'aug':'û',    'ltr':'u', 'state':'û'}
   
   ];

var silentVowels =
 [
   {'aug':'à',    'ltr':'a', 'state':'à'},
   {'aug':'è',    'ltr':'e', 'state':'è'},
   {'aug':'ì',    'ltr':'i', 'state':'ì'},
   {'aug':'ò',    'ltr':'o', 'state':'ò'},
   {'aug':'ù',    'ltr':'u', 'state':'ù'}
   ];
   
var schwas =
 [
   {'aug':'á',    'ltr':'a', 'state':'á'},
   {'aug':'é',    'ltr':'e', 'state':'é'},
   {'aug':'í',    'ltr':'i', 'state':'í'},
   {'aug':'ó',    'ltr':'o', 'state':'ó'},
   {'aug':'ú',    'ltr':'u', 'state':'ú'}
  ];
  
 var Vowels=
  [
   {'aug':'ā',    'ltr':'a', 'state':'ā'},
   {'aug':'ã',    'ltr':'a', 'state':'ã'},
   {'aug':'å',    'ltr':'a', 'state':'å'},
   {'aug':'ė',    'ltr':'e', 'state':'ė'},
   {'aug':'ë',    'ltr':'e', 'state':'ë'},
   {'aug':'ï',     'ltr':'i', 'state':'ï'},
   {'aug':'ö',    'ltr':'o', 'state':'ö'},
   {'aug':'ō',    'ltr':'o', 'state':'ō'},
   {'aug':'σ',    'ltr':'o', 'state':'σ'},
   {'aug':'õ',    'ltr':'o', 'state':'õ'},
   {'aug':'ø',    'ltr':'o', 'state':'ø'},
   {'aug':'ő',    'ltr':'o', 'state':'ő',},
   {'aug':'ū',    'ltr':'u', 'state':'ū'},
   {'aug':'ü',    'ltr':'u', 'state':'ü'},
   {'aug':'ŕ',    'ltr':'r', 'state':'ŕ'},
   {'aug':'ý',    'ltr':'y', 'state':'ý'},
   {'aug':'ŷ',    'ltr':'y', 'state':'ŷ'},
   {'aug':'ẏ',    'ltr':'y', 'state':'ẏ'}
  ];

var people =
[
  {'name':'toby','description':'5ft 10 with freckles'},
  {'name':'max','description':'smelly teenager'}
];

  var consonants=
  [
   {'aug':'ĉ',    'ltr':'c', 'state':'ĉ'},
   {'aug':'ŝ',    'ltr':'s', 'state':'ŝ'},
 //  {'aug':'x',    'ltr':'x', 'state':'x'},
//   {'aug':'j',    'ltr':'j', 'state':'j'},
   {'aug':'ç',    'ltr':'c', 'state':'ç'},
   {'aug':'ć',    'ltr':'c', 'state':'ć'},
   {'aug':'ð',    'ltr':'d', 'state':'d'},
   {'aug':'ĝ',    'ltr':'g', 'state':'ĝ'},
   {'aug':'ĩ',    'ltr':'i', 'state':'ĩ'},
   {'aug':'ñ',    'ltr':'n', 'state':'ñ'},
   {'aug':'þ',    'ltr':'p', 'state':'þ'},
   {'aug':'ś',    'ltr':'s', 'state':'s'},
   {'aug':'ţ',    'ltr':'t', 'state':'ţ'},
   {'aug':'ť',    'ltr':'t', 'state':'ť'},
   {'aug':'υ',    'ltr':'u', 'state':'υ'}
  ];
  
    var patterns =
  [
    {'ltr':'õẉ',  'aug':'õw0', 'state':''},
    {'ltr':'oẉ',  'aug':'õw0', 'state':''},
    {'ltr':'ed',  'aug':'èd', 'state':''},
    {'ltr':'eo',  'aug':'êo', 'state':''},
    {'ltr':'ei',  'aug':'êì', 'state':''},
    {'ltr':'wr',  'aug':'w0r', 'state':''},
    {'ltr':'ck',  'aug':'ck0', 'state':''},
    {'ltr':'aẉ',  'aug':'åw0', 'state':''},
    {'ltr':'wḥ',  'aug':'wħ', 'state':''},
    {'ltr':'wa',  'aug':'wå', 'state':''},
    {'ltr':'oa',  'aug':'ôà', 'state':''},
    {'ltr':'eẉ',  'aug':'ëw0', 'state':''},
    {'ltr':'oy',  'aug':'σy0', 'state':'oy'},
    {'ltr':'oi',  'aug':'σì', 'state':'oi'},
    {'ltr':'ey',  'aug':'êy', 'state':''},
    {'ltr':'aụ',  'aug':'åù', 'state':''},
    {'ltr':'oo',  'aug':'öò', 'state':''},
    {'ltr':'ôẉ',  'aug':'ôw0', 'state':''},
    {'ltr':'iṛ',  'aug':'ìŕ', 'state':''},
    {'ltr':'ãy',  'aug':'ây0', 'state':''},
    {'ltr':'ia',  'aug':'ïá', 'state':''},
    {'ltr':'ry',  'aug':'rý', 'state':''},
    {'ltr':'õụ',  'aug':'õù', 'state':'õυ'},
    {'ltr':'oụ',  'aug':'õù', 'state':'õυ'},
    {'ltr':'ai',  'aug':'âì', 'state':''},
    {'ltr':'ee',  'aug':'êè', 'state':''},
    {'ltr':'ie',  'aug':'ïè', 'state':''},
    {'ltr':'ea',  'aug':'êà', 'state':''},
    {'ltr':'uṛ',  'aug':'ùŕ', 'state':''},
    {'ltr':'aṛ',  'aug':'ār', 'state':''},
    {'ltr':'oṛ',  'aug':'ør', 'state':''},
    {'ltr':'ng',  'aug':'ñg0', 'state':''},
    {'ltr':'tion',  'aug':'ţìòn', 'state':''},
    {'ltr':'eṛ',  'aug':'èŕ', 'state':''},
    {'ltr':'ch',  'aug':'ĉħ', 'state':'ĉħ'},
    {'ltr':'sh',  'aug':'ŝħ', 'state':''},
    {'ltr':'th',  'aug':'πħ', 'state':'πħ'},
//    {'ltr':'th',  'aug':'tħ', 'state':''},
    {'ltr':'τḥ',  'aug':'τħ', 'state':'τħ'}
  ];
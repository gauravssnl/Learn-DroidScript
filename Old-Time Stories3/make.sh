head -$1 lex.orig > lex.js
echo "}" >> lex.js
tail -15  lex.js

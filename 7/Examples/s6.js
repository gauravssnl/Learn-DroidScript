/* Class based on the "Module" pattern
The advantage is that this pattern provides a full restriction of access to certain components of the object.

The following two examples were reflected in the very first method described by me at the beginning of the article, but nevertheless I will post these two, for fixing the material.

Example with public fields and methods:
*/
TestModule it is // class javascript 
var testModule = ( function ( ) { 

  var counter = 0 ; 

  return {

    incrementCounter : function ( ) { 
      return counter ++; 
    } ,

    resetCounter : function ( ) {
      console. Log ( "counter value prior to reset: " + counter ) ;
      counter = 0 ; 
    }
  } ; } ; 

} ) ( ) ; 

// Usage: 

// Increment our counter
testModule. incrementCounter ( ) ; 

// Check the counter value and reset 
// Outputs: 1
testModule. resetCounter ( ) ; 
// end example class javascript


// Example with private methods and fields:
var myNamespace = ( function ( ) { 

  var myPrivateVar , myPrivateMethod ; 

  // A private variable counter
  myPrivateVar = 0 ; 

  // A private function which logs any arguments
  myPrivateMethod = function ( foo ) {
      console. log ( foo ) ; 
  } ; 

  return { 

    // A public variable
    myPublicVar : "foo" , 

    // A public function utilizing privates
    myPublicFunction : function ( bar ) { 

      // Increment our private counter
      myPrivateVar ++; 

      // Call our private method using bar
      myPrivateMethod ( bar ) ; 

    } 
  } ; 

} ) ( ) ;


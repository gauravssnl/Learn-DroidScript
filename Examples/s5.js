/*
JS class as an object specified by literals
The advantages of this approach is that we can encapsulate the data of this class further into the descendants of the class.
*/

var myModule = {

  myProperty : "someValue" , 

  // object literals can contain properties and methods. 
  // eg we can define a further object for module configuration:
  myConfig : {
    useCaching : true ,
    language : "en" 
  } , 

  // a very basic method
  myMethod : function ( ) {
    console. log ( "Where in the world is Paul Irish today?" ) ; 
  } ,

  // output a value based on the current configuration
  myMethod2 : function ( ) {
    console. log ( "Caching is:" + ( this . myConfig . useCaching ) ? "enabled" : "disabled" ) ; 
  } , 

  // override the current configuration
  myMethod3 : function ( newConfig ) { 

    if ( typeof newConfig === "object" ) { 
      this .myConfig = newConfig ; 
      console. log ( this . myConfig . language ) ; 
    } 
  } 
} ; 

// myModule it is class javascript 
// Outputs: Where in the world is Paul Irish today? 
myModule. myMethod ( ) ; 

// Outputs: enabled
myModule. myMethod2 ( ) ; 

// Outputs: fr
myModule. myMethod3 ( {
  language : "fr" ,
  useCaching : false 
}) ;
Class based on the "Module" pattern
The advantage is that this pattern provides a full restriction of access to certain components of the object
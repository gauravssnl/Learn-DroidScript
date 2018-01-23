function f (a, b, c) {
    return a * b + c;
}
f.call (f, 1, 2, 3); // arguments are separated by commas;
var args = [1,2,3];
f.apply (f, args); // // Arguments are passed as an array;
// In both cases, the function f is called  with arguments a = 1, b = 2, c = 3;
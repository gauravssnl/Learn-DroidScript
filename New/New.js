l = [1, 2, 3, 4];
t = 2;
for(i = 0; i < t; i++) {
  t = l.pop();
  l.unshift(4)
}
alert(l)
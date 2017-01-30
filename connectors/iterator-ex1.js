function* kali(){
  var index = 1;
  while(true) {
    yield index++;
  }
}

var it = kali();

console.log(it.next());
console.log(it.next());

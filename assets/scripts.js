// Framework -------------------

function c(arg) {
  return console.log(arg);
}

// -----------------------------

var titulo  = document.getElementsByTagName('h1')[0];
var titulos = document.getElementsByTagName('h2');

var before  = document.createElement("a");

// c(titulo);

titulo.insertBefore(before, titulo.childNodes[0]);

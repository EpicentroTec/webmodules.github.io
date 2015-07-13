// Adiciona línhas numeradas ao módulo Bloco de Código
document.load = (function() {

  var code  = document.getElementsByClassName('code');
  var pl = code.length;

  for (var i = 0; i < pl; i++) {
    code[i].innerHTML = '<span class="line-number"></span>' + code[i].innerHTML + '<span class="cl"></span>';
    var num = code[i].innerHTML.split(/\n/).length;
    for (var j = 0; j < num; j++) {
      var line_num = code[i].getElementsByTagName('span')[0];
      line_num.innerHTML += '<span>' + (j + 1) + '</span>';
    }
  }

})();

"use strict";

// Framework -------------------------------------------------------------------

function c(arg) {
  return console.log(arg);
}

// -----------------------------------------------------------------------------

window.onload = function () {

  var player = document.getElementsByClassName('player');

  // Inicializa variáveis

  for (var i = 0; i < player.length; i++) {

    var isAutoPlay = player[i].getAttribute('data-autoplay');
    var isLoop     = player[i].getAttribute('data-loop');

    var controls = player[i].getElementsByClassName('controls')[0];

      var playerStop   = controls.getElementsByClassName('control-stop')[0];
      var playerPlay   = controls.getElementsByClassName('control-play')[0];
      var playerPrev   = controls.getElementsByClassName('control-prev')[0];
      var playerNext   = controls.getElementsByClassName('control-next')[0];
      var playerVolume = controls.getElementsByClassName('control-volume')[0].getElementsByTagName('input')[0];

    var playlist = player[i].getElementsByClassName('playlist')[0];

      var tableRow = playlist.getElementsByTagName('tr');

        var trackPause = playlist.getElementsByClassName('track-pause')[0];
        var trackPlay  = playlist.getElementsByClassName('track-play')[0];

        var tracks = playlist.getElementsByClassName('track');

        var allTrackPlay  = playlist.getElementsByClassName('track-play');
        var allTrackPause = playlist.getElementsByClassName('track-pause');

        // Adiciona os eventos aos botões

        playerStop.setAttribute('onclick', 'stopAll()');
        playerPlay.setAttribute('onclick', 'playAll()');
        playerPrev.setAttribute('onclick', 'playPrev()');
        playerNext.setAttribute('onclick', 'playNext()');
        playerVolume.setAttribute('onmousedown', 'setVolume()');
        playerVolume.setAttribute('onmouseup', 'unsetVolume()');

        for (var i = 0; i < allTrackPlay.length; i++) { allTrackPlay[i].setAttribute('onclick', 'playTrack(this)')}

        for (var i = 0; i < allTrackPause.length; i++) { allTrackPause[i].setAttribute('onclick', 'pauseTrack(this)')}

        // Iguala o volume dos tracks com o volume do player

        for (var i = 0; i < tracks.length; i++) { tracks[i].volume = playerVolume.value/10}

  }

  // Se o atributo 'data-autoplay' está com o valor 'true' o play inicia automaticamente

  if (isAutoPlay == "true") { playTrack(trackPlay)}
}



// Controlador de volume do player

var trackVolume;

function setVolume() {

  var player = document.getElementsByClassName('player');

  for (var i = 0; i < player.length; i++) {

    trackVolume = setInterval(function() {

      for (var i = 0; i < player.length; i++) {

        var nowVolume = player[i].getElementsByClassName('control-volume')[0].getElementsByTagName('input')[0].value/10;

        var tracks = player[i].getElementsByClassName('track');

        for (var i = 0; i < tracks.length; i++) {

          tracks[i].volume = nowVolume;
        }
      }
    },10);
  }
}

function unsetVolume() {

  clearInterval(trackVolume);
}

function playTrack(elm) {

  var thisTrack   = elm.parentNode.parentNode.getElementsByClassName('track')[0];
  var otherTracks = elm.parentNode.parentNode.parentNode.getElementsByClassName('track');

  for (var i = 0; i < otherTracks.length; i++) {

    otherTracks[i].setAttribute('class', 'track');
    otherTracks[i].pause();
  }

  thisTrack.setAttribute('class', 'track playing');

  thisTrack.play();

  // Quando termina, toca a próxima track

  thisTrack.onended = function() {

    var player = document.getElementsByClassName('player');

    var nextTrack;

    for (var i = 0; i < player.length; i++) {
      var isLoop = player[i].getAttribute('data-loop');
    }

    if (elm.parentNode.parentNode.nextSibling.nextElementSibling) {

      nextTrack = elm.parentNode.parentNode.nextSibling.nextElementSibling.getElementsByClassName('track-play')[0];

      playTrack(nextTrack);

    } else if (isLoop == "true") {

      var firstTrack = elm.parentNode.parentNode.parentNode.getElementsByClassName('track')[0];

      playTrack(firstTrack);
    }
  }
}

function pauseTrack(elm) {

  var thisTrack = elm.parentNode.parentNode.getElementsByClassName('track')[0];

  thisTrack.pause();
}

function stopAll() {

  var player = document.getElementsByClassName('player');

  for (var i = 0; i < player.length; i++) {

    var allTracks = player[i].getElementsByTagName('audio');

    for (var i = 0; i < allTracks.length; i++) {

      allTracks[i].setAttribute('class', 'track');
      allTracks[i].pause();
      allTracks[i].currentTime = 0;
    }
  }
}

function playAll() {

  var player = document.getElementsByClassName('player');

  for (var i = 0; i < player.length; i++) {

    var otherTracks = player[i].getElementsByClassName('track');
  }

  for (var i = 0; i < otherTracks.length; i++) {

    otherTracks[i].pause();
    otherTracks[i].currentTime = 0;
  }

  for (var i = 0; i < player.length; i++) {

    var firstPlayTrack = player[i].getElementsByClassName('track-play')[0];

    playTrack(firstPlayTrack);

  }
}

function playPrev() {

  var player = document.getElementsByClassName('player');

  for (var i = 0; i < player.length; i++) {

    if (player[i].getElementsByClassName('playing')[0] != undefined && player[i].getElementsByClassName('playing')[0].parentNode.parentNode.previousElementSibling) {

      var nextTrack = player[i].getElementsByClassName('playing')[0].parentNode.parentNode.previousElementSibling.getElementsByClassName('track-play')[0];

      playTrack(nextTrack);
    }
  }
}

function playNext() {

  var player = document.getElementsByClassName('player');

  for (var i = 0; i < player.length; i++) {

    if (player[i].getElementsByClassName('playing')[0] != undefined && player[i].getElementsByClassName('playing')[0].parentNode.parentNode.nextElementSibling) {

      var nextTrack = player[i].getElementsByClassName('playing')[0].parentNode.parentNode.nextElementSibling.getElementsByClassName('track-play')[0];

      playTrack(nextTrack);
    }
  }
}

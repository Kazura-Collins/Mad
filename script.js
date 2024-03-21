// Función para responder
function responder(respuesta) {
  // Cargar el archivo JSON de respuestas
  fetch('respuestas.json')
    .then(response => response.json())
    .then(data => {
      var mensajes = data[respuesta.toLowerCase()]; // Obtener la lista de mensajes según la respuesta
      var mensaje = mensajes[Math.floor(Math.random() * mensajes.length)]; // Elegir un mensaje aleatorio
      document.getElementById('respuesta').innerText = mensaje; // Mostrar el mensaje en el elemento HTML
    })
    .catch(error => {
      console.error('Error al cargar el archivo JSON:', error);
      document.getElementById('respuesta').innerText = 'Error al cargar las respuestas.';
    });
}

// Función para reproducir música
function reproducirMusica() {
  var canciones = ['cancion1.mp3', 'cancion2.mp3', 'cancion3.mp3', 'cancion4.mp3', 'cancion5.mp3'];
  var randomIndex = Math.floor(Math.random() * canciones.length);
  var audio = new Audio('music/' + canciones[randomIndex]);
  audio.play();

  // Cambiar el GIF al de pausa cuando la música se esté reproduciendo
  var gifMusica = document.getElementById('gifMusica');
  gifMusica.src = 'https://media.tenor.com/NnzehrExkuYAAAAi/kirby-cute.gif';

  // Detener la música y cambiar el GIF al de reproducción cuando se haga clic nuevamente
  document.getElementById('botonMusica').onclick = function() {
    if (audio.paused) {
      audio.play();
      gifMusica.src = 'https://media.tenor.com/NnzehrExkuYAAAAi/kirby-cute.gif';
    } else {
      audio.pause();
      gifMusica.src = 'https://media.tenor.com/GPMqRbwdDFkAAAAi/sleepy-sleeping.gif';
    }
  };

  // Asignar la función retroceder al botón correspondiente
  document.getElementById('botonRetroceder').onclick = function() {
    retroceder();
  };

  // Asignar la función adelantar al botón correspondiente
  document.getElementById('botonAdelantar').onclick = function() {
    adelantar();
  };

  // Función para retroceder
  function retroceder() {
    // Restar 1 al índice actual
    randomIndex--;
    // Si el índice es menor que 0, retrocedemos al final del arreglo de canciones
    if (randomIndex < 0) {
      randomIndex = canciones.length - 1;
    }
    // Reproducir la nueva canción
    reproducirCancion();
  }

  // Función para adelantar
  function adelantar() {
    // Sumar 1 al índice actual
    randomIndex++;
    // Si el índice es mayor o igual a la longitud del arreglo de canciones, volvemos al inicio
    if (randomIndex >= canciones.length) {
      randomIndex = 0;
    }
    // Reproducir la nueva canción
    reproducirCancion();
  }

  // Función para reproducir la canción actual
  function reproducirCancion() {
    audio.src = 'music/' + canciones[randomIndex];
    audio.play();
  }

   // Evento para reproducir la siguiente canción al terminar la actual
   audio.addEventListener('ended', function() {
    adelantar();
  });
}

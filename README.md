# ironhack-project-1-arcade-game
Primer proyecto de OOP - Videojuego

## ROAD FURY

### Objectivos Primarios (MVP)

- __Juego de coches de scroll vertical__.
- __Player__: Coche que tendrá que esquivar los diferentes obstáculos (__ENEMIES__) que aparezcan programáticamente en su camino.
  - La velocidad del Player se mantendrá constante si no se pulsa ningún botón de dirección. 
  - El Player podrá moverse en las 4 direcciones (`Arriba` - `Abajo` -`Derecha` - `Izquierda`).
  - Si el Player se sale de la carretera, disminuirá su velocidad.
  - El Player tendrá un total de __3 vidas__ ❤️❤️❤️. Si colisiona con algún obstáculo dentro o fuera de la carretera (__ENEMY__) perderá una vida. Si el Player pierde sus 3 vidas será __GAME OVER__.
- __Carretera__: La Carretera será el camino principal donde circulará el __Player__. Constará de 4 carriles y el __Player__ podrá moverse con libertad dentro de ella.
- __Bordes de la Carretera__: a ambos lados de la Carretera existirá una zona de campo donde aparecerán de manera _programada_ obstáculos (__ENEMIES__) que podrá colisionar con el Player si éste se sale de la carretera y circula por el campo. 
- __Enemies__:  Existirán 2 tipos de obstáculos: _Móviles_ y _Estáticos_.
  - __Móviles__: Coches que aparecerán desde el borde superior de la pantalla y que se irán desplazando hacia la parte inferior de la pantalla a una velocidad ligeramente inferior a la del __Player__ 
  - __Estáticos__: Obstáculos que aparecerán de manera programada en los bordes de la carretera. Estos obstáculos tendrá una velocidad constante.

### DEFINICIÓN DE OBJETIVOS

- Game (game.js): Motor del juego. Archivo que servirá para manejar los eventos programados del juego, así como la creación de la __Carretera__, __Player__ , __Enemies__ y __Vidas__. También controlará la _monitorización de Eventos_ que controlarán el movimiento del __Player__ y la gestion de colisiones con los opbstáculos.
- Player (player.js): ???
- Enemies (enemy-car.js, obstacle.js): ???
- Carretera (road.js): Constará de una fila central comopuesta de 4 carriles.
- Bordes (side-road.js.): Unica clase que se usará para crear los bordes de la carretera: __Uno a la izquierda__ y __otro a la derecha. 
- Vidas (lives.js): Clases para crear un objeto con una propiedad `lives` con valor 3. 
- ⚡⚡⚡__Colisión de objetos__: Cuando el Payer colisiona con un Enemy el Player se vuelve _invulnerable_ durante 2 segundos en los que parpadeará. 
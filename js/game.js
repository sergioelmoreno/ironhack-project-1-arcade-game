const Game = {

  gameDimensions: {
    h: window.innerHeight,
    w: window.innerWidth,
  },
  frameCounter: 0,
  enemycounter: 0,
  player: undefined,
  playerLives: undefined,
  roadBackground: undefined,
  sideroadBackground: undefined,
  points: 0,
  enemies: [],
  keys: {
    left: "ArrowLeft",
    right: "ArrowRight",
    up: "ArrowUp",
    down: "ArrowDown"
  },
  collisionActive: true,
  keysPressed: {
    pressed: false,
    keyCode: ""
  },
  gameOver: false,
  gameEngine: undefined,

  init() {


    this.setSize()
    this.setCounterFrames()
    this.setEventsListener()
    this.roadBackground = new Background(this.gameDimensions)
    this.roadsideBackground = new Roadside(this.gameDimensions, this.roadBackground.position.left, this.roadBackground.size.width)
    this.player = new Player(this.gameDimensions, this.keysPressed)
    this.playerLives = new Lives(this.gameDimensions)

  },

  setSize() {

    document.querySelector("#game-screen").style.width = this.gameDimensions.w
    document.querySelector("#game-screen").style.height = this.gameDimensions.h

  },

  setCounterFrames() {

    if (!this.gameOver) {

      this.gameEngine = setInterval(() => {

        if (this.frameCounter === 5000) {
          this.frameCounter = 0

        } else {
          this.frameCounter++
        }

        if (this.frameCounter % 50 === 1) {
          this.createNewEnemy()
        }
        if (this.playerLives.lives.current === 0) {
          this.gameOver()
        }

        this.updatePoints()
        this.updateObjects()
        this.detectPlayerCollision()
        this.removeEnemies()

      }, 20)
    }

  },

  updateObjects() {

    this.roadBackground.move()
    this.roadsideBackground.move()
    this.enemies.forEach(enemy => {
      enemy.move()
    })
    this.player.move(this.keysPressed)

    if (this.playerLives.lives.current === 0) {
      this.runGameOver()
    }

  },

  updatePoints() {

    this.points++
    this.pointsCounterElement = document.querySelector(".points-container")
    this.pointsGameOverelement = document.querySelector(".game-over-points")
    this.pointsCounterElement.style.opacity = this.gameOver ? "0" : "1"
    this.pointsCounterElement.querySelector("span.points").innerHTML = `${this.points.toString().padStart(5, '0')}`
    this.pointsGameOverelement.innerHTML = `${this.points.toString().padStart(5, '0')}`

  },

  setEventsListener() {

    const handlePressed = (event) => {
      if (Object.values(this.keys).includes(event.code)) {
        this.keysPressed.pressed = true
        this.keysPressed.keyCode = event.code

      }
    }

    const handleReleased = (event) => {
      if (event.type === "keyup") {
        this.keysPressed.pressed = false
        this.keysPressed.keyCode = ""
      }
    }

    document.addEventListener("keydown", event => handlePressed(event))
    document.addEventListener("keyup", event => handleReleased(event))

  },

  detectPlayerCollision() {

    const playerRect = this.player.playerElement.getBoundingClientRect();

    this.enemies.forEach(enemy => {

      const enemyRect = enemy.enemyElement.getBoundingClientRect();

      if (this.collisionActive) {

        if (
          enemyRect.x < playerRect.x + playerRect.width &&
          enemyRect.x + enemyRect.width > playerRect.x &&
          enemyRect.y < playerRect.y + playerRect.height &&
          enemyRect.y + enemyRect.height > playerRect.y
        ) {

          this.managePlayerCollision()
          this.destroyEnemy(enemy)

          if (this.playerLives.lives.current === 0) {
            this.runGameOver()
          }

        }

      }

    })

  },

  managePlayerCollision() {

    this.collisionActive = false
    this.playerLives.lives.current--
    this.playerLives.updateLives()

    if (!this.collisionActive) {

      const blink = setInterval(() => {
        this.player.playerElement.style.filter = this.player.playerElement.style.filter === "none" ? "hue-rotate(300deg) brightness(1.75)" : "none"
      }, 40)

      setTimeout(() => {
        this.collisionActive = true
        clearInterval(blink)
        this.player.playerElement.style.filter = "none"
      }, 1500)

    }

  },

  createNewEnemy() {

    const leftPos = () => {
      const random = Math.random()
      return (this.roadBackground.position.left + this.roadBackground.size.width * random)
    }

    const enemy = new Enemy(this.gameDimensions, leftPos(), this.enemies.length + 1, this.roadBackground.size.width)
    this.enemies.push(enemy)

  },

  destroyEnemy(enemy) {

    const blink = setInterval(() => {
      enemy.enemyElement.style.filter = this.player.playerElement.style.filter === "none" ? "hue-rotate(130deg) brightness(1.75)" : "none"
    }, 40)

    setTimeout(() => {
      clearInterval(blink)
      enemy.enemyElement.style.filter = "none"
      enemy.enemyElement.remove()
      const element = this.enemies.find((elm) => {
        return elm.id === enemy.id
      })

      this.enemies.splice(this.enemies.indexOf(element), 1)

    }, 750)

  },

  removeEnemies() {

    this.enemies.forEach((enemy, idx) => {
      if (enemy.position.top >= this.gameDimensions.h - 10) {
        enemy.enemyElement.remove()
        this.enemies.splice(idx, 1)
      }
    })

  },

  runGameOver() {

    this.gameOver = true
    clearInterval(this.gameEngine)
    this.enemies = []
    document.querySelectorAll(".enemy").forEach(elem => elem.remove())
    const dialog = document.querySelector("dialog")
    dialog.showModal()
    this.updatePoints()

  },

}
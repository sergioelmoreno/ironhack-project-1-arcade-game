class Enemy {

  constructor(gameDimensions, positionLeft, idx, roadWidth) {

    this.gameDimensions = gameDimensions
    this.id = `enemy-${idx}`
    this.size = {
      width: 60,
      height: 134
    }
    this.position = {
      left: positionLeft >= roadWidth ? positionLeft = positionLeft - this.size.width : positionLeft,
      top: -this.size.height,
    }
    this.speed = Math.floor(Math.random() * 5) + 5

    this.init()

  }

  init() {
    this.enemyElement = document.createElement("img")

    this.enemyElement.id = `${this.id}`
    this.enemyElement.className = "enemy"
    this.enemyElement.src = `./images/enemy-${(Math.floor(Math.random() * 3)) + 1}.png`
    this.enemyElement.style.position = "absolute"
    this.enemyElement.style.top = `${this.position.top}px`
    this.enemyElement.style.left = `${this.position.left}px`
    this.enemyElement.style.width = `${this.size.width}px`
    this.enemyElement.style.height = `${this.size.height}px`

    document.querySelector("#game-screen").appendChild(this.enemyElement)
  }

  move() {

    this.position.top += this.speed
    this.uppdateMovements()

  }

  uppdateMovements() {

    this.enemyElement.style.top = `${this.position.top}px`

  }

}
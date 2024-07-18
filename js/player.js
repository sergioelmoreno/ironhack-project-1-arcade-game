class Player {

  constructor(gameDimensions, keysPressed) {
    this.gameDimensions = gameDimensions
    this.keysPressed = keysPressed
    this.id = "player"
    this.size = {
      width: 65,
      heigth: 117
    }
    this.position = {
      left: (this.gameDimensions.w / 2) - (this.size.width / 2),
      top: this.gameDimensions.h - this.size.heigth - 20,
      base: this.gameDimensions.h - this.size.heigth - 20,

    }
    this.speed = 10
    this.init()

  }

  init() {

    this.playerElement = document.createElement("img")
    this.playerElement.id = `${this.id}`
    this.playerElement.src = "./images/player.png"
    this.playerElement.style.position = "absolute"
    this.playerElement.style.top = `${this.position.top}px`
    this.playerElement.style.left = `${this.position.left}px`
    this.playerElement.style.width = `${this.size.width}px`
    this.playerElement.style.height = `${this.size.heigth}px`

    document.querySelector("#game-screen").appendChild(this.playerElement)

  }

  uppdateMovement() {

    this.playerElement.style.left = `${this.position.left}px`
    this.playerElement.style.top = `${this.position.top}px`

  }

  move(keysPressed) {

    if (Object.values(keysPressed).includes(true)) {

      switch (keysPressed.keyCode) {
        case "ArrowLeft":
          if (this.position.left >= 0) {
            this.position.left -= this.speed
          }
          break
        case "ArrowRight":
          if (this.position.left <= this.gameDimensions.w - this.size.width) {
            this.position.left += this.speed
          }
          break
        case "ArrowUp":
          if (this.position.top >= 0) {
            this.position.top -= this.speed
          }
          break
        case "ArrowDown":
          if (this.position.top <= this.position.base) {
            this.position.top += this.speed * 2
          }
          break
      }

    } else {
      if (this.position.top < this.position.base) {
        this.position.top += this.speed / 2
      } else {
        this.position.top = this.position.base
      }
    }

    // this.keysPressed.forEach(key => {
    //     if (key["ArrowLeft"]) {
    //         this.position.left -= 10
    //     } else {
    //         this.position.left -= 0

    //     }
    //     if (key["ArrowRight"]) {
    //         this.position.left += 10
    //     } else {
    //         this.position.left -= 0

    //     }
    //     if (key["ArrowUp"]) {
    //         this.position.top -= 10
    //     }
    //     if (key["ArrowDown"]) {
    //         this.position.top += 10
    //     }
    //})

    this.uppdateMovement()

  }

}





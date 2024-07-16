class Lives {
  constructor(gameDimensions) {
    this.gameDimensions = gameDimensions
    this.size = {
      width: 39,
      heigth: 33
    }
    this.position = {
      top: 20,
      left: 20
    }
    this.lives = {
      current: 3,
      full: "./images/live-full.png",
      empty: "./images/live-empty.png"
    }
    this.livesArray = []

    this.init()
  }

  init() {
    this.live1 = document.createElement("img")
    this.live2 = document.createElement("img")
    this.live3 = document.createElement("img")
    this.livesArray.push(this.live1, this.live2, this.live3)
    this.livesArray.forEach((live, idx) => {
      live.src = this.lives.empty
      live.style.position = "absolute"
      live.style.top = `${this.position.top}px`
      live.style.left = `${this.position.left + (idx * (5 + this.size.width))}px`
      live.style.width = `${this.size.width}px`
      live.style.height = `${this.size.heigth}px`
      live.id = `live-${idx}`
      document.querySelector("#game-screen").appendChild(live)
    })
    this.updateLives()
  }
  updateLives() {
    for (let i = 0; i < this.lives.current; i++) {

      this.livesArray[i].src = this.lives.full
    }

  }
}


const Game = {

    gameDimensions: {
        h: window.innerHeight,
        w: window.innerWidth,
    },

    init() {
        console.log("el Game ya se ha cargado con init", this.gameDimensions.w)
        this.setSize()
    },

    setSize() {
        document.querySelector("#game-screen").style.width = this.gameDimensions.w
        document.querySelector("#game-screen").style.height = this.gameDimensions.h
        document.querySelector("#game-screen").style.background = "blue"
        console.log("he aplicado setSize con heigth", this.gameDimensions.h)
    }
}
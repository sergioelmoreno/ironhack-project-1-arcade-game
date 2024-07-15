

const Game = {
    // Propiedades
    gameDimensions: {
        h: window.innerHeight,
        w: window.innerWidth,
    },
    frameCounter: 0,
    player1: {},
    keys: {
        left: "ArrowLeft",
        right: "ArrowRight",
        up: "ArrowUp",
        down: "ArrowDown"
    },

    // Metodos
    init() {
        console.log("el Game ya se ha cargado con init", this.gameDimensions.w)
        this.setSize()
        this.counterFrames()
        this.background1 = new Background(this.gameDimensions)
        console.log("background", this.background1)
        this.player1 = new Player(this.gameDimensions)
        console.log("player 1", this.player1)
        this.player1.prueba()
        this.setEventsListener()

    },

    setSize() {
        document.querySelector("#game-screen").style.width = this.gameDimensions.w
        document.querySelector("#game-screen").style.height = this.gameDimensions.h
        document.querySelector("#game-screen").style.background = "blue"
        console.log("he aplicado setSize con heigth", this.gameDimensions.h)
    },

    counterFrames() {
        setInterval(() => {
            if (this.frameCounter === 5000) {
                this.frameCounter = 0
            } else {
                this.frameCounter++
            }

            //console.log("frame", this.frameCounter)
        }, 21)

    },

    setEventsListener() {
        document.addEventListener("keydown", (event) => {
            console.log(event)
            if (event.code === this.keys.left || event.code === this.keys.right || event.code === this.keys.up || event.code === this.keys.down) {
                this.player1.move(event.code)

            }

        })
    }




}
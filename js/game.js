

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
    isKeyPressed: false,
    isGameOver: false,
    gameEngine: undefined,

    // Metodos
    init() {
        this.setSize()
        this.counterFrames()
        this.setEventsListener()
        this.background1 = new Background(this.gameDimensions)
        this.player1 = new Player(this.gameDimensions)
        this.enemy1 = new Enemy(this.gameDimensions)
        console.log("enemy 1", this.enemy1)
        this.playerLives = new Lives(this.gameDimensions)
    },

    setSize() {
        document.querySelector("#game-screen").style.width = this.gameDimensions.w
        document.querySelector("#game-screen").style.height = this.gameDimensions.h
        document.querySelector("#game-screen").style.background = "blue"
    },

    counterFrames() {
        if (!this.isGameOver) {
            this.gameEngine = setInterval(() => {
                if (this.frameCounter === 5000) {
                    this.frameCounter = 0
                } else {
                    this.frameCounter++
                }
                this.updateObjects()
            }, 20)
        } else {
            clearInterval(this.gameEngine)
        }

    },

    setEventsListener() {
        const handlePressed = (event) => {
            this.isKeyPressed = true
            if (event.code === this.keys.left || event.code === this.keys.right || event.code === this.keys.up) {
                this.isKeyPressed = true
                this.player1.move(event.code)
            }
        }
        const handleReleased = (event) => {
            if (event.type === "keyup") {
                this.isKeyPressed = false

            }
        }
        document.addEventListener("keydown", event => handlePressed(event))
        document.addEventListener("keyup", event => handleReleased(event))
    },

    updateObjects() {
        this.background1.move()
        this.enemy1.move()
        if (!this.isKeyPressed) {
            this.player1.move()
        }
        if (this.playerLives.lives.current === 0) {
            this.gameOver()
        }

    },

    gameOver() {
        this.isGameOver = true
        alert("GAME OVER")
    }

}
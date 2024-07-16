

const Game = {
    // Propiedades
    gameDimensions: {
        h: window.innerHeight,
        w: window.innerWidth,
    },
    frameCounter: 0,
    player1: undefined,
    background1: undefined,
    enemy1: undefined,
    playerLives: undefined,
    keys: {
        left: "ArrowLeft",
        right: "ArrowRight",
        up: "ArrowUp",
        down: "ArrowDown"
    },
    isKeyPressed: {
        isPressed: false,
        keyCode: ""
    },
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
        // TO-DO: Manage simultaneous “keyPressed” Events 
        // check this out: https://medium.com/@joshbwasserman/managing-simultaneous-keypressed-events-in-javascript-78da1b3b14de
        const handlePressed = (event) => {
            if (Object.values(this.keys).indexOf(event.code) > -1) {
                this.isKeyPressed.isPressed = true
                this.isKeyPressed.keyCode = event.code
            }
        }
        const handleReleased = (event) => {
            if (event.type === "keyup") {
                this.isKeyPressed.isPressed = false
                this.isKeyPressed.keyCode = ""
            }
        }
        document.addEventListener("keydown", event => handlePressed(event))
        document.addEventListener("keyup", event => handleReleased(event))
    },

    updateObjects(keyCode) {
        this.background1.move()
        this.enemy1.move()
        if (!this.isKeyPressed) {
            this.player1.move(this.isKeyPressed.isPressed)
        } else {
            this.player1.move(this.isKeyPressed.keyCode)
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
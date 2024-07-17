

const Game = {
    // Propiedades
    gameDimensions: {
        h: window.innerHeight,
        w: window.innerWidth,
    },
    frameCounter: 0,
    player1: undefined,
    background1: undefined,
    roadside1: undefined,
    enemies: [],
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
        this.roadside1 = new Roadside(this.gameDimensions, this.background1.positionBackground1.left, this.background1.size.width)
        this.player1 = new Player(this.gameDimensions)
        this.playerLives = new Lives(this.gameDimensions)
        this.calculateEmenyLeft()
    },

    setSize() {
        document.querySelector("#game-screen").style.width = this.gameDimensions.w
        document.querySelector("#game-screen").style.height = this.gameDimensions.h
        document.querySelector("#game-screen").style.background = "blue"
    },
    calculateEmenyLeft(mult) {
        const left = this.background1.positionBackground1.left
        const width = this.background1.size.width
        return left + (width * mult)
    },
    counterFrames() {
        if (!this.isGameOver) {
            this.gameEngine = setInterval(() => {
                if (this.frameCounter === 5000) {
                    this.frameCounter = 0
                } else {
                    this.frameCounter++
                }

                if (this.frameCounter === 50) {
                    this.enemy1 = new Enemy(this.gameDimensions, this.calculateEmenyLeft(.17))
                    //this.enemies.push(enemy)
                }
                else if (this.frameCounter === 100) {
                    this.enemy2 = new Enemy(this.gameDimensions, this.calculateEmenyLeft(.12))
                }
                else if (this.frameCounter === 150) {
                    this.enemy3 = new Enemy(this.gameDimensions, this.calculateEmenyLeft(.55))
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
        this.roadside1.move()
        this.background1.move()

        if (this.enemy1) {
            this.enemy1.move()

        }
        if (this.enemy2) {
            this.enemy2.move()

        }
        if (this.enemy3) {
            this.enemy3.move()
        }

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
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
    enemies: [],
    keys: {
        left: "ArrowLeft",
        right: "ArrowRight",
        up: "ArrowUp",
        down: "ArrowDown"
    },
    isCollisionActive: true,
    isKeyPressed: {
        isPressed: false,
        keyCode: ""
    },
    keysPressed: [
        { "ArrowLeft": false },
        { "ArrowRight": false },
        { "ArrowUp": false },
        { "ArrowDown": false },
    ],
    isGameOver: false,
    gameEngine: undefined,

    init() {
        this.setSize()
        this.counterFrames()
        this.setEventsListener()
        this.roadBackground = new Background(this.gameDimensions)
        this.player = new Player(this.gameDimensions, this.keysPressed)
        this.playerLives = new Lives(this.gameDimensions)
    },
    setSize() {
        document.querySelector("#game-screen").style.width = this.gameDimensions.w
        document.querySelector("#game-screen").style.height = this.gameDimensions.h
    },
    counterFrames() {
        if (!this.isGameOver) {
            this.gameEngine = setInterval(() => {
                if (this.frameCounter === 5000) {
                    this.frameCounter = 0
                } else {
                    this.frameCounter++
                }
                if (this.frameCounter % 50 === 1) {
                    // TO-DO: Generate new enemies randomly
                    // let random = Math.floor(Math.random() * 3)
                    // if (random === 0 || random === 2 && this.enemies.length <= 3) {
                    // }
                    this.createNewEnemy()
                }
                this.updateObjects()
                this.detectPlayerCollision()
                this.removeEnemies()

            }, 20)
        }

    },
    updateObjects(keyCode) {
        this.roadBackground.move()
        this.enemies.forEach(enemy => {
            enemy.move()
        })
        if (!this.isKeyPressed) {
            this.player.move(this.isKeyPressed.isPressed)
        } else {
            this.player.move(this.isKeyPressed.keyCode)
        }
        if (this.playerLives.lives.current === 0) {
            this.gameOver()
        }

    },
    setEventsListener() {
        // TO-DO: Manage simultaneous “keyPressed” Events 
        // check this out: https://medium.com/@joshbwasserman/managing-simultaneous-keypressed-events-in-javascript-78da1b3b14de
        const handlePressed = (event) => {
            if (Object.values(this.keys).indexOf(event.code) > -1) {
                this.isKeyPressed.isPressed = true
                this.isKeyPressed.keyCode = event.code
                this.keysPressed[event.code] = true
            }
        }
        const handleReleased = (event) => {
            if (event.type === "keyup") {
                this.isKeyPressed.isPressed = false
                this.isKeyPressed.keyCode = ""
                this.keysPressed[event.code] = false
            }
        }
        document.addEventListener("keydown", event => handlePressed(event))
        document.addEventListener("keyup", event => handleReleased(event))
    },
    detectPlayerCollision() {
        const playerRect = this.player.playerElement.getBoundingClientRect();
        this.enemies.forEach(enemy => {
            const enemyRect = enemy.enemyElement.getBoundingClientRect();
            if (this.isCollisionActive) {
                if (
                    enemyRect.x < playerRect.x + playerRect.width &&
                    enemyRect.x + enemyRect.width > playerRect.x &&
                    enemyRect.y < playerRect.y + playerRect.height &&
                    enemyRect.y + enemyRect.height > playerRect.y
                ) {
                    this.playerLives.lives.current--
                    this.playerLives.updateLives()
                    this.isCollisionActive = false
                    this.managePlayerCollision()
                    this.destroyEnemy(enemy)
                    if (this.playerLives.lives.current === 0) {
                        this.gameOver()
                    }
                }
            }
        })
    },
    managePlayerCollision() {
        if (!this.isCollisionActive) {
            const blink = setInterval(() => {
                this.player.playerElement.style.filter = this.player.playerElement.style.filter === "none" ? "hue-rotate(300deg) brightness(1.75)" : "none"
            }, 40)

            setTimeout(() => {
                this.isCollisionActive = true
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
        const enemy = new Enemy(this.gameDimensions, leftPos(), this.enemies.length + 1)
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
    gameOver() {
        this.isGameOver = true
        clearInterval(this.gameEngine)
        this.enemies = []
        document.querySelectorAll(".enemy").forEach(elem => elem.remove())
        const dialog = document.querySelector("dialog")
        dialog.showModal();
    },

}
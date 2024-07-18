class Enemy {

    constructor(gameDimensions, positionLeft) {
        //propiedades
        this.gameDimensions = gameDimensions

        this.size = {
            width: 60,
            height: 134
        }
        this.position = {
            left: positionLeft,
            top: -this.size.height,

        }
        this.velocity = 5

        //invocamos metodos
        this.init()

    }

    init() {

        this.enemyElement = document.createElement("img")

        this.enemyElement.src = "./images/enemy.png"
        this.enemyElement.style.position = "absolute"
        this.enemyElement.style.top = `${this.position.top}px`
        this.enemyElement.style.left = `${this.position.left}px`
        this.enemyElement.style.width = `${this.size.width}px`
        this.enemyElement.style.height = `${this.size.height}px`

        document.querySelector("#game-screen").appendChild(this.enemyElement)

    }

    move() {
        this.position.top += this.velocity
        this.uppdateMovements()

    }

    uppdateMovements() {
        this.enemyElement.style.top = `${this.position.top}px`
    }

}
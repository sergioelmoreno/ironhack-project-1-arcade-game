class Player {
    constructor(gameDimensions) {
        // Propiedades
        this.gameDimensions = gameDimensions

        this.size = {
            width: 65,
            heigth: 117
        }
        this.position = {
            left: (this.gameDimensions.w / 2) - (this.size.width / 2),
            top: this.gameDimensions.h - this.size.heigth - 20,
            base: this.gameDimensions.h - this.size.heigth - 20,

        }
        //invocamos metodos
        this.init()
    }

    // declaro Metodos
    init() {

        this.playerElement = document.createElement("img")

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

    move(direction) {
        switch (direction) {
            case "ArrowLeft":
                if (this.position.left >= 0) {
                    this.position.left -= 10
                }
                break
            case "ArrowRight":
                if (this.position.left <= this.gameDimensions.w - this.size.width) {
                    this.position.left += 10
                }
                break
            case "ArrowUp":
                if (this.position.top >= 0) {
                    this.position.top -= 10
                }
                break
            case "ArrowDown":
                if (this.position.top <= this.position.base) {
                    this.position.top += 10
                }
                break
        }

        this.uppdateMovement()

    }




    prueba() {
        console.log("soy objeto player")
    }

}





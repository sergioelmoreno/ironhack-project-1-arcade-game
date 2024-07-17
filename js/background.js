class Background {

    constructor(gameDimensions) {
        //Propiedades
        this.gameDimensions = gameDimensions

        this.size = {
            height: this.gameDimensions.h,
            width: 571,
        }

        this.positionBackground1 = {
            top: 0,
            left: (this.gameDimensions.w / 2) - (this.size.width / 2),

        }
        this.positionBackground2 = {
            top: -this.size.height,
            left: (this.gameDimensions.w / 2) - (this.size.width / 2),

        }
        this.velBackground = {
            top: 10
        }


        //invocamos metodos
        this.init()

    }
    // declaro Metodos
    init() {

        this.backgroundElement1 = document.createElement("img")
        this.backgroundElement2 = document.createElement("img")

        this.backgroundElement1.src = "./images/road.jpg"
        this.backgroundElement1.style.position = "absolute"
        this.backgroundElement1.style.top = `${this.positionBackground1.top}px`
        this.backgroundElement1.style.left = `${this.positionBackground1.left}px`
        this.backgroundElement1.style.height = `${this.size.height}px`
        this.backgroundElement1.style.width = `${this.size.width}px`




        this.backgroundElement2.src = "./images/road.jpg"
        this.backgroundElement2.style.position = "absolute"
        this.backgroundElement2.style.top = `${this.positionBackground2.top}px`
        this.backgroundElement2.style.left = `${this.positionBackground2.left}px`
        this.backgroundElement2.style.height = `${this.size.height}px`
        this.backgroundElement2.style.width = `${this.size.width}px`


        document.querySelector("#game-screen").appendChild(this.backgroundElement1)
        document.querySelector("#game-screen").appendChild(this.backgroundElement2)

    }

    move() {
        if (this.positionBackground1.top >= this.size.height) {
            this.positionBackground1.top = 0
            this.positionBackground2.top = -this.size.height

        }
        this.positionBackground1.top += this.velBackground.top
        this.positionBackground2.top += this.velBackground.top
        this.updateMovement()

    }

    updateMovement() {
        this.backgroundElement1.style.top = `${this.positionBackground1.top}px`
        this.backgroundElement2.style.top = `${this.positionBackground2.top}px`
    }



}
class Roadside {

    constructor(gameDimensions, backgroundLeftPosition, backgroundWidthPosition) {
        //Propiedades
        this.gameDimensions = gameDimensions
        this.backgroundLeftPosition = backgroundLeftPosition
        this.backgroundWidthPosition = backgroundWidthPosition
        this.size = {
            height: this.gameDimensions.h,
            width: 108
        }

        this.positionRightRoad1 = {
            top: 0,
            left: this.backgroundLeftPosition + this.backgroundWidthPosition

        }

        this.positionRightRoad2 = {
            top: -this.size.height,
            left: this.backgroundLeftPosition + this.backgroundWidthPosition

        }

        this.positionLeftRoad1 = {
            top: 0,
            left: this.backgroundLeftPosition - this.size.width
        }

        this.positionLeftRoad2 = {
            top: -this.size.height,
            left: this.backgroundLeftPosition - this.size.width
        }


        this.velLeftRoad = {
            top: 10
        }

        //invocamos metodos

        this.init()
    }


    init() {

        this.leftRoadElement1 = document.createElement("img")
        this.leftRoadElement2 = document.createElement("img")
        this.RightRoadElement1 = document.createElement("img")
        this.RightRoadElement2 = document.createElement("img")

        this.leftRoadElement1.src = "./images/sideroad-left.jpg"
        this.leftRoadElement1.style.position = "absolute"
        this.leftRoadElement1.style.top = `${this.positionLeftRoad1.top}px`
        this.leftRoadElement1.style.left = `${this.positionLeftRoad1.left}px`
        this.leftRoadElement1.style.height = `${this.size.height}px`
        this.leftRoadElement1.style.width = `${this.size.width}px`


        this.leftRoadElement2.src = "./images/sideroad-left.jpg"
        this.leftRoadElement2.style.position = "absolute"
        this.leftRoadElement2.style.top = `${this.positionLeftRoad2.top}px`
        this.leftRoadElement2.style.left = `${this.positionLeftRoad2.left}px`
        this.leftRoadElement2.style.height = `${this.size.height}px`
        this.leftRoadElement2.style.width = `${this.size.width}px`

        this.RightRoadElement1.src = "./images/sideroad-right.jpg"
        this.RightRoadElement1.style.position = "absolute"
        this.RightRoadElement1.style.top = `${this.positionRightRoad1.top}px`
        this.RightRoadElement1.style.left = `${this.positionRightRoad1.left}px`
        this.RightRoadElement1.style.height = `${this.size.height}px`
        this.RightRoadElement1.style.width = `${this.size.width}px`

        this.RightRoadElement2.src = "./images/sideroad-right.jpg"
        this.RightRoadElement2.style.position = "absolute"
        this.RightRoadElement2.style.top = `${this.positionRightRoad2.top}px`
        this.RightRoadElement2.style.left = `${this.positionRightRoad2.left}px`
        this.RightRoadElement2.style.height = `${this.size.height}px`
        this.RightRoadElement2.style.width = `${this.size.width}px`



        document.querySelector("#game-screen").appendChild(this.leftRoadElement1)
        document.querySelector("#game-screen").appendChild(this.leftRoadElement2)
        document.querySelector("#game-screen").appendChild(this.RightRoadElement1)
        document.querySelector("#game-screen").appendChild(this.RightRoadElement2)

    }

    move() {
        if (this.positionLeftRoad1.top >= this.size.height && this.positionRightRoad1.top >= this.size.height) {
            this.positionRightRoad1.top = 0
            this.positionLeftRoad1.top = 0
            this.positionRightRoad2.top = -this.size.height
            this.positionLeftRoad2.top = -this.size.height
        }
        this.positionLeftRoad1.top += this.velLeftRoad.top
        this.positionLeftRoad2.top += this.velLeftRoad.top
        this.positionRightRoad1.top += this.velLeftRoad.top
        this.positionRightRoad2.top += this.velLeftRoad.top
        this.updateMovement()
    }

    updateMovement() {
        this.leftRoadElement1.style.top = `${this.positionLeftRoad1.top}px`
        this.leftRoadElement2.style.top = `${this.positionLeftRoad2.top}px`
        this.RightRoadElement1.style.top = `${this.positionRightRoad1.top}px`
        this.RightRoadElement2.style.top = `${this.positionRightRoad2.top}px`
    }


}
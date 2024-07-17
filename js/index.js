let game = Game

window.onload = () => {
  document.querySelector("#game-menu").showModal()
}

document.querySelector("#replay-btn").addEventListener("click", () => {
  document.querySelector("#game-over").close()
  location.reload()
})
document.querySelector("#play-btn").addEventListener("click", () => {
  document.querySelector("#game-menu").close()
  game.init()
})
let game = Game

window.onload = () => {
  game.init()
}

document.querySelector("#replay-btn").addEventListener("click", () => {
  document.querySelector("dialog").close()
  location.reload()
})
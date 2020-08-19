const family = ['Cla', 'Lu', 'Pepê', 'Lelê', 'Lau', 'Clarice', 'Teteus', 'Gabi', 'Miguel', 'Theo', 'Gui', 'João'];

const cards = new Cards(family);
cards.namesAndImagesObj();
const cardsObj = cards.namesAndImages;

const game = new Game(cardsObj);

window.onload = () => {
  document.getElementById('start-button').onclick = (e) => {
    document.getElementById("start").play();
    game.drawBoard();
    e.target.style.color = "#274472"
    e.target.innerHTML = 'Restart Game';
  };
};
const family = ['Cla', 'Lu', 'Pepê', 'Lelê', 'Lau', 'Clarice', 'Teteus', 'Gabi', 'Miguel', 'Theo', 'Gui', 'João'];

const cards = new Cards(family);
cards.namesAndImagesObj();
const cardsObj = cards.namesAndImages;

const game = new Game(cardsObj);

window.onload = () => {
  document.getElementById('start-button').onclick = (e) => {
    game.drawBoard();
    e.target.innerHTML = 'Restart Game';
  };
};
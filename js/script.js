const family = ['Cla', 'Lu', 'Pepê', 'Lelê', 'Lau', 'Clarice', 'Teteus', 'Gabi', 'Miguel', 'Theo', 'Gui', 'João'];

const cards = new Cards(family);
cards.namesAndImagesObj();
const cardsObj = cards.namesAndImages;

const game = new Game(cardsObj);
const player1 = new Player();
const player2 = new Player();

window.onload = () => {
  document.getElementById('one-player').onclick = (e) => {
    document.getElementById('start').play();
    game.players = 1;
    game.drawScore();
    game.drawBoard();
    e.target.style.color = '#274472';
    e.target.style.fontWeight = 'bolder';
    e.target.style.opacity = '1';
    e.target.innerHTML = 'Restart';
    game.styleButton2P();
  };

  document.getElementById('two-players').onclick = (e) => {
    document.getElementById('start').play();
    game.players = 2;
    game.drawScore();
    game.drawBoard();
    e.target.style.color = '#274472';
    e.target.style.fontWeight = 'bolder';
    e.target.style.opacity = '1';
    e.target.innerHTML = 'Restart';
    game.styleButton1P();
  };
};

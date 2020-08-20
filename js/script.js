const family = ['Cla', 'Lu', 'Pepê', 'Lelê', 'Lau', 'Clarice', 'Teteus', 'Gabi', 'Miguel', 'Theo', 'Gui', 'João'];

const cards = new Cards(family);
cards.namesAndImagesObj();
const cardsObj = cards.namesAndImages;

const game = new Game(cardsObj);
const player1 = new Player();
const player2 = new Player();

window.onload = () => {
  document.getElementById('one-player').onclick = (e) => {
    document.getElementById("start").play();
    game.players = 1;
    game.playerTurn = 1;
    game.drawScore();
    game.drawBoard();
    e.target.style.color = "#274472";
    e.target.innerHTML = 'Restart';
    document.getElementById('two-players').style.color = "#274472";
    document.getElementById('two-players').innerHTML = 'Two Players';
  };
  document.getElementById('two-players').onclick = (e) => {
    document.getElementById("start").play();
    game.players = 2;
    game.playerTurn = 1;
    game.drawScore();
    game.drawBoard();
    e.target.style.color = "#274472";
    e.target.innerHTML = 'Restart';
    document.getElementById('one-player').style.color = "#274472";
    document.getElementById('one-player').innerHTML = 'One Player';
  };
};
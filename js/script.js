const family = ['Cla', 'Lu', 'Pepê', 'Lelê', 'Lau', 'Clarice', 'Teteus', 'Gabi', 'Miguel', 'Theo', 'Gui', 'João'];

const cards = new Cards(family);
cards.namesAndImagesObj();
const cardsObj = cards.namesAndImages;

const game = new Game(cardsObj);

window.onload = () => {
  document.getElementById('start-button').onclick = (e) => {
    game.drawBoard();
    e.target.innerHTML = 'Restart Game';
    e.target.onclick = game.resetGame;
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        // console.log(e);
        card.classList.add("turned");
        console.log(card.getAttribute('data-card-name'));
        game.pickedCards.push(card);
        // console.log(memoryGame.pickedCards);
        if (game.pickedCards.length === 2) {
          const pickedCardsName = game.pickedCards.map(cardName => {
            // console.log(cardName.getAttribute('data-card-name'));
            return cardName.getAttribute('data-card-name');
          });
          // console.log(pickedCardsName);
          const sameCard = game.checkIfPair(pickedCardsName[0], pickedCardsName[1]);
          if (sameCard) {
            if (game.isFinished()) document.querySelector('h1').innerHTML = 'You won!!!';
            // console.log('mesmas cartas');
            game.pickedCards.forEach(card => card.classList.add("blocked"));
            document.querySelector('#pairs-guessed').innerHTML = game.pairsGuessed;
            game.pickedCards = [];
          } else {
            // console.log('cartas diferentes');
            setTimeout(function () {
              game.pickedCards.forEach(card => card.classList.remove("turned"));
              game.pickedCards = [];
            }, 2000);
          }
          document.querySelector('#pairs-clicked').innerHTML = game.pairsClicked;
        }
      });
    });
  };


};
class Game {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i -= 1) {
      const card1 = this.cards[i];
      const j = Math.floor(Math.random() * (i + 1));
      const card2 = this.cards[j];
      this.cards[i] = card2;
      this.cards[j] = card1;
    }
  }

  resetGame() {
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
    this.updateScore();
    this.shuffleCards();
  }

  cardsUnclickable() {
    document.querySelectorAll('.card').forEach(card => {
      card.classList.add("unclickable");
    });
  }

  cardsClickable() {
    document.querySelectorAll('.card').forEach(card => {
      card.classList.remove("unclickable");
    });
  }

  updateScore() {
    document.querySelector('#pairs-guessed').innerHTML = game.pairsGuessed;
    document.querySelector('#pairs-clicked').innerHTML = game.pairsClicked;
  }

  drawBoard = () => {
    this.resetGame();
    let html = '';
    document.querySelector('#memory-board').innerHTML = html;
    game.cards.forEach(pic => {
      html += `<div class="card" data-card-name="${pic.name}">`;
      html += `<div class="back" name="${pic.img}"></div>`;
      html += `<div class="front" style="background: url(img/${pic.img}) no-repeat; background-size: cover"></div>`;
      html += `</div>`;
    });
    document.querySelector('#memory-board').innerHTML = html;
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        document.getElementById("click").play();
        card.classList.add("turned");
        console.log(card.getAttribute('data-card-name'));
        game.pickedCards.push(card);
        if (game.pickedCards.length === 2) {
          game.cardsUnclickable();
          const pickedCardsName = game.pickedCards.map(cardName => {
            return cardName.getAttribute('data-card-name');
          });
          const sameCard = game.checkIfPair(pickedCardsName[0], pickedCardsName[1]);
          if (sameCard) {
            document.getElementById("correct").play();
            if (game.isFinished()) document.querySelector('h1').innerHTML = 'You won!!!';
            game.pickedCards.forEach(card => card.classList.add("transparent"));
            this.updateScore();
            game.pickedCards = [];
            game.cardsClickable();
          } else {
            document.getElementById("wrong").play();
            setTimeout(function () {
              game.pickedCards.forEach(card => card.classList.remove("turned"));
              game.pickedCards = [];
              game.cardsClickable();
            }, 2000);
          }
          this.updateScore();
        }
      });
    });
  }

  checkIfPair(card1, card2) {
    this.pairsClicked += 1;
    let sameCard;
    if (card1 === card2) {
      this.pairsGuessed += 1;
      sameCard = true;
    } else sameCard = false;
    return sameCard;
  }

  clearPickedCards() {
    this.pickedCards = [];
  }

  isFinished() {
    return (this.pairsGuessed === this.cards.length / 2);
  }

}

class Player {
  constructor() {
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
    this.myTurn = false;
    this.pickedCards = [];
  }

  clearPickedCards() {
    this.pickedCards = [];
  }

}

class Cards {
  constructor(cards) {
    this.names = cards;
    this.images = [];
    this.namesAndImages = [];
  }

  filenames() {
    this.names.forEach(name => {
      this.images.push(`${name}.jpg`)
    });
  }

  namesAndImagesObj() {
    this.names.forEach(name => {
      this.namesAndImages.push({ 'name': name, 'img': name + '.jpg' });
      this.namesAndImages.push({ 'name': name, 'img': name + '.jpg' });
    });
  }
}

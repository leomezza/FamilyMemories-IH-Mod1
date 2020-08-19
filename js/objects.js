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
    document.querySelector('#pairs-guessed').innerHTML = this.pairsGuessed;
    document.querySelector('#pairs-clicked').innerHTML = this.pairsClicked;
  }

  gameWin() {
    document.getElementById("tada").play();
    document.querySelector('#start-button').style.color = "red";
    document.querySelector('#start-button').innerHTML = 'You won!!!';
  }

  checkSameCards() {
    if (this.pickedCards.length === 2) {
      this.cardsUnclickable();
      const pickedCardsName = this.pickedCards.map(cardName => {
        return cardName.getAttribute('data-card-name');
      });
      const sameCard = this.checkIfPair(pickedCardsName[0], pickedCardsName[1]);
      if (sameCard) {
        document.getElementById("correct").play();
        if (this.isFinished()) this.gameWin();
        this.pickedCards.forEach(card => card.classList.add("transparent"));
        this.updateScore();
        this.pickedCards = [];
        this.cardsClickable();
      } else {
        document.getElementById("wrong").play();
        setTimeout(() => {
          this.pickedCards.forEach(card => card.classList.remove("turned"));
          this.pickedCards = [];
          this.cardsClickable();
        }, 2000);
      }
      this.updateScore();
    }
  }

  cardsClick() {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        document.getElementById("click").play();
        card.classList.add("turned");
        this.pickedCards.push(card);
        this.checkSameCards();
      });
    });
  }

  drawBoard = () => {
    this.resetGame();
    let html = '';
    document.querySelector('#memory-board').innerHTML = html;
    this.cards.forEach(pic => {
      html += `<div class="card" data-card-name="${pic.name}">`;
      html += `<div class="back" name="${pic.img}"></div>`;
      html += `<div class="front" style="background: url(img/${pic.img}) no-repeat; background-size: cover"></div>`;
      html += `</div>`;
    });
    document.querySelector('#memory-board').innerHTML = html;
    this.cardsClick();
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

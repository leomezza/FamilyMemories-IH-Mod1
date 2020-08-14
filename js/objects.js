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

  drawBoard() {
    let html = '';
    game.cards.forEach(pic => {
      html += `<div class="card" data-card-name="${pic.name}">`;
      html += `<div class="back" name="${pic.img}"></div>`;
      html += `<div class="front" style="background: url(img/${pic.img}) no-repeat; background-size: cover"></div>`;
      html += `</div>`;
    });
    document.querySelector('#memory-board').innerHTML = html;
  }

  resetGame() {
    console.log('Reseting the game');
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
    this.shuffleCards;
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

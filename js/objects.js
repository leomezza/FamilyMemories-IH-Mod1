class Game {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
    this.players = 1;
    this.playerTurn = 1;
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
    this.playerTurn = 1;
    if (this.players === 2) {
      player1.pairsClicked = 0;
      player1.pairsGuessed = 0;
      player2.pairsClicked = 0;
      player2.pairsGuessed = 0;
    }
    this.updateScore();
    this.shuffleCards();
  }

  cardsUnclickable() {
    document.querySelectorAll('.card').forEach(card => {
      card.classList.add('unclickable');
    });
  }

  cardsClickable() {
    document.querySelectorAll('.card').forEach(card => {
      card.classList.remove('unclickable');
    });
  }

  updateScore() {
    if (this.players === 1) {
      document.querySelector('#pairs-guessed').innerHTML = this.pairsGuessed;
      document.querySelector('#pairs-clicked').innerHTML = this.pairsClicked;
    }
    if (this.players === 2) {
      document.querySelector('#player-turn').innerHTML = this.playerTurn;
      document.querySelector('#pairs-guessed1').innerHTML = player1.pairsGuessed;
      document.querySelector('#pairs-clicked1').innerHTML = player1.pairsClicked;
      document.querySelector('#pairs-guessed2').innerHTML = player2.pairsGuessed;
      document.querySelector('#pairs-clicked2').innerHTML = player2.pairsClicked;
    }
  }

  gameWin() {
    document.getElementById('tada').play();
    if (this.players === 1) {
      document.querySelector('#one-player').style.color = 'red';
      document.querySelector('#one-player').innerHTML = 'You won!!!';
    }
    if (this.players === 2) {
      document.querySelector('#two-players').style.color = 'red';
      if (player1.pairsGuessed > player2.pairsGuessed) {
        document.querySelector('#two-players').innerHTML = 'P1 won!!!';
      } else if (player1.pairsGuessed < player2.pairsGuessed) {
        document.querySelector('#two-players').innerHTML = 'P2 won!!!';
      } else {
        document.querySelector('#two-players').innerHTML = 'Tied Game!!!';
      }
    }
  }

  checkSameCards() {
    if (this.pickedCards.length === 2) {
      this.cardsUnclickable();
      const pickedCardsName = this.pickedCards.map(cardName => {
        return cardName.getAttribute('data-card-name');
      });
      const sameCard = this.checkIfPair(pickedCardsName[0], pickedCardsName[1]);
      if (sameCard) {
        document.getElementById('correct').play();
        if (this.isFinished()) this.gameWin();
        this.pickedCards.forEach(card => card.classList.add('transparent'));
        this.updateScore();
        this.pickedCards = [];
        this.cardsClickable();
      } else {
        document.getElementById('wrong').play();
        setTimeout(() => {
          this.pickedCards.forEach(card => card.classList.remove('turned'));
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
        document.getElementById('click').play();
        card.classList.add('turned');
        this.pickedCards.push(card);
        this.checkSameCards();
      });
    });
  }

  drawScore() {
    let html = '';
    if (this.players === 1) {
      html += `<h2>One Player</h2>`;
      html += `<p>Pairs clicked: <span id="pairs-clicked">0</span></p>`;
      html += `<p>Pairs guessed: <span id="pairs-guessed">0</span></p>`;
      document.querySelector('#score').innerHTML = html;
    }
    if (this.players === 2) {
      html += `<h2>P<span id="player-turn">${this.playerTurn}</span> Turn</h2>`;
      html += `<p>P1 clicked: <span id="pairs-clicked1">0</span> guessed: <span id="pairs-guessed1">0</span>`;
      html += `<p>P2 clicked: <span id="pairs-clicked2">0</span> guessed: <span id="pairs-guessed2">0</span></p>`;
      document.querySelector('#score').innerHTML = html;
    }
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
    if (this.players === 1) {
      this.pairsClicked += 1;
      let sameCard;
      if (card1 === card2) {
        this.pairsGuessed += 1;
        sameCard = true;
      } else sameCard = false;
      return sameCard;
    }

    if (this.players === 2) {
      if (this.playerTurn === 1) {
        player1.pairsClicked += 1;
        let sameCard;
        if (card1 === card2) {
          player1.pairsGuessed += 1;
          sameCard = true;
        } else {
          this.playerTurn = 2;
          sameCard = false;
        }
        return sameCard;
      }

      if (this.playerTurn === 2) {
        player2.pairsClicked += 1;
        let sameCard;
        if (card1 === card2) {
          player2.pairsGuessed += 1;
          sameCard = true;
        } else {
          this.playerTurn = 1;
          sameCard = false;
        }
        return sameCard;
      }
    }
  }

  isFinished() {
    if (this.players === 1) return (this.pairsGuessed === this.cards.length / 2);
    if (this.players === 2) return (player1.pairsGuessed + player2.pairsGuessed === this.cards.length / 2);
  }

  styleButton1P() {
    document.getElementById('one-player').style.color = '#274472';
    document.getElementById('one-player').style.fontWeight = 'normal';
    document.getElementById('one-player').style.opacity = '0.8';
    document.getElementById('one-player').innerHTML = 'One Player';
  }

  styleButton2P() {
    document.getElementById('two-players').style.color = '#274472';
    document.getElementById('two-players').style.fontWeight = 'normal';
    document.getElementById('two-players').style.opacity = '0.8';
    document.getElementById('two-players').innerHTML = 'Two Players';
  }

}

class Player {
  constructor() {
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
    this.myTurn = false;
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

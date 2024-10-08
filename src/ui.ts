import { Game, Choice, Winner } from './game';

export class UI {
  private game: Game;
  private scoreInfo: HTMLElement;
  private scoreMessage: HTMLElement;
  private playerScorePara: HTMLElement;
  private computerScorePara: HTMLElement;
  private playerSign: HTMLElement;
  private computerSign: HTMLElement;
  private rockBtn: HTMLElement;
  private paperBtn: HTMLElement;
  private scissorsBtn: HTMLElement;
  private endgameModal: HTMLElement;
  private overlay: HTMLElement;
  private endgameMsg: HTMLElement;
  private restartBtn: HTMLElement;

  constructor() {
    this.game = new Game();
    this.scoreInfo = document.getElementById('score-info')!;
    this.scoreMessage = document.getElementById('score-message')!;
    this.playerScorePara = document.getElementById('player-score')!;
    this.computerScorePara = document.getElementById('computer-score')!;
    this.playerSign = document.getElementById('player-sign')!;
    this.computerSign = document.getElementById('computer-sign')!;
    this.rockBtn = document.getElementById('rock-btn')!;
    this.paperBtn = document.getElementById('paper-btn')!;
    this.scissorsBtn = document.getElementById('scissors-btn')!;
    this.endgameModal = document.getElementById('endgame-modal')!;
    this.overlay = document.getElementById('overlay')!;
    this.endgameMsg = document.getElementById('endgame-msg')!;
    this.restartBtn = document.getElementById('restart-btn')!;

    // Event Listeners
    this.rockBtn.addEventListener('click', () => this.handleClick('ROCK'));
    this.paperBtn.addEventListener('click', () => this.handleClick('PAPER'));
    this.scissorsBtn.addEventListener('click', () => this.handleClick('SCISSORS'));
    this.restartBtn.addEventListener('click', () => this.restartGame());
  }

  private handleClick(playerSelection: Choice): void {
    if (this.game.isGameOver()) {
      this.openEndgameModal();
      return;
    }

    const computerSelection = this.game.getRandomChoice();
    const winner = this.game.playRound(playerSelection, computerSelection);
    this.updateChoices(playerSelection, computerSelection);
    this.updateScore(winner, playerSelection, computerSelection);

    if (this.game.isGameOver()) {
      this.openEndgameModal();
      this.setFinalMessage();
    }
  }

  private updateChoices(playerSelection: Choice, computerSelection: Choice): void {
    this.playerSign.textContent = this.getSign(playerSelection);
    this.computerSign.textContent = this.getSign(computerSelection);
  }

  private getSign(choice: Choice): string {
    switch (choice) {
      case 'ROCK': return '🪨';
      case 'PAPER': return '📃';
      case 'SCISSORS': return '✂️';
    }
  }

  private updateScore(winner: Winner, playerSelection: Choice, computerSelection: Choice): void {
    const scores = this.game.getScores();

    if (winner === 'tie') {
      this.scoreInfo.textContent = "It's a tie!";
    } else if (winner === 'player') {
      this.scoreInfo.textContent = 'You won!';
    } else {
      this.scoreInfo.textContent = 'You lost!';
    }

    this.playerScorePara.textContent = `Player: ${scores.player}`;
    this.computerScorePara.textContent = `Computer: ${scores.computer}`;

    this.updateScoreMessage(winner, playerSelection, computerSelection);
  }

  private updateScoreMessage(winner: Winner, playerSelection: Choice, computerSelection: Choice): void {
    if (winner === 'player') {
      this.scoreMessage.textContent = (
        `${Game.capitalizeFirstLetter(playerSelection)} beats ${computerSelection.toLowerCase()}`
      );
    } else if (winner === 'computer') {
      this.scoreMessage.textContent = (
        `${Game.capitalizeFirstLetter(playerSelection)} is beaten by ${computerSelection.toLowerCase()}`
      );
    } else {
      this.scoreMessage.textContent = (
        `${Game.capitalizeFirstLetter(playerSelection)} ties with ${computerSelection.toLowerCase()}`
      );
    }
  }

  private openEndgameModal(): void {
    this.overlay.classList.add('active');
    this.endgameModal.classList.add('active');
  }

  private closeEndgameModal(): void {
    this.overlay.classList.remove('active');
    this.endgameModal.classList.remove('active');
  }

  private setFinalMessage(): void {
    const scores = this.game.getScores();
    this.endgameMsg.textContent = scores.player > scores.computer ? 'You won!' : 'You lost...';
  }

  private restartGame(): void {
    this.game.resetGame();
    this.scoreInfo.textContent = 'Choose your weapon';
    this.scoreMessage.textContent = 'First to score 5 points wins the game';
    this.playerScorePara.textContent = 'Player: 0';
    this.computerScorePara.textContent = 'Computer: 0';
    this.playerSign.textContent = '🕴️';
    this.computerSign.textContent = '🖥️';
    this.closeEndgameModal();
  }
}

// Initialize the UI
new UI();

import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { Game, Choice, Winner } from '../src/game';
import { UI } from '../src/ui';

const mockDOM = () => {
  document.body.innerHTML = `
    <h2 id="score-info">Choose your weapon</h2>
    <p id="score-message">First to score 5 points wins the game</p>
    <div class="scores-container">
      <div class="sign" id="player-sign">🕴️</div>
      <p class="score" id="player-score">Player: 0</p>
      <div class="sign" id="computer-sign">🖥️</div>
      <p class="score" id="computer-score">Computer: 0</p>
    </div>
    <button id="rock-btn">Rock</button>
    <button id="paper-btn">Paper</button>
    <button id="scissors-btn">Scissors</button>
    <dialog id="endgame-modal" class="modal">
      <h2 id="endgame-msg"></h2>
      <button id="restart-btn">Play again</button>
    </dialog>
  `;
};

describe('UI Class Tests', () => {
  let ui: UI;

  beforeEach(() => {
    mockDOM(); // Set up the mocked DOM before each test
    ui = new UI(); // Initialize the UI class
  });

  afterEach(() => {
    // Reset any necessary state or DOM elements after each test
    vi.clearAllMocks(); // Clear any mocks
    mockDOM(); // Reset the DOM to its initial state
  });

  it('should display the initial message', () => {
    const scoreInfo = document.getElementById('score-info')!;
    const scoreMessage = document.getElementById('score-message')!;

    expect(scoreInfo.textContent).toBe('Choose your weapon');
    expect(scoreMessage.textContent).toBe('First to score 5 points wins the game');
  });

  it('should update the scores and messages on a player win', () => {
    const playerButton = document.getElementById('rock-btn')!;
    const playerScorePara = document.getElementById('player-score')!;
    const computerScorePara = document.getElementById('computer-score')!;

    // Mock the computer's choice to be 'SCISSORS'
    vi.spyOn(Game.prototype, 'getRandomChoice').mockReturnValue('SCISSORS' as Choice);

    playerButton.click(); // Simulate a player choosing ROCK

    expect(playerScorePara.textContent).toContain('Player: 1');
    expect(computerScorePara.textContent).toContain('Computer: 0');
    expect(document.getElementById('score-info')!.textContent).toBe('You won!');
  });

  it('should update the scores and messages on a computer win', () => {
    const playerButton = document.getElementById('paper-btn')!;
    const playerScorePara = document.getElementById('player-score')!;
    const computerScorePara = document.getElementById('computer-score')!;

    // Mock the computer's choice to be 'SCISSORS'
    vi.spyOn(Game.prototype, 'getRandomChoice').mockReturnValue('SCISSORS' as Choice);

    playerButton.click(); // Simulate a player choosing PAPER

    expect(playerScorePara.textContent).toContain('Player: 0');
    expect(computerScorePara.textContent).toContain('Computer: 1');
    expect(document.getElementById('score-info')!.textContent).toBe('You lost!');
  });

  it('should update the scores and messages on a tie', () => {
    const playerButton = document.getElementById('scissors-btn')!;
    const playerScorePara = document.getElementById('player-score')!;
    const computerScorePara = document.getElementById('computer-score')!;

    // Mock the computer's choice to be 'SCISSORS'
    vi.spyOn(Game.prototype, 'getRandomChoice').mockReturnValue('SCISSORS' as Choice);

    playerButton.click(); // Simulate a player choosing SCISSORS

    expect(playerScorePara.textContent).toContain('Player: 0');
    expect(computerScorePara.textContent).toContain('Computer: 0');
    expect(document.getElementById('score-info')!.textContent).toBe("It's a tie!");
  });

  it('should show the endgame modal when the game is over', () => {
    const playerButton = document.getElementById('rock-btn')!;

    // Simulate playing rounds until the game is over
    vi.spyOn(Game.prototype, 'playRound').mockImplementation((playerSelection: Choice) => {
      return 'player' as Winner; // Always mock a player win for testing
    });

    for (let i = 0; i < 5; i++) {
      playerButton.click(); // Simulate player winning
    }

    expect(document.getElementById('endgame-modal')!.classList.contains('active')).toBe(true);
  });

  it('should reset the game when the restart button is clicked', () => {
    const restartButton = document.getElementById('restart-btn')!;
    const playerScorePara = document.getElementById('player-score')!;
    const computerScorePara = document.getElementById('computer-score')!;
    const scoreInfo = document.getElementById('score-info')!;
    const scoreMessage = document.getElementById('score-message')!;

    // Simulate a game where the player has won
    playerScorePara.textContent = 'Player: 3';
    computerScorePara.textContent = 'Computer: 2';

    restartButton.click(); // Simulate clicking the restart button

    expect(playerScorePara.textContent).toBe('Player: 0');
    expect(computerScorePara.textContent).toBe('Computer: 0');
    expect(scoreInfo.textContent).toBe('Choose your weapon');
    expect(scoreMessage.textContent).toBe('First to score 5 points wins the game');
  });
});

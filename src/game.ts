/**
 * Represents the possible choices in the game.
 */
export type Choice = 'ROCK' | 'PAPER' | 'SCISSORS';

/**
 * Represents the possible outcomes of a round.
 */
export type Winner = 'player' | 'computer' | 'tie';

/**
 * Class representing a Rock, Paper, Scissors game.
 */
export class Game {
  private playerScore: number = 0;
  private computerScore: number = 0;

  /**
   * Plays a round of the game.
   *
   * @param {Choice} playerSelection - The player's choice.
   * @param {Choice} computerSelection - The computer's choice.
   * @returns {Winner} The result of the round, either 'player', 'computer',
   * or 'tie'.
   */
  playRound(playerSelection: Choice, computerSelection: Choice): Winner {
    if (playerSelection === computerSelection) return 'tie';

    if (
      (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
      (playerSelection === 'PAPER' && computerSelection === 'ROCK') ||
      (playerSelection === 'SCISSORS' && computerSelection === 'PAPER')) {

      this.playerScore++;
      return 'player';
    }
    this.computerScore++;
    return 'computer';
  }

  /**
   * Generates a random choice for the computer.
   *
   * @returns {Choice} A random choice: 'ROCK', 'PAPER', or 'SCISSORS'.
   */
  getRandomChoice(): Choice {
    const choices: Choice[] = ['ROCK', 'PAPER', 'SCISSORS'];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  /**
 * Checks if the game is over.
 *
 * @returns {boolean} True if either player or computer has scored 5 points;
 * otherwise, false.
 */
  isGameOver(): boolean {
    return this.playerScore === 5 || this.computerScore === 5;
  }

  /**
   * Gets the current scores of the player and the computer.
   *
   * @returns {{ player: number, computer: number }} An object containing the
   * current scores.
   */
  getScores(): { player: number, computer: number; } {
    return { player: this.playerScore, computer: this.computerScore };
  }

  /**
   * Resets the game scores to zero.
   */
  resetGame(): void {
    this.playerScore = 0;
    this.computerScore = 0;
  }

  /**
   * Capitalizes the first letter of a given string.
   *
   * @param {string} str - The input string.
   * @returns {string} The input string with the first letter capitalized.
   */
  static capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
import { describe, it, expect, beforeEach } from 'vitest';
import { Game } from '../src/game'; // Adjust the import path as necessary

describe('Game Class', () => {
  let game: Game;

  // Set up a new game instance before each test
  beforeEach(() => {
    game = new Game();
  });

  describe('playRound()', () => {
    it('should return "player" when player wins', () => {
      expect(game.playRound('ROCK', 'SCISSORS')).toBe('player');
      expect(game.playRound('PAPER', 'ROCK')).toBe('player');
      expect(game.playRound('SCISSORS', 'PAPER')).toBe('player');
    });

    it('should return "computer" when computer wins', () => {
      expect(game.playRound('ROCK', 'PAPER')).toBe('computer');
      expect(game.playRound('PAPER', 'SCISSORS')).toBe('computer');
      expect(game.playRound('SCISSORS', 'ROCK')).toBe('computer');
    });

    it('should return "tie" when both selections are the same', () => {
      expect(game.playRound('ROCK', 'ROCK')).toBe('tie');
      expect(game.playRound('PAPER', 'PAPER')).toBe('tie');
      expect(game.playRound('SCISSORS', 'SCISSORS')).toBe('tie');
    });
  });

  describe('getRandomChoice()', () => {
    it('should return a valid choice', () => {
      const choice = game.getRandomChoice();
      expect(['ROCK', 'PAPER', 'SCISSORS']).toContain(choice);
    });
  });

  describe('isGameOver()', () => {
    it('should return false when scores are below 5', () => {
      expect(game.isGameOver()).toBe(false);
    });

    it('should return true when player score reaches 5', () => {
      for (let i = 0; i < 5; i++) {
        game.playRound('ROCK', 'SCISSORS'); // Simulate player wins
      }
      expect(game.isGameOver()).toBe(true);
    });

    it('should return true when computer score reaches 5', () => {
      for (let i = 0; i < 5; i++) {
        game.playRound('ROCK', 'PAPER'); // Simulate computer wins
      }
      expect(game.isGameOver()).toBe(true);
    });
  });

  describe('getScores()', () => {
    it('should return the current scores', () => {
      expect(game.getScores()).toEqual({ player: 0, computer: 0 });
      game.playRound('ROCK', 'SCISSORS');
      expect(game.getScores()).toEqual({ player: 1, computer: 0 });
      game.playRound('PAPER', 'SCISSORS');
      expect(game.getScores()).toEqual({ player: 1, computer: 1 });
    });
  });

  describe('resetGame()', () => {
    it('should reset scores to zero', () => {
      game.playRound('ROCK', 'SCISSORS');
      expect(game.getScores()).toEqual({ player: 1, computer: 0 });
      game.resetGame();
      expect(game.getScores()).toEqual({ player: 0, computer: 0 });
    });
  });

  describe('capitalizeFirstLetter()', () => {
    it('should capitalize the first letter of a string', () => {
      expect(Game.capitalizeFirstLetter('hello')).toBe('Hello');
      expect(Game.capitalizeFirstLetter('WORLD')).toBe('World');
      expect(Game.capitalizeFirstLetter('JaVaScRiPt')).toBe('Javascript');
    });
  });
});

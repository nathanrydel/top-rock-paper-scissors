# 🪨📄✂️ Rock Paper Scissors: The TypeScript Edition

## Project Overview
We all remember playing Rock Paper Scissors as kids, but now you can play it in your browser with some added functionality. This project introduces:

### TypeScript:
Enhances the code by catching errors early, improving reliability.

### Object-Oriented Programming (OOP):
 The game logic is organized using classes for better structure.

### Separation of Concerns:
 The code is cleanly divided between logic and presentation for maintainability.

## Key Features

### Human vs. Computer:
You can play against a computer that randomly chooses its moves.

### Score Tracking:
The game keeps a running score of wins and losses.

### User Interface:
A simple but functional UI to make gameplay smoother than using hand gestures.

## Technical Details

### TypeScript
Using TypeScript allows for better type safety, reducing the likelihood of runtime errors. For example, the Game class utilizes strict types to ensure that inputs and outputs are predictable and correct.

### Separation of Concerns
The project follows the principle of separation of concerns:

`game.ts`: Contains the game logic, such as move comparisons and score tracking.
`ui.ts`: Manages the visual elements and user interactions.

By keeping these concerns separate, the project remains organized and easier to manage or extend in the future.

## Developer Experience
To streamline development, I've included:

Rollup for efficient bundling of code.
GitHub Actions for automatic deployment.
ESLint to enforce clean coding practices.

### How to Run the Project
Clone the repository:
```bash
git clone https://github.com/nathanrydel/top-rock-paper-scissors.git
```

Install dependencies:
```bash
npm install
```

Start the game:
```bash
npm start
```

Play in your browser: Open the browser and enjoy the game!

## Conclusion
While this implementation may not revolutionize Rock Paper Scissors, it serves as an engaging way to demonstrate TypeScript and OOP concepts. It's a simple project, but one that offers valuable practice in building well-structured and maintainable code. Give it a try and see how you do against the computer opponent!

Let me know if you have any questions!
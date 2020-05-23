import { Score } from './Score';
import { Lives } from './Lives';

export class Hud {
  constructor() {
    this.score = new Score();
    this.score.position.x = window.innerWidth / 2;
    this.score.position.y = 10;

    this.lives = new Lives();
    this.lives.position.x = window.innerWidth / 2;
    this.lives.position.y = window.innerHeight - 20;
  }

  addToScore(amount) {
    this.score.addToScore(amount);
  }

  setLives(lives) {
    this.lives.setLives(lives);
  }
}

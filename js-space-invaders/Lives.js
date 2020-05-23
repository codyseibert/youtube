class Lives extends Entity {
  constructor() {
    super();
    this.el.className = 'lives';
    this.refreshText();
  }

  setLives(lives) {
    this.lives = lives;
    this.refreshText();
  }

  refreshText() {
    this.el.innerText = `${new Array(this.lives)
      .fill('♡')
      .join(' ')}`;
  }
}

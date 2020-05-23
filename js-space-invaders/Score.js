class Score extends Entity {
  constructor() {
    super();
    this.amount = 0;
    this.el.className = 'score';
    this.refreshText();
  }

  addToScore(amount) {
    this.amount += amount;
    this.refreshText();
  }

  refreshText() {
    this.el.innerText = `Score: ${this.amount}`;
  }
}

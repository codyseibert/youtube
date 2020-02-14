const Phaser = require('phaser');

module.exports = ({ maxHealth, entity }) => {
  if (!entity.destroy) {
    throw new Error(
      'A Damageable entity requires a "destroy" method'
    );
  }

  if (!entity.getFlashableImage) {
    throw new Error(
      'A Damageable entity requires a "getFlashableImage" method'
    );
  }

  entity.health = maxHealth;
  entity.maxHealth = maxHealth;
  entity.shouldDestroy = false;

  entity.setHealth = function(health) {
    this.health = health;
  };

  entity.getHealth = function() {
    return this.health;
  };

  entity.getMaxHealth = function() {
    return this.maxHealth;
  };

  entity.damage = function(amount) {
    this.setHealth(this.getHealth() - amount);
    if (this.getHealth() <= 0) {
      this.destroy();
      this.shouldDestroy = true;
    }

    this.getFlashableImage().setTint(0xff0000);
    setTimeout(() => {
      this.getFlashableImage().clearTint();
    }, 100);
  };
};

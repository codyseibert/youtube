const Phaser = require('phaser');

module.exports = ({
  phaser,
  entity,
  offsetY,
  offsetX,
  width
}) => {
  if (!entity.setHealth) {
    throw new Error(
      'A HealthBar can only be applied to a Damageable entity'
    );
  }

  if (!entity.getX) {
    throw new Error(
      'A HealthBar requires the entity has a "getX" method'
    );
  }

  if (!entity.getY) {
    throw new Error(
      'A HealthBar requires the entity has a "getY" method'
    );
  }

  const graphics = phaser.add.graphics();
  graphics.x = entity.getX();
  graphics.y = entity.getY();

  const recreateHealthBar = () => {
    graphics.clear();
    const blackRect = new Phaser.Geom.Rectangle(
      offsetX,
      offsetY,
      width,
      5
    );
    graphics.fillStyle(0x000000, 1.0);
    graphics.fillRectShape(blackRect);

    const redWidth =
      (entity.getHealth() / entity.getMaxHealth()) *
      blackRect.width;
    const redRect = new Phaser.Geom.Rectangle(
      offsetX,
      offsetY,
      redWidth,
      5
    );
    graphics.fillStyle(0xff0000, 1.0);
    graphics.fillRectShape(redRect);
  };

  const setHealth = entity.setHealth;
  entity.setHealth = function() {
    setHealth.call(this, ...arguments);
    recreateHealthBar();
  };

  const destroy = entity.destroy;
  entity.destroy = function() {
    graphics.destroy();
    destroy.call(this, ...arguments);
  };

  const update = entity.update;
  entity.update = function() {
    update.call(this, ...arguments);
    graphics.x = entity.getX();
    graphics.y = entity.getY();
  };

  recreateHealthBar();
};

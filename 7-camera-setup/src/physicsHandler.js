export default ({ entity, state }) => {
  if (entity.vx !== undefined && entity.vy !== undefined) {
    entity.x += entity.vx;
    entity.y += entity.vy;
  }
}
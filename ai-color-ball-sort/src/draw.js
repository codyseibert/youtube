function drawPlayer({ ctx, player, state }) {
  ctx.drawImage(state.images.player, player.x, player.y);

  ctx.fillStyle = 'black';
  ctx.font = '14px Arial';
  ctx.fillText(
    `${player.brain.score}`,
    player.x + 10,
    player.y + 40
  );
}

function drawBlock({ ctx, block, state }) {
  ctx.fillStyle = block.color;
  ctx.fillRect(block.x, block.y, block.width, block.height);
}

export default ({ ctx, neat, state }) => {
  for (const block of state.blocks) {
    drawBlock({
      ctx,
      block,
      state
    });
  }

  for (const player of state.players) {
    drawPlayer({
      ctx,
      player,
      state
    });
  }

  ctx.fillStyle = 'black';
  ctx.font = '30px Arial';
  ctx.fillText(`generation ${neat.generation + 1}`, 10, 30);
  ctx.fillText(`spawns ${state.spawns + 1} / 100`, 10, 60);
};

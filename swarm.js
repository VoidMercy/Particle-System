var swarm_count = 0;
var MAX_SWARM = 30
var SWARM_PROBABILITY = 0.3
var VELOCITY = 4;
var MOVEMENT_COOLDOWN = 1;
var LIFESPAN = 15;

function add_swarm() {
  mouse_coord = app.renderer.plugins.interaction.mouse.global;
  if (swarm_count < MAX_SWARM && Math.random() < SWARM_PROBABILITY) {
    // generate swarm insect
    let swarm = {};
    swarm.x = mouse_coord.x;
    swarm.y = mouse_coord.y;
    swarm.lifespan = LIFESPAN * 60;
    swarm.movement_cooldown = MOVEMENT_COOLDOWN;

    swarm.update = swarm_update;
    swarm.draw = swarm_draw;
    swarm.offscreen = swarm_offscreen;

    return swarm;
  }
  return 0;
}

function swarm_update(swarm) {
  swarm.lifespan -= 1;

  // follow cursor
  if (swarm.movement_cooldown == 0) {
    mouse_coord = app.renderer.plugins.interaction.mouse.global;
    let dx = mouse_coord.x - swarm.x;
    let dy = mouse_coord.y - swarm.y;
    let mag = Math.sqrt(dx * dx + dy * dy);
    dx = dx / mag;
    dy = dy / mag;

    swarm.x += dx * VELOCITY;
    swarm.y += dy * VELOCITY;

    swarm.movement_cooldown = MOVEMENT_COOLDOWN;
  } else {
    swarm.movement_cooldown -= 1;
  }
}

function swarm_draw(swarm, gr) {
  gr.lineStyle(0, 0, 1);
  gr.beginFill(0xffff00);
  gr.drawRect(swarm.x, swarm.y, 1, 1);
  gr.endFill();
}

function swarm_offscreen(swarm) {
  return swarm.lifespan == 0;
}

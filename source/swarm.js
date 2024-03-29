// Swarm particle simulation

var swarm_count = 0;
var MAX_SWARM = 30
var SWARM_PROBABILITY = 0.3
var VELOCITY = 4;
var MOVEMENT_COOLDOWN = 1;
var LIFESPAN = 10;

// Add new swarm particle
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

// Update swarm particle's position to follow mouse cursor
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

// Draw swarm particle on graphics object as a single pixel
function swarm_draw(swarm, gr) {
  gr.lineStyle(0, 0, 1);
  gr.beginFill(0xffff00);
  gr.drawCircle(swarm.x, swarm.y, 2);
  gr.endFill();
}

// Kill the swarm particle after its lifespan ticks to 0
function swarm_offscreen(swarm) {
  return swarm.lifespan == 0;
}

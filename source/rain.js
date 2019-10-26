// Rain particle simulation

var RAIN_LENGTH = 20;
var RAIN_VELOCITY = 10;
var RAIN_PROBABILITY = 0.3;

// Adds new rain particle
function add_rain() {
  mouse_coord = app.renderer.plugins.interaction.mouse.global;
  if (Math.random() < RAIN_PROBABILITY) {
    let rain = {};
    rain.theta = -70; // testing rain angle
    rain.x = mouse_coord.x;
    rain.y = mouse_coord.y;
    rain.v = RAIN_VELOCITY;

    rain.update = rain_update;
    rain.draw = rain_draw;
    rain.offscreen = rain_offscreen;

    return rain;
  }
  return 0;
}

// Update rain's position based on angle and velocity
function rain_update(particle) {
  particle.x += Math.cos(particle.theta) * particle.v;
  particle.y -= Math.sin(particle.theta) * particle.v;
}

// Draw rain particle onto gr grpahics object
function rain_draw(particle, gr) {
  let dx = Math.cos(particle.theta);
  let dy = -Math.sin(particle.theta);

  let cur_x = particle.x;
  let cur_y = particle.y;

  // iterate along path of theta and draw pixels with a color gradient
  for (let count = 0; count < RAIN_LENGTH; count++) {
    let color = 0xa9 - count * 5;
    gr.lineStyle(0, 0, 1);
    gr.beginFill(color << 16 | color << 8 | color);
    gr.drawRect(cur_x, cur_y, 1, 1);
    gr.endFill();

    cur_x += dx;
    cur_y += dy;
  }
}

// Check if rain particle is on screen
function rain_offscreen(particle) {
  return particle.y > HEIGHT + 5;
}

var current_direction = 0;
var SPIRAL_VELOCITY = 2;
var SPIRAL_RADIUS = 5;

// Add a spiral particle
function add_spiral() {
  mouse_coord = app.renderer.plugins.interaction.mouse.global;
  let spiral = {};
  spiral.theta = current_direction;
  spiral.x = mouse_coord.x;
  spiral.y = mouse_coord.y;
  spiral.v = SPIRAL_VELOCITY;
  spiral.period = 10;
  spiral.status = 1;

  spiral.update = spiral_update;
  spiral.draw = spiral_draw;
  spiral.offscreen = spiral_offscreen;

  current_direction = (current_direction + 1) % 360;

  return spiral;
}

// Move individual spiral particles
function spiral_update(particle) {

  // Fancy movement code
  particle.period -= 1;
  if (particle.period == 0) {
    if (particle.status == 1) {
      particle.v++;
      particle.period++;
      if (particle.v == 8) {
        particle.status = 0;
      }
    } else {
      particle.v--;
      particle.period++;
      if (particle.v == SPIRAL_VELOCITY) {
        particle.status = 1;
        particle.period = 10;
      }
    }
  }
  particle.x += Math.cos(particle.theta) * particle.v;
  particle.y -= Math.sin(particle.theta) * particle.v;
}

// Draw spiral particle onto graphics object
function spiral_draw(particle, gr) {
  gr.lineStyle(0, 0, 1);
  gr.beginFill(0x00FFFF);
  gr.drawCircle(particle.x, particle.y, SPIRAL_RADIUS);
  gr.endFill();
}

// Check if particle is offscreen
function spiral_offscreen(particle) {
  return (particle.x < -SPIRAL_RADIUS) | (particle.x > WIDTH + SPIRAL_RADIUS) | (particle.y < -SPIRAL_RADIUS) | (particle.y > HEIGHT + SPIRAL_RADIUS);
}

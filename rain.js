RAIN_LENGTH = 20;
RAIN_VELOCITY = 10;
RAIN_PROBABILITY = 0.3;

function add_rain() {
  mouse_coord = app.renderer.plugins.interaction.mouse.global;
  if (Math.random() < RAIN_PROBABILITY) {
    var rain = {};
    rain.theta = -70; // testing rain angle
    rain.x = mouse_coord.x;
    rain.y = mouse_coord.y;
    rain.update = rain_update;
    rain.v = RAIN_VELOCITY;
    rain.draw = rain_draw;
    return rain;
  }
  return 0;
}

function rain_update(particle) {
  particle.x += Math.cos(particle.theta) * particle.v;
  particle.y -= Math.sin(particle.theta) * particle.v;
}

function rain_draw(particle, gr) {
  var dx = Math.cos(particle.theta);
  var dy = -Math.sin(particle.theta);

  var cur_x = particle.x;
  var cur_y = particle.y;

  // iterate along path of theta and draw pixels with a color gradient

  for (var count = 0; count < RAIN_LENGTH; count++) {
    var color = 0xa9 - count * 5;
    gr.lineStyle(0, 0, 1);
    gr.beginFill(color << 16 | color << 8 | color);
    gr.drawRect(cur_x, cur_y, 1, 1);
    gr.endFill();

    cur_x += dx;
    cur_y += dy;
  }
}

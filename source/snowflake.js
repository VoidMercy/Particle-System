// Snowflake particle simulation

let SNOWFLAKE_PROBABILITY = 0.15;

// Add new snowflake particle
function add_snowflake() {
  mouse_coord = app.renderer.plugins.interaction.mouse.global;
  if (Math.random() < SNOWFLAKE_PROBABILITY) {
    let temp = new PIXI.Sprite(PIXI.Loader.shared.resources[snowflake_url].texture);
    temp.x = mouse_coord.x;
    temp.y = mouse_coord.y;
    temp.theta = Math.random() * Math.PI / 3 - 2 * Math.PI / 3;
    temp.scale.x = 0.1;
    temp.scale.y = 0.1;
    temp.v = Math.random() * 1 + 2.5;

    temp.update = snowflake_update;
    temp.draw = snowflake_draw;
    temp.offscreen = snowflake_offscreen;

    stage.addChild(temp);
    return temp;
  }
  return 0;
}

// Update snowflake particle's position based on angle and velocity
function snowflake_update(particle) {
  particle.x += Math.cos(particle.theta) * particle.v;
  particle.y -= Math.sin(particle.theta) * particle.v;
}

// Not necessary to draw snowflake onto grpahics object since snowflake is on PIXI.js stage
function snowflake_draw(particle, gr) {
}

// Check is snowflake is on screen
function snowflake_offscreen(particle) {
  return particle.y > HEIGHT + 5;
}

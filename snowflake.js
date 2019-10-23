var SNOWFLAKE_PROBABILITY = 0.15;

function add_snowflake() {
  mouse_coord = app.renderer.plugins.interaction.mouse.global;
  if (Math.random() < SNOWFLAKE_PROBABILITY) {
    var temp = new PIXI.Sprite(PIXI.Loader.shared.resources[snowflake_url].texture);
    temp.x = mouse_coord.x;
    temp.y = mouse_coord.y;
    temp.theta = Math.random() * Math.PI / 3 - 2 * Math.PI / 3;
    temp.scale.x = 0.1;
    temp.scale.y = 0.1;
    temp.v = Math.random() * 1 + 2.5;

    temp.update = snowflake_update;
    temp.draw = snowflake_draw;
    stage.addChild(temp);
    return temp;
  }
  return 0;
}

function snowflake_update(particle) {
  particle.x += Math.cos(particle.theta) * particle.v;
  particle.y -= Math.sin(particle.theta) * particle.v;
}

function snowflake_draw(particle, gr) {
}

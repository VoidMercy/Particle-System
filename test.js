//Create a Pixi Application
var app = new PIXI.Application({width: 800, height: 600});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

snowflake_url = "http://localhost:8000/snowflake.png"

PIXI.Loader.shared.add(snowflake_url).load(setup);

var snowflakes = [];

function setup() {
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  mouse_coord = app.renderer.plugins.interaction.mouse.global;
  if (Math.random() < 0.1) {
    var temp = new PIXI.Sprite(PIXI.Loader.shared.resources[snowflake_url].texture);
    temp.x = mouse_coord.x;
    temp.y = mouse_coord.y;
    temp.scale.x = 0.1;
    temp.scale.y = 0.1;
    snowflakes.push(temp);
    app.stage.addChild(temp);
  }
  for (var i = 0; i < snowflakes.length; i++) {
    snowflakes[i].y += 1;
  }
}
